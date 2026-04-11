import { HelpCircle, ShieldCheck, Cloud, Zap, MessageSquare, ArrowRight } from 'lucide-react';

export default function PerguntasFrequentes() {
  const faqs = [
    { 
      q: "Meu número pode ser banido do WhatsApp?", 
      a: "Negativo. O Motor V12 opera com o Protocolo Anti-Ban. Limitamos a cadência em 50 disparos diários com intervalos randômicos. Isso simula o comportamento humano e garante 100% de integridade da sua linha.",
      icon: <ShieldCheck className="w-6 h-6" />
    },
    { 
      q: "Posso fechar o sistema enquanto o Motor trabalha?", 
      a: "Sim. A execução ocorre em nível de servidor (Cloud-Based). Uma vez iniciada a ignição no botão 'Ativar MAM', você pode desconectar. O processamento ETL continuará rodando na nuvem até a conclusão.",
      icon: <Cloud className="w-6 h-6" />
    },
    { 
      q: "Como a IA segmenta a temperatura dos Leads?", 
      a: "O algoritmo analisa semântica e intenção. Palavras-chave de conversão elevam o status para '🔥 Muito Quente'. Falta de interação ou respostas genéricas classificam o lead como '❄️ Frio'.",
      icon: <Zap className="w-6 h-6" />
    },
    { 
      q: "O que acontece com os dados se a licença expirar?", 
      a: "Segurança total. Seus dados entram em 'Cold Storage'. Você mantém acesso à leitura e exportação, porém as funções de disparo e extração são bloqueadas até a reativação do token de acesso.",
      icon: <HelpCircle className="w-6 h-6" />
    }
  ];

  return (
    <div className="flex flex-col gap-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* 🏎️ HEADER V12 STYLE */}
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-7xl italic font-black tracking-tighter text-white uppercase">Central de Ajuda</h1>
        <div className="flex items-center gap-3">
          <span className="h-[2px] w-12 bg-amber-500"></span>
          <p className="text-gray-500 text-xs md:text-sm font-black uppercase tracking-[0.4em]">Protocolos e Dúvidas Operacionais</p>
        </div>
      </header>

      {/* 🚥 GRID DE FAQ (GLASS CARDS) */}
      <div className="grid grid-cols-1 gap-6">
        {faqs.map((faq, i) => (
          <div 
            key={i} 
            className="bg-[#1e293b]/40 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/5 shadow-2xl hover:border-amber-500/30 transition-all duration-500 group relative overflow-hidden"
          >
            {/* Glow de fundo no hover */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-500/5 blur-[80px] group-hover:bg-amber-500/10 transition-all"></div>

            <div className="flex flex-col md:flex-row gap-8 relative z-10">
              
              {/* ÍCONE TÉCNICO */}
              <div className="shrink-0">
                <div className="w-14 h-14 md:w-20 md:h-20 bg-amber-500/10 rounded-[1.5rem] border border-amber-500/20 flex items-center justify-center text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.1)] group-hover:scale-110 transition-transform duration-500">
                  {faq.icon}
                </div>
              </div>

              <div className="flex flex-col gap-6 w-full">
                {/* PERGUNTA */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] opacity-60">Questão Técnica</span>
                  <h3 className="text-xl md:text-3xl font-black text-white uppercase italic tracking-tighter leading-tight">
                    {faq.q}
                  </h3>
                </div>
                
                {/* RESPOSTA */}
                <div className="border-t border-white/5 pt-6">
                   <p className="text-gray-500 text-sm md:text-lg font-medium leading-relaxed">
                    <span className="text-amber-500 font-black mr-2 opacity-30 tracking-widest">RESPOSTA //</span>
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🛠️ FOOTER DE SUPORTE (CALL TO ACTION) */}
      <div className="bg-[#1e293b]/20 backdrop-blur-md p-10 md:p-14 rounded-[3rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 group">
        <div className="space-y-2 text-center md:text-left">
          <h4 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter">Dúvida não listada?</h4>
          <p className="text-gray-500 font-black text-[10px] uppercase tracking-[0.3em]">Nossa engenharia está online para suporte via WhatsApp</p>
        </div>
        
        <button className="w-full md:w-auto flex items-center justify-center gap-3 bg-white/5 hover:bg-amber-500 text-white hover:text-black border border-white/10 rounded-2xl py-5 px-10 font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-xl group-hover:scale-[1.02]">
          <MessageSquare className="w-4 h-4" />
          Suporte Humano <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Decoração Final */}
      <div className="text-center text-[9px] font-black text-gray-800 uppercase tracking-[0.6em] mt-10">
         Knowledge Base System • Version 2026.4.12
      </div>
    </div>
  );
}