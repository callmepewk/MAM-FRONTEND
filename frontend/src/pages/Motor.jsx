import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://mam-completo.onrender.com');

export default function Motor() {
  const logEndRef = useRef(null);
  const user = JSON.parse(localStorage.getItem('mam_user')) || { email: "admin@gmail.com" };
  const API_URL = 'https://mam-completo.onrender.com';

  const [settings, setSettings] = useState({ spreadsheetId: '', adminEmail: user.email, adminPhone: '', abaDestino: 'Página1' });
  const [wppConnected, setWppConnected] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrCodeData, setQrCodeData] = useState('');
  const [action, setAction] = useState('wpp'); 
  const [message, setMessage] = useState('');
  const [consoleLogs, setConsoleLogs] = useState(['[SISTEMA] Aguardando ignição do Motor V12...']);
  const [isMotorRunning, setIsMotorRunning] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [wppLimit, setWppLimit] = useState(50);
  const [emailLimit, setEmailLimit] = useState(100);

  useEffect(() => {
    fetch(`${API_URL}/api/settings/${user.email}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.spreadsheetId) {
          setSettings({ 
            spreadsheetId: data.spreadsheetId, 
            adminEmail: data.adminEmail || user.email, 
            adminPhone: data.adminPhone || '', 
            abaDestino: data.abaDestino || 'Página1' 
          });
          setConsoleLogs(prev => [...prev, `[SISTEMA] Configurações carregadas via MongoDB Atlas. ✅`]);
        }
      }).catch(() => {});
  }, [user.email]);

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
        body: JSON.stringify({ 
            userId: user.email, 
            spreadsheetLink: settings.spreadsheetId, 
            adminEmail: settings.adminEmail, 
            adminPhone: settings.adminPhone,
            abaDestino: settings.abaDestino 
        })
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
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* 🏎️ HEADER V12 STYLE */}
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-7xl italic font-black tracking-tighter text-white uppercase">Motor MAM V12</h1>
        <div className="flex items-center gap-3">
            <span className="h-[2px] w-12 bg-amber-500"></span>
            <p className="text-gray-500 text-xs md:text-sm font-black uppercase tracking-[0.4em]">Central de Comando e Disparos em Massa</p>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* 🏰 COLUNA DE COMANDO (ESQUERDA) */}
        <div className="xl:col-span-7 space-y-10">
          
          {/* CARD DE CONFIGURAÇÃO (GLASS) */}
          <div className="bg-[#1e293b]/40 backdrop-blur-xl border border-white/5 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl group-hover:bg-amber-500/10 transition-all"></div>
            
            <h3 className="text-amber-500 font-black text-[10px] uppercase tracking-[0.4em] mb-10 flex items-center gap-3">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]"></span> 
              Configurações de Injeção
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">ID da Planilha (URL)</label>
                <input type="text" value={settings.spreadsheetId} onChange={e => setSettings({...settings, spreadsheetId: e.target.value})} className="bg-black/40 border border-white/10 p-5 rounded-2xl text-white text-sm outline-none focus:border-amber-500 focus:shadow-[0_0_15px_rgba(245,158,11,0.1)] transition-all" placeholder="URL do Google Sheets..." />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">Aba de Destino</label>
                <input type="text" value={settings.abaDestino} onChange={e => setSettings({...settings, abaDestino: e.target.value})} className="bg-black/40 border border-white/10 p-5 rounded-2xl text-white text-sm outline-none focus:border-amber-500 transition-all" placeholder="Ex: Página1" />
              </div>
              <div className="flex flex-col gap-3 md:col-span-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">WhatsApp de Origem (eSIM)</label>
                <input type="text" value={settings.adminPhone} onChange={e => setSettings({...settings, adminPhone: e.target.value})} className="bg-black/40 border border-white/10 p-5 rounded-2xl text-white text-sm outline-none focus:border-amber-500 transition-all" placeholder="Ex: 5521999999999" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button onClick={() => !wppConnected && socket.emit('request_wpp_connection', settings.adminPhone)} className={`flex-1 p-5 rounded-[2rem] border-2 font-black text-[10px] tracking-[0.2em] transition-all uppercase ${wppConnected ? 'bg-green-500/10 text-green-500 border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'bg-white/5 text-gray-400 border-white/5 hover:border-amber-500/50'}`}>
                {wppConnected ? '🟢 WHATSAPP ATIVO' : '📱 CONECTAR WHATSAPP'}
              </button>
              <button onClick={saveSettings} className="flex-1 p-5 bg-amber-500 text-black font-black text-[10px] tracking-[0.2em] rounded-[2rem] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:scale-[1.02] transition-all uppercase">
                {statusMsg || 'Sincronizar com Atlas'}
              </button>
            </div>
          </div>

          {/* PAINEL DE OPERAÇÃO */}
          <div className="bg-[#1e293b]/40 backdrop-blur-xl border border-white/5 p-10 rounded-[3rem] shadow-2xl relative group">
            <form onSubmit={handleStartMotor} className="space-y-10">
              <div className="flex flex-col gap-6">
                <label className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em]">Direcionamento de Fluxo</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['extract', 'wpp', 'email', 'both'].map(id => (
                    <button key={id} type="button" onClick={() => setAction(id)} className={`py-4 rounded-2xl font-black text-[10px] border tracking-widest transition-all ${action === id ? 'bg-amber-500 text-black border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)]' : 'bg-black/30 text-gray-500 border-white/5 hover:bg-white/5'}`}>
                      {id.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {action !== 'extract' && (
                <div className="space-y-8 animate-in slide-in-from-top-4 duration-500">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-black/30 p-5 rounded-[2rem] border border-white/5 flex justify-between items-center group/input">
                      <span className="text-[10px] font-black text-gray-600 group-hover/input:text-amber-500 transition-colors">WPP LIMIT:</span>
                      <input type="number" value={wppLimit} onChange={e => setWppLimit(e.target.value)} className="bg-transparent text-right font-black text-white w-12 outline-none" />
                    </div>
                    <div className="bg-black/30 p-5 rounded-[2rem] border border-white/5 flex justify-between items-center group/input">
                      <span className="text-[10px] font-black text-gray-600 group-hover/input:text-amber-500 transition-colors">EMAIL LIMIT:</span>
                      <input type="number" value={emailLimit} onChange={e => setEmailLimit(e.target.value)} className="bg-transparent text-right font-black text-white w-12 outline-none" />
                    </div>
                  </div>
                  <div className="relative">
                    <textarea value={message} onChange={e => setMessage(e.target.value)} rows="5" placeholder="REDAÇÃO DO DISPARO (IA DINÂMICA)..." className="w-full bg-black/40 border border-white/10 p-6 rounded-[2rem] text-white text-sm outline-none focus:border-amber-500 transition-all resize-none italic shadow-inner"></textarea>
                    <div className="absolute bottom-4 right-6 text-[8px] font-black text-gray-600 uppercase tracking-widest">Powered by Ai Doctor</div>
                  </div>
                </div>
              )}

              <button type="submit" disabled={isMotorRunning} className={`w-full py-8 rounded-[2.5rem] font-black text-2xl tracking-[0.3em] transition-all italic ${isMotorRunning ? 'bg-gray-800 text-gray-600' : 'bg-gradient-to-r from-amber-500 to-orange-600 text-black hover:scale-[1.01] shadow-[0_20px_50px_rgba(245,158,11,0.2)]'}`}>
                {isMotorRunning ? '⚙️ ENGINE IN OPERATION...' : '⚡ ATIVAR MOTOR V12'}
              </button>
            </form>
          </div>
        </div>

        {/* 📟 TERMINAL COCKPIT (DIREITA) */}
        <div className="xl:col-span-5 h-[750px] sticky top-28 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-10 font-mono text-[11px] flex flex-col shadow-2xl relative overflow-hidden group">
          {/* Scanline Effect sutil */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%]"></div>
          
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6 relative z-10">
            <div className="flex items-center gap-4">
              <span className={`w-3 h-3 rounded-full ${isMotorRunning ? 'bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.8)]' : 'bg-amber-900'}`}></span>
              <span className="text-amber-500 font-black tracking-[0.3em] uppercase italic">Telemetry V12 Live</span>
            </div>
            <span className="text-[10px] text-gray-700 font-black">SYS.VER.2.4.12</span>
          </div>
          
          <div className="flex-1 overflow-y-auto scrollbar-none space-y-3 relative z-10">
            {consoleLogs.map((log, i) => (
              <div key={i} className={`${log.includes('[MOTOR]') ? 'text-amber-400 font-bold' : 'text-gray-500'} flex gap-4 transition-all hover:text-white`}>
                <span className="opacity-20 font-black">[{new Date().toLocaleTimeString()}]</span>
                <span className="tracking-tight">{log}</span>
              </div>
            ))}
            <div ref={logEndRef} />
          </div>

          <div className="mt-6 pt-6 border-t border-white/5 text-[9px] font-black text-gray-700 uppercase tracking-[0.5em] text-center relative z-10">
            Real-time Encryption Enabled
          </div>
        </div>
      </div>

      {/* 📱 PAREAMENTO MODAL (GLASS) */}
      {showQrModal && (
        <div className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-8 animate-in zoom-in duration-300">
          <div className="bg-[#0f172a] border border-white/10 p-16 rounded-[4rem] max-w-sm w-full text-center shadow-[0_0_100px_rgba(245,158,11,0.2)]">
            <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-10">Sincronização</h2>
            <div className="bg-white p-6 rounded-[2.5rem] inline-block shadow-2xl transform hover:scale-105 transition-transform">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrCodeData)}`} alt="QR" className="rounded-xl" />
            </div>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-10 leading-relaxed px-4">
                Abra o WhatsApp › Aparelhos Conectados › Conectar um Aparelho
            </p>
            <button onClick={() => setShowQrModal(false)} className="mt-12 text-gray-600 hover:text-white font-black uppercase text-[10px] tracking-[0.3em] transition-all">Abortar Missão</button>
          </div>
        </div>
      )}
    </div>
  );
}