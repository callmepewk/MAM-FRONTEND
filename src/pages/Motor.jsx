import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

// 🔌 Conexão com o servidor do Bot (Porta 3001 definida no seu index.js)
const socket = io('https://mam-completo.onrender.com');

export default function Motor() {
  const navigate = useNavigate();
  const logEndRef = useRef(null);

  // Lógica de Plano e Dados do Usuário (Mantido)
  const userPlan = 'starter'; 
  const maxCampaignDays = userPlan === 'starter' ? 14 : 31;
  const userEmail = "admin@gmail.com"; 
  const isGmailAuto = userEmail.toLowerCase().includes('@gmail.com');

  // Estados de Conexão Reais
  const [wppConnected, setWppConnected] = useState(false);
  const [gmailConnected, setGmailConnected] = useState(isGmailAuto); 
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(''); // Armazena a string do QR

  // Estados do Motor (Mantido)
  const [action, setAction] = useState(''); 
  const [robotTarget, setRobotTarget] = useState('aidoctor');
  const [sameText, setSameText] = useState(true);
  const [consoleLogs, setConsoleLogs] = useState(['[SISTEMA] Aguardando ignição do Motor V12...']);
  const [isMotorRunning, setIsMotorRunning] = useState(false);

  // Limites Anti-Ban (Mantido)
  const [wppLimit, setWppLimit] = useState(50);
  const [emailLimit, setEmailLimit] = useState(100);

  // 🎧 Listeners do Socket.io (Ouvindo o index.js)
  useEffect(() => {
    // 1. Ouvir logs do terminal real
    socket.on('terminal_log', (log) => {
      setConsoleLogs(prev => [...prev.slice(-100), log]); // Mantém os últimos 100 logs
    });

    // 2. Ouvir geração de QR Code
    socket.on('qr_code', (data) => {
      setQrCodeData(data.code);
      setShowQrModal(true);
    });

    // 3. Ouvir status de conexão
    socket.on('wpp_status', (data) => {
      if (data.status === 'CONNECTED') {
        setWppConnected(true);
        setShowQrModal(false);
      }
    });

    return () => {
      socket.off('terminal_log');
      socket.off('qr_code');
      socket.off('wpp_status');
    };
  }, []);

  // 📐 Auto-scroll do Terminal
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consoleLogs]);

  const handleConnectRequest = (type) => {
    if(type === 'wpp') {
      // Envia comando para o bot iniciar a conexão para o número padrão
      socket.emit('request_wpp_connection', '5521980343873'); 
    }
  };

  const handleStartMotor = (e) => {
    e.preventDefault();
    if (!wppConnected && (action === 'wpp' || action === 'both')) {
      alert("⚠️ WhatsApp desconectado. Clique no ícone de status para conectar.");
      return;
    }
    
    setIsMotorRunning(true);
    
    // 🚀 Envia a tarefa real para o index.js via Socket
    socket.emit('execute_task', {
      action,
      wppLimit,
      emailLimit,
      target: robotTarget,
      // Aqui você passaria as bases selecionadas e as copies do formulário
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 md:gap-12 pb-20">
      
      {/* COLUNA DE CONFIGURAÇÃO (ESQUERDA) - MANTIDA INTEGRALMENTE */}
      <div className="flex-[1.5] flex flex-col gap-8">
        
        <div className="flex flex-col gap-4 border-b border-gray-800 pb-6 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">Motor MAM</h1>
          <p className="text-sm md:text-lg text-gray-400 font-medium italic">
            🚀 Central de Comando V12. <span className="text-yellow-500 font-bold">Bot index.js Online.</span>
          </p>
        </div>

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
              {gmailConnected ? `GMAIL: ${userEmail} (AUTO)` : 'GMAIL DESCONECTADO'}
            </div>
        </div>

        <div className="bg-[#1e293b] p-6 md:p-10 rounded-[2.5rem] border border-gray-800 shadow-2xl">
          <form onSubmit={handleStartMotor} className="flex flex-col gap-10">
            
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <label className="text-sm md:text-lg font-black text-yellow-500 uppercase tracking-widest text-left">1. Seleção de Bases (Lista de Espera)</label>
                <a href="/planilhas" className="text-xs text-blue-400 font-bold hover:underline mb-1">🗂️ Compilar Planilhas</a>
              </div>
              <select multiple className="bg-[#0b1120] border-2 border-gray-700 p-5 rounded-3xl text-white h-32 md:h-40 focus:border-yellow-500 outline-none font-bold text-sm md:text-lg scrollbar-thin">
                <option disabled className="text-gray-500 italic">Mantenha pressionado para selecionar várias...</option>
                <option value="1">Base Clínica Alpha (450 leads)</option>
                <option value="2">Lista Estética Sul (120 leads)</option>
              </select>
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-sm md:text-lg font-black text-yellow-500 uppercase tracking-widest text-left">2. Canal de Disparo</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                 {[
                   {id: 'extract', label: 'EXTRAIR'}, 
                   {id: 'wpp', label: 'WHATSAPP'}, 
                   {id: 'email', label: 'EMAIL'}, 
                   {id: 'both', label: 'AMBOS'}
                 ].map(opt => (
                   <button 
                    key={opt.id} type="button" onClick={() => setAction(opt.id)}
                    className={`py-4 rounded-xl font-black text-[10px] md:text-xs border-2 transition ${action === opt.id ? 'bg-yellow-500 text-gray-900 border-yellow-500 shadow-lg shadow-yellow-500/20' : 'bg-[#0b1120] text-gray-500 border-gray-800 hover:border-gray-600'}`}
                   >
                     {opt.label}
                   </button>
                 ))}
              </div>
            </div>

            {(action && action !== 'extract') && (
              <div className="bg-[#0b1120] p-6 md:p-8 rounded-[2rem] border border-gray-800 flex flex-col gap-8 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-4">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Período da Campanha</span>
                    <div className="flex flex-col gap-3">
                      <input type="datetime-local" className="bg-[#1e293b] border border-gray-700 p-4 rounded-xl text-white font-bold text-sm" required />
                      <input type="datetime-local" className="bg-[#1e293b] border border-gray-700 p-4 rounded-xl text-white font-bold text-sm" required />
                    </div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase">Sincronizado com Google Agenda | Limite Plano: {maxCampaignDays} dias</p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Controle Anti-Ban (Diário)</span>
                    <div className="flex flex-col gap-3">
                       <div className="flex items-center justify-between bg-[#1e293b] p-3 rounded-xl border border-gray-700">
                          <span className="text-[10px] font-black text-green-500">WPP:</span>
                          <input type="number" max="50" value={wppLimit} onChange={e => setWppLimit(e.target.value)} className="bg-transparent text-right font-black w-12 outline-none text-white" />
                       </div>
                       <div className="flex items-center justify-between bg-[#1e293b] p-3 rounded-xl border border-gray-700">
                          <span className="text-[10px] font-black text-blue-400">EMAIL:</span>
                          <input type="number" max="100" value={emailLimit} onChange={e => setEmailLimit(e.target.value)} className="bg-transparent text-right font-black w-12 outline-none text-white" />
                       </div>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-tight">Os limites de 50 (WPP) e 100 (E-mail) são restrições de segurança.</p>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col gap-6">
                  <h4 className="font-black text-yellow-500 uppercase text-sm tracking-widest">Conteúdo das Abordagens</h4>
                  {action === 'both' && (
                    <button type="button" onClick={() => setSameText(!sameText)} className="text-[10px] font-black uppercase flex items-center gap-2 text-gray-400">
                      <div className={`w-4 h-4 rounded border ${sameText ? 'bg-yellow-500 border-yellow-500' : 'border-gray-600'}`}></div>
                      Mesmo texto para ambos os canais
                    </button>
                  )}
                  <div className="flex flex-col gap-4">
                    {(action === 'email' || action === 'both') && <input type="text" placeholder="ASSUNTO DO E-MAIL" className="bg-[#1e293b] border border-gray-700 p-4 rounded-xl text-white font-bold" />}
                    <textarea rows="5" placeholder="ESCREVA SUA MENSAGEM AQUI (ACEITA LINKS URL)..." className="bg-[#1e293b] border border-gray-700 p-5 rounded-2xl text-white font-medium resize-none focus:border-yellow-500 transition outline-none"></textarea>
                  </div>
                </div>
              </div>
            )}

            <button 
              type="submit" disabled={isMotorRunning}
              className={`w-full font-black tracking-[0.3em] text-lg md:text-2xl py-6 md:py-8 rounded-[2.5rem] shadow-2xl transition uppercase ${isMotorRunning ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-400 text-gray-900 shadow-yellow-500/20'}`}
            >
              {isMotorRunning ? '⚙️ MOTOR EM OPERAÇÃO...' : '⚡ ATIVAR O MAM'}
            </button>
          </form>
        </div>
      </div>

      {/* CONSOLE V12 REAL-TIME (DIREITA) */}
      <div className="flex-1 bg-[#050b14] rounded-[2.5rem] border-2 border-blue-500/20 shadow-2xl p-6 md:p-8 font-mono text-[10px] md:text-sm min-h-[400px] md:min-h-[600px] flex flex-col relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
         
         <div className="text-blue-400 font-black mb-6 flex items-center justify-between border-b border-gray-800 pb-4">
            <div className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${isMotorRunning ? 'bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]' : 'bg-green-900'}`}></span>
              <span className="tracking-widest">TERMINAL V12 LIVE</span>
            </div>
            <span className="text-[8px] opacity-50">API: v2.4.1</span>
         </div>

         <div className="flex-1 overflow-y-auto scrollbar-none flex flex-col gap-2">
            {consoleLogs.map((log, i) => (
              <div key={i} className={`${log.includes('[MOTOR]') ? 'text-yellow-400' : 'text-gray-400'}`}>
                {log}
              </div>
            ))}
            <div ref={logEndRef} />
            {isMotorRunning && <div className="text-green-500 animate-pulse">_</div>}
         </div>
      </div>

      {/* MODAL QR CODE REAL (MANTIDO E FUNCIONAL) */}
      {showQrModal && (
        <div className="fixed inset-0 bg-black/95 z-[110] flex items-center justify-center p-4" onClick={() => setShowQrModal(false)}>
           <div className="bg-[#1e293b] p-8 md:p-12 rounded-[3rem] border border-gray-700 w-full max-w-sm text-center shadow-2xl" onClick={e => e.stopPropagation()}>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">Conectar WhatsApp</h2>
              <div className="w-52 h-52 bg-white p-3 rounded-2xl mx-auto relative overflow-hidden flex items-center justify-center shadow-2xl">
                 <div className="absolute top-0 left-0 w-full h-1 bg-green-500 animate-[scan_2s_linear_infinite] z-10"></div>
                 {qrCodeData ? (
                   <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCodeData)}`} alt="QR Code" className="opacity-90" />
                 ) : (
                   <div className="text-gray-900 font-black animate-pulse uppercase text-xs">Gerando Sessão...</div>
                 )}
              </div>
              <p className="text-[10px] text-yellow-500 mt-8 font-black uppercase animate-pulse">Aguardando leitura do dispositivo</p>
           </div>
        </div>
      )}
    </div>
  );
}