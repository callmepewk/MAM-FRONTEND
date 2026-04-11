import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { ShieldCheck, Info, Filter, MessageSquare, Clock, Zap, CheckCircle2, Calendar } from 'lucide-react';

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
  
  // 🛡️ Novos Estados: Extração e Omnichannel
  const [showTerms, setShowTerms] = useState(true); 
  const [action, setAction] = useState('extract'); 
  const [extractFilters, setExtractFilters] = useState({ name: true, cell: true, email: true, phone: false });
  const [message, setMessage] = useState('');
  const [mediaLink, setMediaLink] = useState('');
  const [scheduleNextDay, setScheduleNextDay] = useState(false);
  
  // 📟 Telemetria de Progresso
  const [isMotorRunning, setIsMotorRunning] = useState(false);
  const [progress, setProgress] = useState({ 
    total: 0, current: 0, wppSent: 0, emailSent: 0, remaining: 0, eta: '--:--', startTime: null 
  });
  const [consoleLogs, setConsoleLogs] = useState(['[SISTEMA] Aguardando ignição do Motor V12...']);

  // 📡 Handlers do Socket
  useEffect(() => {
    socket.on('terminal_log', (log) => setConsoleLogs(prev => [...prev.slice(-100), log]));
    
    socket.on('task_progress', (data) => {
      setProgress(prev => ({
        ...prev,
        total: data.total,
        current: data.current,
        wppSent: data.wppSent,
        emailSent: data.emailSent,
        remaining: data.total - data.current,
        eta: data.eta
      }));
    });

    socket.on('task_complete', () => {
      setIsMotorRunning(false);
      setConsoleLogs(prev => [...prev, '[FINALIZADO] Extração concluída. Dados disponíveis em LEADS.']);
    });

    socket.on('qr_code', (data) => { setQrCodeData(data.code); setShowQrModal(true); });
    socket.on('wpp_status', (data) => { if (data.status === 'CONNECTED') { setWppConnected(true); setShowQrModal(false); } });
    
    return () => socket.off();
  }, []);

  useEffect(() => { logEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [consoleLogs]);

  const handleStartMotor = (e) => {
    e.preventDefault();
    if (!settings.spreadsheetId) return alert("⚠️ Configure sua planilha primeiro.");
    setIsMotorRunning(true);
    setProgress(prev => ({ ...prev, startTime: new Date().toLocaleTimeString() }));
    
    socket.emit('execute_task', { 
      action, 
      extractFilters,
      message, 
      mediaLink,
      scheduleNextDay,
      spreadsheetId: settings.spreadsheetId, 
      abaDestino: settings.abaDestino
    });
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      
      {/* 🔐 MODAL TERMOS DE USO (OBRIGATÓRIO) */}
      {showTerms && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6">
          <div className="bg-[#0f172a] border border-white/10 p-10 md:p-16 rounded-[4rem] max-w-2xl w-full shadow-[0_0_100px_rgba(0,0,0,1)] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px]"></div>
             <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-8">Protocolo de Operação</h2>
             <div className="h-64 overflow-y-auto pr-4 text-gray-500 text-[11px] font-medium space-y-6 mb-10 scrollbar-none">
                <p>O Motor MAM V12 é um sistema de processamento ETL e automação omnichannel. Ao clicar em aceitar, você concorda que:</p>
                <p>1. A origem dos dados é de sua inteira responsabilidade, devendo respeitar a LGPD e legislações vigentes.</p>
                <p>2. O sistema utiliza Service Accounts do Google para extração segura, não armazenando senhas de acesso.</p>
                <p>3. Os limites de cadência (50 WPP/dia e 300 Email/dia) são protocolos de segurança para evitar banimento de suas contas.</p>
                <p>4. Em caso de interrupção forçada, o agendamento de 24h garante a retomada respeitando as políticas de spam das plataformas.</p>
             </div>
             <button onClick={() => setShowTerms(false)} className="w-full bg-amber-500 text-black py-6 rounded-3xl font-black uppercase tracking-widest text-sm shadow-2xl hover:scale-[1.02] transition-all">Aceitar e Iniciar Cockpit</button>
          </div>
        </div>
      )}

      {/* 🏎️ HEADER */}
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-7xl italic font-black tracking-tighter text-white uppercase">Engine V12</h1>
        <div className="flex items-center gap-3">
            <span className="h-[2px] w-12 bg-amber-500"></span>
            <p className="text-gray-500 text-xs md:text-sm font-black uppercase tracking-[0.4em]">Central de Inteligência de Dados</p>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        <div className="xl:col-span-7 space-y-10">
          
          {/* 🟦 INSTRUÇÃO GOOGLE SHEETS */}
          <div className="bg-blue-500/5 border border-blue-500/20 p-8 rounded-[3rem] group">
            <div className="flex items-start gap-5">
               <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500"><Info className="w-6 h-6" /></div>
               <div className="space-y-2">
                  <h4 className="text-white font-black text-xs uppercase tracking-widest">Ativação do Service Account</h4>
                  <p className="text-gray-500 text-[11px] font-medium leading-relaxed uppercase">
                    Compartilhe sua planilha (Botão Share) com o e-mail do nosso bot para permitir a extração:
                  </p>
                  <code className="block bg-black/40 p-3 rounded-xl text-amber-500 font-mono text-[10px] border border-white/5 break-all">
                    motor-v12-auth@ai-doctor-mam.iam.gserviceaccount.com
                  </code>
               </div>
            </div>
          </div>

          {/* 🚥 FILTROS DE EXTRAÇÃO */}
          <div className="bg-[#1e293b]/40 backdrop-blur-xl border border-white/5 p-10 rounded-[3rem] shadow-2xl">
            <h3 className="text-amber-500 font-black text-[10px] uppercase tracking-[0.4em] mb-8 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Parâmetros de Varredura
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: 'name', label: 'Nomes' },
                { id: 'cell', label: 'Celular' },
                { id: 'email', label: 'Emails' },
                { id: 'phone', label: 'Fixo/Tel' }
              ].map(f => (
                <button key={f.id} onClick={() => setExtractFilters({...extractFilters, [f.id]: !extractFilters[f.id]})}
                  className={`py-4 rounded-2xl font-black text-[10px] border transition-all uppercase tracking-widest ${extractFilters[f.id] ? 'bg-amber-500 text-black border-amber-500 shadow-lg' : 'bg-black/20 text-gray-600 border-white/5'}`}>
                  {extractFilters[f.id] ? '✅ ' : '○ '}{f.label}
                </button>
              ))}
            </div>
          </div>

          {/* 📟 DASHBOARD DE TELEMETRIA (PROGRESSO) */}
          {isMotorRunning && (
            <div className="bg-[#1e293b]/60 border border-amber-500/20 p-10 rounded-[3.5rem] shadow-3xl animate-in zoom-in duration-500 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
               
               <div className="flex justify-between items-end mb-10">
                  <div className="space-y-2">
                     <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Início: {progress.startTime}</span>
                     <h4 className="text-3xl font-black text-white italic uppercase tracking-tighter">Telemetria Real</h4>
                  </div>
                  <div className="text-right">
                     <span className="text-6xl font-black text-white italic">{Math.round((progress.current / (progress.total || 1)) * 100)}%</span>
                     <p className="text-amber-500 font-black text-[10px] uppercase tracking-widest mt-1">ETA: {progress.eta}</p>
                  </div>
               </div>

               {/* Barra de Progresso SAE */}
               <div className="w-full h-5 bg-black/40 rounded-full mb-10 p-1 border border-white/5">
                  <div className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all duration-1000" style={{ width: `${(progress.current / (progress.total || 1)) * 100}%` }}></div>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="bg-black/30 p-5 rounded-3xl border border-white/5 text-center">
                    <span className="text-[8px] font-black text-gray-600 uppercase block mb-1">WhatsApp</span>
                    <span className="text-xl font-black text-green-500 italic">{progress.wppSent}/50</span>
                  </div>
                  <div className="bg-black/30 p-5 rounded-3xl border border-white/5 text-center">
                    <span className="text-[8px] font-black text-gray-600 uppercase block mb-1">E-mail</span>
                    <span className="text-xl font-black text-blue-500 italic">{progress.emailSent}/300</span>
                  </div>
                  <div className="bg-black/30 p-5 rounded-3xl border border-white/5 text-center">
                    <span className="text-[8px] font-black text-gray-600 uppercase block mb-1">Faltantes</span>
                    <span className="text-xl font-black text-white italic">{progress.remaining}</span>
                  </div>
                  <div className="bg-black/30 p-5 rounded-3xl border border-white/5 text-center">
                    <span className="text-[8px] font-black text-gray-600 uppercase block mb-1">Total Leads</span>
                    <span className="text-xl font-black text-amber-500 italic">{progress.total}</span>
                  </div>
               </div>
            </div>
          )}

          {/* 📝 CONFIGURAÇÃO DE DISPARO */}
          <div className="bg-[#1e293b]/40 border border-white/5 p-10 rounded-[3rem] shadow-2xl space-y-8">
            <div className="flex flex-col gap-6">
              <label className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] ml-2 italic">Configuração de Redação Omnichannel</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} rows="5" placeholder="REDAÇÃO DA MENSAGEM (ACEITA LINKS E VARIÁVEIS)..." className="w-full bg-black/40 border border-white/10 p-6 rounded-[2rem] text-white text-sm outline-none focus:border-amber-500 transition-all resize-none shadow-inner italic" />
              <input type="text" value={mediaLink} onChange={e => setMediaLink(e.target.value)} placeholder="LINK DA FOTO/VÍDEO (HTTPS://...)" className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-amber-500 font-bold transition-all text-xs" />
            </div>

            <div className="flex items-center justify-between bg-black/20 p-6 rounded-3xl border border-white/5 group">
               <div className="flex items-center gap-4">
                  <Calendar className="w-5 h-5 text-gray-500 group-hover:text-amber-500 transition-colors" />
                  <div className="space-y-1">
                     <p className="text-white font-black text-xs uppercase tracking-widest italic">Agendamento de 24h</p>
                     <p className="text-gray-600 text-[9px] font-bold uppercase">Retomar envios restantes no próximo ciclo</p>
                  </div>
               </div>
               <button onClick={() => setScheduleNextDay(!scheduleNextDay)} className={`w-14 h-8 rounded-full transition-all relative ${scheduleNextDay ? 'bg-amber-500' : 'bg-gray-800'}`}>
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${scheduleNextDay ? 'left-7' : 'left-1'}`}></div>
               </button>
            </div>

            <button type="submit" onClick={handleStartMotor} disabled={isMotorRunning} className={`w-full py-8 rounded-[2.5rem] font-black text-2xl tracking-[0.3em] transition-all italic ${isMotorRunning ? 'bg-gray-800 text-gray-600' : 'bg-gradient-to-r from-amber-500 to-orange-600 text-black hover:scale-[1.01] shadow-[0_20px_50px_rgba(245,158,11,0.2)]'}`}>
              {isMotorRunning ? '⚙️ ENGINE IN OPERATION...' : '⚡ ATIVAR MOTOR V12'}
            </button>
          </div>
        </div>

        {/* 📟 TERMINAL TELEMETRIA (DIREITA) */}
        <div className="xl:col-span-5 h-[850px] sticky top-28 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-10 font-mono text-[11px] flex flex-col shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] opacity-20"></div>
          
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6 relative z-10">
            <div className="flex items-center gap-4">
              <span className={`w-3 h-3 rounded-full ${isMotorRunning ? 'bg-green-500 animate-pulse' : 'bg-amber-900'}`}></span>
              <span className="text-amber-500 font-black tracking-[0.3em] uppercase italic">Telemetry V12 Live</span>
            </div>
            <span className="text-[10px] text-gray-700 font-black uppercase tracking-widest">Protocol V2.4.12</span>
          </div>
          
          <div className="flex-1 overflow-y-auto scrollbar-none space-y-3 relative z-10">
            {consoleLogs.map((log, i) => (
              <div key={i} className={`${log.includes('[MOTOR]') ? 'text-amber-400 font-bold' : log.includes('[CONCLUÍDO]') ? 'text-green-500' : 'text-gray-500'} flex gap-4 transition-all hover:text-white`}>
                <span className="opacity-20 font-black">[{new Date().toLocaleTimeString()}]</span>
                <span className="tracking-tight italic">{log}</span>
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
}