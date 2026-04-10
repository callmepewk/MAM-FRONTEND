export default function PerguntasFrequentes() {
  const faqs = [
    { q: "Meu número pode ser banido do WhatsApp?", a: "Sim, se você enviar centenas de mensagens de uma vez. Por isso, travamos o Motor em 50 disparos diários via WhatsApp. Isso garante 100% de entregabilidade e zero risco de banimento." },
    { q: "Posso fechar o site enquanto o Motor roda?", a: "Sim! A nossa infraestrutura fica na nuvem. Uma vez que você clica em 'Ativar MAM', os servidores trabalham em background. Você receberá notificações push quando a campanha acabar." },
    { q: "Como funciona a segmentação de leads?", a: "O Chatbot tem uma IA que lê as respostas do cliente. Se ele perguntar preço, vira 'Muito Quente'. Se visualizar e não responder, vira 'Frio'. Isso ajuda você a saber com quem gastar energia." },
    { q: "O que acontece se meu plano vencer?", a: "Sua conta entra em modo leitura. Os disparos e extrações são pausados, mas seus dados, bases e leads continuam salvos e acessíveis até você renovar a assinatura." }
  ];

  return (
    // 📐 PADRONIZAÇÃO: max-w-7xl (Régua de páginas leves)
    <div className="max-w-7xl mx-auto flex flex-col gap-10 md:gap-16 pb-20 px-2 md:px-0">
      
      {/* HEADER ROBUSTO E RESPONSIVO */}
      <div className="flex flex-col gap-4 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-tight">
          Perguntas Frequentes
        </h1>
        <p className="text-gray-400 text-base md:text-xl font-medium italic">
          Tire suas dúvidas rápidas sobre a operação do SaaS.
        </p>
      </div>
      
      {/* LISTAGEM DE CARDS PADRONIZADOS */}
      <div className="flex flex-col gap-6 md:gap-8">
        {faqs.map((faq, i) => (
          <div 
            key={i} 
            className="bg-[#1e293b] p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] border-2 border-gray-800 shadow-xl hover:border-blue-500/30 transition-all duration-300 group"
          >
            {/* PERGUNTA (Q) */}
            <h3 className="text-lg md:text-2xl font-black text-yellow-500 mb-6 uppercase tracking-widest flex items-start gap-4">
              <span className="opacity-40 text-white group-hover:text-yellow-500 transition-colors">Q:</span> 
              {faq.q}
            </h3>
            
            {/* RESPOSTA (A) */}
            <div className="flex items-start gap-4 border-t border-gray-800 pt-6">
              <span className="text-blue-400 font-black text-lg md:text-2xl">A:</span>
              <p className="text-gray-300 text-sm md:text-lg leading-relaxed font-medium">
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* FOOTER DE AJUDA ADICIONAL */}
      <div className="bg-gradient-to-r from-[#1e293b] to-transparent p-8 rounded-[2rem] border border-gray-800 text-center md:text-left">
        <p className="text-gray-400 font-bold">Não encontrou o que procurava?</p>
        <button className="text-yellow-500 font-black uppercase tracking-widest mt-2 hover:text-yellow-400 transition">
          Falar com suporte humano →
        </button>
      </div>

    </div>
  );
}