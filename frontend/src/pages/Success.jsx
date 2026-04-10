import { CheckCircle, ArrowRight, PartyPopper } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();

  return (
    // 📐 PADRONIZAÇÃO MESTRA: max-w-7xl (Alinhado com a Régua das páginas leves)
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[80vh] pb-20 px-4 md:px-0">

      {/* CARD DE SUCESSO ROBUSTO: rounded-[2.5rem] e border-2 */}
      <div className="bg-[#1e293b] p-8 md:p-16 rounded-[2.5rem] md:rounded-[3.5rem] border-2 border-gray-800 shadow-2xl w-full max-w-2xl text-center space-y-8 md:space-y-12 animate-in fade-in zoom-in duration-700">
        
        {/* ICONOGRAFIA IMPACTANTE */}
        <div className="relative inline-block">
          <CheckCircle className="w-20 h-20 md:w-32 md:h-32 text-yellow-500 mx-auto drop-shadow-[0_0_20px_rgba(234,179,8,0.2)]" />
          <div className="absolute -top-2 -right-2 animate-bounce">
            <PartyPopper className="w-8 h-8 md:w-12 md:h-12 text-yellow-500" />
          </div>
        </div>
        
        {/* TEXTOS DE CELEBRAÇÃO */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-tight">
            Assinatura Ativa!
          </h1>
          <p className="text-gray-400 font-bold text-sm md:text-lg italic leading-relaxed">
            Obrigado por escolher o <span className="text-yellow-500 font-black">MAM Ai Doctor</span>. <br className="hidden md:block" />
            Seu motor foi desbloqueado e está pronto para decolar.
          </p>
        </div>

        {/* BOX DE PRÓXIMOS PASSOS PADRONIZADO */}
        <div className="p-6 md:p-10 bg-[#0b1120] rounded-[2rem] border-2 border-gray-800 text-left space-y-6 shadow-inner">
          <p className="text-[10px] md:text-xs font-black text-yellow-500 uppercase tracking-[0.2em]">
            Checklist de Partida:
          </p>
          <ul className="text-xs md:text-base text-gray-300 space-y-4 font-black uppercase tracking-tight">
            <li className="flex gap-4 items-start">
              <span className="text-yellow-500 opacity-50">01.</span>
              <span>Conecte seu WhatsApp na aba Meu Perfil</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-yellow-500 opacity-50">02.</span>
              <span>Vincule sua Base de Dados (PDF/Sheets)</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-yellow-500 opacity-50">03.</span>
              <span>Inicie seu primeiro disparo no Motor V12</span>
            </li>
          </ul>
        </div>

        {/* BOTÃO DE AÇÃO ROBUSTO */}
        <button 
          onClick={() => navigate('/dashboard')}
          className="w-full py-5 md:py-6 bg-yellow-500 text-gray-900 font-black rounded-2xl md:rounded-[2rem] flex items-center justify-center gap-3 hover:bg-yellow-400 transition-all shadow-xl shadow-yellow-500/10 uppercase tracking-[0.2em] text-sm md:text-lg active:scale-95"
        >
          ACESSAR MEU DASHBOARD <ArrowRight className="w-5 h-5 md:w-7 md:h-7" />
        </button>
      </div>

    </div>
  );
}