import { CheckCircle2, ArrowRight, Rocket, ShieldCheck, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] p-4 font-sans relative overflow-hidden">
      
      {/* Efeito de Fundo - Aura de Sucesso */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Card de Sucesso (Glassmorphism V12) */}
      <div className="bg-[#1e293b]/40 backdrop-blur-2xl p-10 md:p-20 rounded-[4rem] border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.5)] w-full max-w-3xl text-center relative z-10 animate-in fade-in zoom-in duration-700">
        
        {/* Glow Decorativo Interno */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/10 blur-[80px] rounded-full"></div>

        {/* ICONOGRAFIA DE ALTA PERFORMANCE */}
        <div className="relative inline-block mb-12">
          <div className="relative z-10 bg-[#0f172a] p-8 rounded-[2.5rem] border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.2)]">
            <CheckCircle2 className="w-20 h-20 md:w-24 md:h-24 text-amber-500" />
          </div>
          {/* Elementos Flutuantes */}
          <div className="absolute -top-4 -right-4 bg-amber-500 text-black p-3 rounded-2xl shadow-xl animate-bounce">
            <Rocket className="w-6 h-6" />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-[#1e293b] border border-white/10 p-3 rounded-2xl shadow-xl">
            <Zap className="w-6 h-6 text-amber-500" />
          </div>
        </div>
        
        {/* TEXTOS DE COMANDO */}
        <div className="space-y-4 mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-[0.9]">
            Módulo <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Ativado</span>
          </h1>
          <p className="text-gray-500 font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mt-4">
            Assinatura processada • Protocolo V12 Desbloqueado
          </p>
        </div>

        {/* CHECKLIST DE PRÉ-VOO (TECH BOX) */}
        <div className="bg-black/40 p-8 md:p-10 rounded-[2.5rem] border border-white/5 text-left relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl"></div>
          
          <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Checklist de Partida
          </h4>
          
          <ul className="space-y-6">
            {[
              { id: '01', text: 'Sincronize seu eSIM na aba de Perfil' },
              { id: '02', text: 'Vincule sua Base Mestra (Sheets/PDF)' },
              { id: '03', text: 'Inicie a ignição no Painel do Motor' }
            ].map((step) => (
              <li key={step.id} className="flex gap-5 items-center group/item">
                <span className="text-xs font-black text-gray-700 group-hover/item:text-amber-500 transition-colors">{step.id}.</span>
                <span className="text-xs md:text-sm text-gray-400 font-black uppercase tracking-widest group-hover/item:text-white transition-colors italic">
                  {step.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* BOTÃO DE ACESSO (V12 SHIMMER) */}
        <button 
          onClick={() => navigate('/dashboard')}
          className="group relative w-full mt-12 py-6 bg-amber-500 text-black font-black rounded-[2rem] flex items-center justify-center gap-4 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] transition-all duration-500 uppercase tracking-[0.2em] text-sm md:text-lg overflow-hidden"
        >
          {/* Efeito de Reflexo (Shimmer) */}
          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:left-full transition-all duration-1000"></div>
          
          Assumir o Comando <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </button>
      </div>

      {/* Footer System Info */}
      <div className="text-center text-[9px] font-black text-gray-800 uppercase tracking-[0.6em] mt-10">
         Activation Success • License ID: V12-PRO-2026 • Ai Doctor
      </div>
    </div>
  );
}