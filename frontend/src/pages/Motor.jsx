import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://mam-completo.onrender.com');

export default function Motor() {
  const logEndRef = useRef(null);
  const user = JSON.parse(localStorage.getItem('mam_user')) || { email: "admin@gmail.com" };
  const API_URL = 'https://mam-completo.onrender.com';

  // ⚙️ Estados de Configuração e Motor
  const [settings, setSettings] = useState({ spreadsheetId: '', adminEmail: user.email, adminPhone: '', abaDestino: 'Página1' });
  const [wppConnected, setWppConnected] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrCodeData, setQrCodeData] = useState('');
  const [action, setAction] = useState('wpp'); 
  const [message, setMessage] = useState('');
  const [consoleLogs, setConsoleLogs] = useState(['[SISTEMA] Aguardando ignição do Motor V12...']);
  const [isMotorRunning, setIsMotorRunning] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Limites Anti-Ban
  const [wppLimit, setWppLimit] = useState(50);
  const [emailLimit, setEmailLimit] = useState(100);

  // 📡 Carregar Configurações
  useEffect(() => {
    fetch(`${API_URL}/api/settings/${user.email}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.spreadsheetId) {
          setSettings({ spreadsheetId: data.spreadsheetId, adminEmail: data.adminEmail || user.email, adminPhone: data.adminPhone || '', abaDestino: data.abaDestino || 'Página1' });
          setConsoleLogs(prev => [...prev, `[SISTEMA] Configurações carregadas via MongoDB Atlas. ✅`]);
        }
      }).catch(() => {});
  }, [user.email]);

  // 🎧 Listeners Socket
  useEffect(() => {
    socket.on('terminal_log', (log) => setConsoleLogs(prev => [...prev.slice(-100), log]));
    socket.on('qr_code', (data) => { setQrCodeData(data.code); setShowQrModal(true); });
    socket.on('wpp_status', (data) => { if (data.status === 'CONNECTED') { setWppConnected(true); setShowQrModal(false); } });
    return () => socket.off();
  }, []);

  useEffect(() => { logEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [consoleLogs]);

  const saveSettings = async () => {
    setStatusMsg('⚙️ SINCRONIZANDO...');
    try {
      await fetch(`${API_URL}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.email, spreadsheetLink: settings.spreadsheetId, adminEmail: settings.adminEmail, adminPhone: settings.adminPhone })
      });
      setStatusMsg('✅ SALVO NO ATLAS!');
    } catch (err) { setStatusMsg('❌ ERRO AO SALVAR'); }
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleStartMotor = (e) => {
    e.preventDefault();
    if (!settings.spreadsheetId) { alert("⚠️ Configure sua planilha primeiro."); return; }
    setIsMotorRunning(true);
    socket.emit('execute_task', { action, wppLimit, emailLimit, message, spreadsheetId: settings.spreadsheetId, adminEmail: settings.adminEmail });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* HEADER PREMIUM */}
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-6xl italic font-black tracking-tighter text-white uppercase">Motor MAM V12</h1>
        <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-[10px] font-black bg-amber-500 text-black rounded-full uppercase tracking-widest">Engine Online</span>
            <span className="text-gray-500 text-xs font-bold italic">Logado como: {user.email}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* COLUNA DE COMANDO (ESQUERDA) */}
        <div className="xl:col-span-7 space-y-8">
          
          {/* CARD DE CONFIGURAÇÃO */}
          <div className="bg-[#1e293b]/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem] shadow-2xl">
            <h3 className="text-amber-500 font-black text-[10px] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span> Configurações de Voo
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Link da Planilha</label>
                <input type="text" value={settings.spreadsheetId} onChange={e => setSettings({...settings, spreadsheetId: e.target.value})} className="bg-black/40 border border-white/10 p-4 rounded-2xl text-white text-xs outline-none focus:border-amber-500 transition-all" placeholder="URL do Google Sheets..." />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">eSIM de Disparo</label>
                <input type="text" value={settings.adminPhone} onChange={e => setSettings({...settings, adminPhone: e.target.value})} className="bg-black/40 border border-white/10 p-4 rounded-2xl text-white text-xs outline-none focus:border-amber-500 transition-all" placeholder="5521999999999" />
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => !wppConnected && socket.emit('request_wpp_connection', settings.adminPhone)} className={`flex-1 p-4 rounded-2xl border-2 font-black text-[10px] tracking-widest transition-all ${wppConnected ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-white/5 text-gray-400 border-white/5 hover:border-amber-500/50'}`}>
                {wppConnected ? '🟢 WHATSAPP CONECTADO' : '📱 CONECTAR WHATSAPP'}
              </button>
              <button onClick={saveSettings} className="flex-1 p-4 bg-amber-500 text-black font-black text-[10px] tracking-widest rounded-2xl hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all uppercase">
                {statusMsg || 'Sincronizar Atlas'}
              </button>
            </div>
          </div>

          {/* PAINEL DE CONTROLE DE DISPARO */}
          <div className="bg-[#1e293b]/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem] shadow-2xl">
            <form onSubmit={handleStartMotor} className="space-y-8">
              <div className="flex flex-col gap-4">
                <label className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">Selecione o Canal</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['extract', 'wpp', 'email', 'both'].map(id => (
                    <button key={id} type="button" onClick={() => setAction(id)} className={`py-3 rounded-xl font-black text-[10px] border transition-all ${action === id ? 'bg-amber-500 text-black border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'bg-black/20 text-gray-500 border-white/5'}`}>
                      {id.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {action !== 'extract' && (
                <div className="space-y-6 animate-in slide-in-from-top-2 duration-500">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/20 p-4 rounded-2xl border border-white/5 flex justify-between items-center">
                      <span className="text-[10px] font-black text-gray-500">WPP LIMIT:</span>
                      <input type="number" value={wppLimit} onChange={e => setWppLimit(e.target.value)} className="bg-transparent text-right font-black text-amber-500 w-12" />
                    </div>
                    <div className="bg-black/20 p-4 rounded-2xl border border-white/5 flex justify-between items-center">
                      <span className="text-[10px] font-black text-gray-500">EMAIL LIMIT:</span>
                      <input type="number" value={emailLimit} onChange={e => setEmailLimit(e.target.value)} className="bg-transparent text-right font-black text-amber-500 w-12" />
                    </div>
                  </div>
                  <textarea value={message} onChange={e => setMessage(e.target.value)} rows="4" placeholder="SUA MENSAGEM DINÂMICA..." className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-white text-sm outline-none focus:border-amber-500 transition-all resize-none"></textarea>
                </div>
              )}

              <button type="submit" disabled={isMotorRunning} className={`w-full py-6 rounded-3xl font-black text-lg tracking-[0.2em] transition-all ${isMotorRunning ? 'bg-gray-800 text-gray-500' : 'bg-gradient-to-r from-amber-500 to-orange-600 text-black hover:scale-[1.02] shadow-xl'}`}>
                {isMotorRunning ? '⚙️ MOTOR EM OPERAÇÃO...' : '⚡ ATIVAR O MAM V12'}
              </button>
            </form>
          </div>
        </div>

        {/* TERMINAL LIVE (DIREITA) */}
        <div className="xl:col-span-5 h-[700px] sticky top-28 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 font-mono text-xs flex flex-col shadow-2xl">
          <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <span className={`w-2.5 h-2.5 rounded-full ${isMotorRunning ? 'bg-green-500 animate-pulse' : 'bg-amber-900'}`}></span>
              <span className="text-amber-500 font-black tracking-widest">TERMINAL V12 LIVE</span>
            </div>
            <span className="text-[10px] text-gray-600">v2.4.12</span>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-none space-y-2">
            {consoleLogs.map((log, i) => (
              <div key={i} className={`${log.includes('[MOTOR]') ? 'text-amber-400' : 'text-gray-500'} flex gap-3`}>
                <span className="opacity-30">[{new Date().toLocaleTimeString()}]</span>
                <span>{log}</span>
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        </div>
      </div>

      {/* MODAL QR CODE */}
      {showQrModal && (
        <div className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#1e293b] border border-white/10 p-12 rounded-[4rem] max-w-sm w-full text-center">
            <h2 className="text-2xl font-black text-white italic uppercase mb-8">Pareamento</h2>
            <div className="bg-white p-4 rounded-3xl inline-block">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrCodeData)}`} alt="QR" />
            </div>
            <button onClick={() => setShowQrModal(false)} className="mt-10 text-gray-500 font-bold uppercase text-[10px] tracking-widest hover:text-white transition">Fechar Janela</button>
          </div>
        </div>
      )}
    </div>
  );
}