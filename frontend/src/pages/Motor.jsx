import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('https://mam-completo.onrender.com');

export default function Motor() {
  const navigate = useNavigate();
  const logEndRef = useRef(null);

  // 👤 Dados do Usuário (Recuperados do Login)
  const user = JSON.parse(localStorage.getItem('mam_user')) || { email: "admin@gmail.com" };
  const API_URL = 'https://mam-completo.onrender.com';

  // ⚙️ Estados de Configuração (Persistidos no MongoDB)
  const [settings, setSettings] = useState({
    spreadsheetId: '',
    adminEmail: user.email,
    adminPhone: '',
    abaDestino: 'Página1'
  });

  // Estados de Conexão e Motor (Mantidos)
  const [wppConnected, setWppConnected] = useState(false);
  const [gmailConnected, setGmailConnected] = useState(user.email.includes('@gmail.com')); 
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrCodeData, setQrCodeData] = useState('');
  const [action, setAction] = useState(''); 
  const [consoleLogs, setConsoleLogs] = useState(['[SISTEMA] Aguardando ignição do Motor V12...']);
  const [isMotorRunning, setIsMotorRunning] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Limites Anti-Ban
  const [wppLimit, setWppLimit] = useState(50);
  const [emailLimit, setEmailLimit] = useState(100);

  // 📡 1. CARREGAR CONFIGURAÇÕES DO BANCO (FIM DOS PLACEHOLDERS)
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
          setConsoleLogs(prev => [...prev, `[SISTEMA] Configurações do médico carregadas com sucesso. ✅`]);
        }
      })
      .catch(() => setConsoleLogs(prev => [...prev, `[AVISO] Servidor de configurações offline. Usando padrões locais.`]));
  }, [user.email]);

  // 💾 2. FUNÇÃO PARA SALVAR CONFIGURAÇÕES
  const saveSettings = async () => {
    setStatusMsg('⚙️ SINCRONIZANDO...');
    try {
      const response = await fetch(`${API_URL}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.email,
          spreadsheetLink: settings.spreadsheetId,
          adminEmail: settings.adminEmail,
          adminPhone: settings.adminPhone
        })
      });
      if (response.ok) setStatusMsg('✅ CONFIGURAÇÃO SALVA!');
    } catch (err) {
      setStatusMsg('❌ ERRO AO SALVAR');
    }
    setTimeout(() => setStatusMsg(''), 3000);
  };

  // 🎧 Listeners do Socket.io (Mantidos)
  useEffect(() => {
    socket.on('terminal_log', (log) => setConsoleLogs(prev => [...prev.slice(-100), log]));
    socket.on('qr_code', (data) => { setQrCodeData(data.code); setShowQrModal(true); });
    socket.on('wpp_status', (data) => {
      if (data.status === 'CONNECTED') { setWppConnected(true); setShowQrModal(false); }
    });
    return () => { socket.off('terminal_log'); socket.off('qr_code'); socket.off('wpp_status'); };
  }, []);

  useEffect(() => { logEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [consoleLogs]);

  const handleConnectRequest = (type) => {
    if(type === 'wpp') socket.emit('request_wpp_connection', settings.adminPhone || '5521980343873'); 
  };

  const handleStartMotor = (e) => {
    e.preventDefault();
    if (!settings.spreadsheetId) { alert("⚠️ Configure sua planilha antes de ativar o motor."); return; }
    setIsMotorRunning(true);
    socket.emit('execute_task', {
      action,
      wppLimit,
      emailLimit,
      spreadsheetId: settings.spreadsheetId,
      adminEmail: settings.adminEmail
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 md:gap-12 pb-20">
      
      {/* COLUNA DE CONFIGURAÇÃO (ESQUERDA) */}
      <div className="flex-[1.5] flex flex-col gap-8">
        
        <div className="flex flex-col gap-4 border-b border-gray-800 pb-6 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">Motor MAM</h1>
          <p className="text-sm md:text-lg text-gray-400 font-medium italic">
            🚀 Logado como: <span className="text-yellow-500 font-bold">{user.email}</span>
          </p>
        </div>

        {/* ⚠️ CARD DE CONFIGURAÇÃO OBRIGATÓRIA (INJETADO) */}
        <div className="bg-[#1e293b] p-6 md:p-8 rounded-[2.5rem] border-2 border-yellow-500/20 shadow-2xl">
          <div className="bg-yellow-500/10 border-2 border-yellow-500/30 p-5 rounded-2xl mb-6">
            <h3 className="text-yellow-500 font-black text-xs uppercase mb-3 flex items-center gap-2">⚠️ CONFIGURAÇÃO OBRIGATÓRIA</h3>
            <p className="text-gray-300 text-[10px] md:text-xs leading-relaxed">
              1. No Google Sheets, clique em <b>Compartilhar</b>.<br/>
              2. Adicione como Editor: <code className="text-yellow-400 select-all">mam-service-account@aidoctor-450123.iam.gserviceaccount.com</code><br/>
              3. Cole o link da planilha abaixo e salve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-2">Link da Planilha</label>
              <input 
                type="text" 
                value={settings.spreadsheetId} 
                onChange={e => setSettings({...settings, spreadsheetId: e.target.value})}
                placeholder="Cole o link da planilha..."
                className="bg-[#0b1120] border-2 border-gray-700 p-4 rounded-xl text-white text-xs outline-none focus:border-yellow-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-2">WhatsApp do eSIM</label>
              <input 
                type="text" 
                value={settings.adminPhone} 
                onChange={e => setSettings({...settings, adminPhone: e.target.value})}
                placeholder="5521999999999"
                className="bg-[#0b1120] border-2 border-gray-700 p-4 rounded-xl text-white text-xs outline-none focus:border-yellow-500"
              />
            </div>
          </div>
          
          <button onClick={saveSettings} className="w-full bg-yellow-500/10 hover:bg-yellow-500 hover:text-black border-2 border-yellow-500 text-yellow-500 font-black py-3 rounded-xl transition text-xs uppercase tracking-widest">
            {statusMsg || 'Sincronizar com MongoDB Atlas'}
          </button>
        </div>

        {/* STATUS DE CONEXÃO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={() => !wppConnected && handleConnectRequest('wpp')}
              className={`p-5 rounded-2xl border-2 transition flex items-center justify-center gap-3 font-black text-xs md:text-sm ${wppConnected ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/30 animate-pulse'}`}
            >
              <span className={`w-3 h-3 rounded-full ${wppConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              {wppConnected ? 'WHATSAPP CONECTADO' : 'CONECTAR WHATSAPP (CLIQUE)'}
            </button>
            
            <div className={`p-5 rounded-2xl border-2 flex items-center justify-center gap-3 font-black text-xs md:text-sm ${gmailConnected ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-gray-800 text-gray-500 border-gray-700'}`}>
              <span className={`w-3 h-3 rounded-full ${gmailConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`}></span>
              {gmailConnected ? `GMAIL: ${settings.adminEmail} (AUTO)` : 'GMAIL DESCONECTADO'}
            </div>
        </div>

        {/* FORMULÁRIO DO MOTOR */}
        <div className="bg-[#1e293b] p-6 md:p-10 rounded-[2.5rem] border border-gray-800 shadow-2xl">
          <form onSubmit={handleStartMotor} className="flex flex-col gap-10">
            
            <div className="flex flex-col gap-4">
              <label className="text-sm md:text-lg font-black text-yellow-500 uppercase tracking-widest text-left">1. Bases Detectadas (Auto-Sync)</label>
              <div className="bg-[#0b1120] border-2 border-gray-700 p-5 rounded-3xl text-white font-bold text-sm md:text-lg">
                {settings.spreadsheetId ? `✅ Planilha Ativa: ${settings.spreadsheetId.substring(0, 15)}...` : "❌ Nenhuma planilha vinculada."}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-sm md:text-lg font-black text-yellow-500 uppercase tracking-widest text-left">2. Canal de Disparo</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['extract', 'wpp', 'email', 'both'].map(id => (
                    <button key={id} type="button" onClick={() => setAction(id)} className={`py-4 rounded-xl font-black text-[10px] md:text-xs border-2 transition ${action === id ? 'bg-yellow-500 text-gray-900 border-yellow-500' : 'bg-[#0b1120] text-gray-500 border-gray-800'}`}>
                      {id.toUpperCase()}
                    </button>
                  ))}
              </div>
            </div>

            {/* CONTROLE ANTI-BAN E MENSAGEM (Simplificado para o seu código) */}
            {(action && action !== 'extract') && (
              <div className="bg-[#0b1120] p-6 md:p-8 rounded-[2rem] border border-gray-800 flex flex-col gap-8 animate-in fade-in duration-500">
                <div className="flex flex-col gap-4">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Controle Anti-Ban (Diário)</span>
                  <div className="flex gap-4">
                    <div className="flex-1 flex items-center justify-between bg-[#1e293b] p-3 rounded-xl border border-gray-700">
                      <span className="text-[10px] font-black text-green-500 text-left">WPP:</span>
                      <input type="number" max="50" value={wppLimit} onChange={e => setWppLimit(e.target.value)} className="bg-transparent text-right font-black w-12 text-white" />
                    </div>
                    <div className="flex-1 flex items-center justify-between bg-[#1e293b] p-3 rounded-xl border border-gray-700">
                      <span className="text-[10px] font-black text-blue-400 text-left">EMAIL:</span>
                      <input type="number" max="100" value={emailLimit} onChange={e => setEmailLimit(e.target.value)} className="bg-transparent text-right font-black w-12 text-white" />
                    </div>
                  </div>
                </div>
                <textarea rows="4" placeholder="ESCREVA SUA MENSAGEM AQUI..." className="bg-[#1e293b] border border-gray-700 p-5 rounded-2xl text-white font-medium resize-none focus:border-yellow-500 outline-none"></textarea>
              </div>
            )}

            <button type="submit" disabled={isMotorRunning} className={`w-full font-black tracking-[0.3em] text-lg md:text-2xl py-6 md:py-8 rounded-[2.5rem] shadow-2xl transition uppercase ${isMotorRunning ? 'bg-gray-800 text-gray-600' : 'bg-yellow-500 hover:bg-yellow-400 text-gray-900'}`}>
              {isMotorRunning ? '⚙️ MOTOR EM OPERAÇÃO...' : '⚡ ATIVAR O MAM'}
            </button>
          </form>
        </div>
      </div>

      {/* TERMINAL V12 (DIREITA) */}
      <div className="flex-1 bg-[#050b14] rounded-[2.5rem] border-2 border-blue-500/20 shadow-2xl p-6 md:p-8 font-mono text-[10px] md:text-sm min-h-[400px] md:min-h-[600px] flex flex-col relative overflow-hidden">
         <div className="text-blue-400 font-black mb-6 flex items-center justify-between border-b border-gray-800 pb-4">
            <div className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${isMotorRunning ? 'bg-green-500 animate-pulse' : 'bg-green-900'}`}></span>
              <span className="tracking-widest">TERMINAL V12 LIVE</span>
            </div>
         </div>
         <div className="flex-1 overflow-y-auto scrollbar-none flex flex-col gap-2">
            {consoleLogs.map((log, i) => (
              <div key={i} className={`${log.includes('[MOTOR]') ? 'text-yellow-400' : 'text-gray-400'}`}>{log}</div>
            ))}
            <div ref={logEndRef} />
         </div>
      </div>

      {/* MODAL QR CODE */}
      {showQrModal && (
        <div className="fixed inset-0 bg-black/95 z-[110] flex items-center justify-center p-4">
           <div className="bg-[#1e293b] p-8 md:p-12 rounded-[3rem] border border-gray-700 w-full max-w-sm text-center">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">Conectar WhatsApp</h2>
              <div className="w-52 h-52 bg-white p-3 rounded-2xl mx-auto flex items-center justify-center">
                 {qrCodeData ? <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCodeData)}`} alt="QR" /> : "Gerando..."}
              </div>
              <button onClick={() => setShowQrModal(false)} className="mt-8 text-gray-500 font-bold uppercase text-xs">Fechar</button>
           </div>
        </div>
      )}
    </div>
  );
}