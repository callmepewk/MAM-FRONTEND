import { BookOpen, Database, Zap, Settings, Target, ArrowRight, PlayCircle } from 'lucide-react';

export default function Tutorial() {
  const steps = [
    {
      id: "01",
      title: "Preparando o Terreno",
      subtitle: "Gestão de Ativos e Bases",
      description: "Antes de acionar a ignição, você precisa de combustível. Vá em 'Bases de Dados' e carregue seus arquivos. Se possuir dados fragmentados, utilize nosso Compilador V12 para unificar até 5 origens em uma base mestra de alta performance.",
      icon: <Database className="w-6 h-6" />,
      tag: "ESTRUTURA"
    },
    {
      id: "02",
      title: "Conectando Turbinas",
      subtitle: "Protocolos WhatsApp & Gmail",
      description: "O motor não opera sem permissões. No painel do Motor MAM, realize o pareamento via QR Code e a autorização OAuth do Google. Esse 'aperto de mãos' digital é o que permite ao robô disparar em seu nome com 100% de segurança.",
      icon: <Zap className="w-6 h-6" />,
      tag: "CONEXÃO"
    },
    {
      id: "03",
      title: "Configurando a Campanha",
      subtitle: "Parâmetros do Motor V12",
      description: "Selecione suas bases e defina o canal (WhatsApp, E-mail ou Omnichannel). Configure os limites de cadência (Anti-Ban) e redija sua copy dinâmica. Ao clicar em 'Ativar MAM', o sistema inicia o processamento em nuvem imediatamente.",
      icon: <Settings className="w-6 h-6" />,
      tag: "OPERAÇÃO"
    },
    {
      id: "04",
      title: "Colhendo os Frutos",
      subtitle: "Inteligência e Conversão",
      description: "Monitore a aba 'Gestão de Leads'. Nossa IA classifica os pacientes em tempo real (🔥 Muito Quente, 🌡️ Quente ou ❄️ Frio). Use essa telemetria para focar sua energia comercial onde o fechamento é iminente.",
      icon: <Target className="w-6 h-6" />,
      tag: "RESULTADO"
    }
  ];

  return (
    <div className="flex flex-col gap-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* 🏎️ HEADER V12 STYLE */}
      <header className="flex flex-col xl:flex-row justify-between items-end gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-7xl italic font-black tracking-tighter text-white uppercase leading-none">Manual do Piloto</h1>
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-12 bg-amber-500"></span>
            <p className="text-gray-500 text-xs md:text-sm font-black uppercase tracking-[0.4em]">Briefing Técnico de Operação V12</p>
          </div>
        </div>
        
        <button className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 text-amber-500 py-4 px-8 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all">
          <PlayCircle className="w-5 h-5" /> Assistir Vídeo-Aula
        </button>
      </header>

      {/* 🚥 GRID DE PASSOS (TIMELINE TECH) */}
      <div className="grid grid-cols-1 gap-8 relative">
        {/* Linha decorativa de conexão (Desktop) */}
        <div className="hidden xl:block absolute left-14 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/50 via-white/5 to-transparent"></div>

        {steps.map((step, i) => (
          <div 
            key={i} 
            className="bg-[#1e293b]/40 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border border-white/5 shadow-2xl hover:border-amber-500/30 transition-all duration-500 group relative overflow-hidden"
          >
            {/* Glow de fundo */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-amber-500/5 blur-[100px] group-hover:bg-amber-500/10 transition-all"></div>

            <div className="flex flex-col xl:flex-row gap-10 relative z-10">
              
              {/* INDICADOR NUMÉRICO E ÍCONE */}
              <div className="flex items-center xl:flex-col gap-6">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-black/40 rounded-[2rem] border border-white/10 flex items-center justify-center text-amber-500 text-2xl md:text-4xl font-black italic shadow-2xl group-hover:border-amber-500/50 transition-all">
                  {step.id}
                </div>
                <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-500 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
              </div>

              {/* CONTEÚDO TÉCNICO */}
              <div className="flex flex-col gap-6 flex-1">
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em]">{step.tag}</span>
                  <h3 className="text-2xl md:text-4xl font-black text-white uppercase italic tracking-tighter leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm font-black uppercase tracking-widest italic">{step.subtitle}</p>
                </div>
                
                <div className="bg-black/20 p-6 md:p-8 rounded-[2rem] border border-white/5 relative">
                   <p className="text-gray-400 text-sm md:text-lg font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🛠️ FOOTER FINAL (CTA) */}
      <div className="bg-gradient-to-r from-[#1e293b]/40 to-transparent backdrop-blur-md p-10 md:p-14 rounded-[3rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 group">
        <div className="space-y-2 text-center md:text-left">
          <h4 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter">Pronto para decolar?</h4>
          <p className="text-gray-500 font-black text-[10px] uppercase tracking-[0.3em]">O Motor V12 está em standby aguardando seus comandos.</p>
        </div>
        
        <button className="w-full md:w-auto bg-amber-500 text-black font-black py-6 px-12 rounded-[2rem] text-[10px] uppercase tracking-[0.3em] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
          Ir para o Cockpit <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Decoração Final */}
      <div className="text-center text-[9px] font-black text-gray-800 uppercase tracking-[0.6em] mt-10">
         Flight Manual • Revision 2.4.12 • Ai Doctor Certified
      </div>
    </div>
  );
}