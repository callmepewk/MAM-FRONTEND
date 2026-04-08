export default function Plans() {
  return (
    // 📐 PADRONIZAÇÃO MESTRA: max-w-7xl (A Régua das páginas leves)
    <div className="max-w-7xl mx-auto flex flex-col gap-10 md:gap-16 pb-20 px-2 md:px-0">
      
      {/* HEADER ROBUSTO */}
      <div className="text-center flex flex-col gap-4">
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-tight">
          Escolha seu Poder de Fogo
        </h1>
        <p className="text-gray-400 text-base md:text-xl font-medium italic">
          Escale sua clínica com a inteligência do MAM Ai Doctor.
        </p>
      </div>

      {/* GRID DE PLANOS: 1 COLUNA NO MOBILE / 3 NO DESKTOP */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 items-stretch">
        
        {/* PLANO: STARTER */}
        <div className="bg-[#1e293b] border-2 border-gray-800 rounded-[2.5rem] p-8 md:p-10 flex flex-col shadow-xl hover:border-gray-700 transition-all duration-300">
          <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest">Starter</h3>
          <p className="text-sm text-gray-400 mt-2 font-bold italic">Para quem está começando a automatizar.</p>
          
          <div className="mt-8 mb-10 flex items-baseline gap-2">
            <span className="text-4xl md:text-5xl font-black text-white">R$ 297</span>
            <span className="text-gray-500 font-bold uppercase text-sm">/mês</span>
          </div>

          <ul className="flex flex-col gap-5 text-gray-400 flex-1 text-sm md:text-base font-bold">
            <li className="flex items-center gap-3"><span className="text-green-500">✔️</span> Campanhas ativas (14 dias)</li>
            <li className="flex items-center gap-3"><span className="text-green-500">✔️</span> 1 Relatório Executivo PDF</li>
            <li className="flex items-center gap-3"><span className="text-green-500">✔️</span> Disparo WhatsApp Básico</li>
            <li className="flex items-center gap-3 opacity-40"><span className="text-red-500">❌</span> <span className="line-through">Envio Segmentado</span></li>
            <li className="flex items-center gap-3 opacity-40"><span className="text-red-500">❌</span> <span className="line-through">Comparativo Trimestral</span></li>
            <li className="flex items-center gap-3 opacity-40"><span className="text-red-500">❌</span> <span className="line-through">Relatórios de Tipos</span></li>
          </ul>

          <button className="w-full mt-10 bg-gray-800 text-white font-black py-4 md:py-5 rounded-2xl hover:bg-gray-700 transition uppercase tracking-widest text-sm shadow-lg">
            Assinar Starter
          </button>
        </div>

        {/* PLANO: PRO (O QUERIDINHO) */}
        <div className="bg-gradient-to-b from-[#1e293b] to-[#0b1120] border-2 border-yellow-500 rounded-[2.5rem] p-8 md:p-10 flex flex-col relative shadow-[0_0_40px_rgba(234,179,8,0.1)] transform lg:scale-105 z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-gray-900 font-black px-6 py-2 rounded-full text-xs md:text-sm uppercase tracking-tighter shadow-xl">
            🔥 RECOMENDADO
          </div>
          
          <h3 className="text-2xl md:text-3xl font-black text-yellow-500 uppercase tracking-widest">MAM Pro</h3>
          <p className="text-sm text-gray-300 mt-2 font-bold italic">O motor completo para conversão máxima.</p>
          
          <div className="mt-8 mb-10 flex items-baseline gap-2">
            <span className="text-4xl md:text-5xl font-black text-white">R$ 497</span>
            <span className="text-gray-500 font-bold uppercase text-sm">/mês</span>
          </div>

          <ul className="flex flex-col gap-5 text-gray-200 flex-1 text-sm md:text-base font-bold">
            <li className="flex items-center gap-3 text-yellow-500"><span>🔥</span> Campanhas p/ Mês Inteiro</li>
            <li className="flex items-center gap-3 text-yellow-500"><span>🔥</span> Envio Segmentado (IA)</li>
            <li className="flex items-center gap-3 text-yellow-500"><span>🔥</span> 4 Relatórios Executivos</li>
            <li className="flex items-center gap-3"><span>✔️</span> Gráficos de Qualificação</li>
            <li className="flex items-center gap-3"><span>✔️</span> Relatório Comparativo</li>
            <li className="flex items-center gap-3 opacity-40"><span>❌</span> <span className="line-through">Múltiplas Bases (Simultâneas)</span></li>
          </ul>

          <button className="w-full mt-10 bg-yellow-500 text-gray-900 font-black py-4 md:py-6 rounded-2xl hover:bg-yellow-400 transition uppercase tracking-[0.2em] text-sm md:text-base shadow-xl shadow-yellow-500/20 active:scale-95">
            Assinar Pro
          </button>
        </div>

        {/* PLANO: ENTERPRISE */}
        <div className="bg-[#1e293b] border-2 border-gray-800 rounded-[2.5rem] p-8 md:p-10 flex flex-col shadow-xl hover:border-gray-700 transition-all duration-300">
          <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest">Enterprise</h3>
          <p className="text-sm text-gray-400 mt-2 font-bold italic">Para redes e agências de alta escala.</p>
          
          <div className="mt-8 mb-10 flex items-baseline gap-2">
            <span className="text-4xl md:text-5xl font-black text-white">R$ 1.497</span>
            <span className="text-gray-500 font-bold uppercase text-sm">/mês</span>
          </div>

          <ul className="flex flex-col gap-5 text-gray-300 flex-1 text-sm md:text-base font-bold">
            <li className="flex items-center gap-3 text-blue-400"><span>💎</span> Tudo do Pro Ilimitado</li>
            <li className="flex items-center gap-3 text-blue-400"><span>💎</span> Campanhas Sem Trava</li>
            <li className="flex items-center gap-3 text-blue-400"><span>💎</span> Relatórios Customizáveis</li>
            <li className="flex items-center gap-3 text-blue-400"><span>💎</span> Motor Paralelo (Multi-Base)</li>
            <li className="flex items-center gap-3"><span>✔️</span> Servidor de Disparo Dedicado</li>
            <li className="flex items-center gap-3"><span>✔️</span> Suporte VIP 24h</li>
          </ul>

          <button className="w-full mt-10 bg-gray-800 text-white font-black py-4 md:py-5 rounded-2xl hover:bg-gray-700 transition uppercase tracking-widest text-sm shadow-lg">
            Falar com Consultor
          </button>
        </div>
      </div>
    </div>
  );
}