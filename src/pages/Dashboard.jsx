import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 📐 MetricCard Restaurado com Dimensionamento Mobile
const MetricCard = ({ title, value, unit = '', icon }) => (
  <div className="bg-[#1e293b] p-6 md:p-8 rounded-[2rem] shadow-lg border border-gray-800 flex flex-col gap-4 w-full">
    <div className="flex items-center justify-between text-gray-400">
      <span className="font-black text-xs md:text-lg uppercase tracking-widest">{title}</span>
      <div className="bg-yellow-500/10 p-3 rounded-2xl text-yellow-500 text-2xl scale-75 md:scale-100">{icon}</div>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl md:text-6xl font-black text-white leading-none">{value}</span>
      <span className="text-xs md:text-xl font-bold text-gray-500 uppercase">{unit}</span>
    </div>
  </div>
);

// 📐 LegendItem Restaurado
const LegendItem = ({ color, label, value }) => (
  <div className="flex justify-between items-center text-xs md:text-base border-b border-gray-800/60 pb-3 w-full">
    <div className="flex items-center gap-3">
      <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${color} shadow-sm`}></div>
      <span className="text-gray-300 font-bold uppercase tracking-tight">{label}</span>
    </div>
    <span className="text-white font-black">{value}</span>
  </div>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const userRole = 'admin'; 
  const userPlan = 'pro'; 
  const [monthsOfUsage] = useState(1); 
  const [reportsCount, setReportsCount] = useState(0);
  const [compPeriod, setCompPeriod] = useState('3');

  const [showNormalModal, setShowNormalModal] = useState(false);
  const [showCompModal, setShowCompModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const reportLimit = userRole === 'admin' ? Infinity : (userPlan === 'starter' ? 1 : 4);

  // MOCKS ZERADOS (Mantendo prontidão para o Backend)
  const [metrics] = useState({ totalLeads: 0, totalConverted: 0, conversionRate: 0, hot: 0, warm: 0, cold: 0, complete: 0 });

  const handleGenerate = (type) => {
    if (reportsCount >= reportLimit && userRole !== 'admin') {
      alert(`Limite mensal de ${reportLimit} relatórios atingido.`);
      return;
    }
    setIsGenerating(true);
    type === 'normal' ? setShowNormalModal(true) : setShowCompModal(true);
    setTimeout(() => {
      setIsGenerating(false);
      setReportsCount(prev => prev + 1);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-8 md:gap-16 pb-20">
      
      {/* 📐 Header com Redimensionamento Mobile-First */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div className="w-full">
          <h1 className="text-2xl md:text-5xl font-black text-white tracking-tighter">Painel de Métricas</h1>
          <p className="text-gray-400 mt-2 text-sm md:text-xl font-medium italic">Inteligência MAM Ai Doctor em escala real.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <button 
            onClick={() => handleGenerate('comp')} 
            className="bg-blue-600/20 border-2 border-blue-500/30 text-blue-400 font-black py-4 px-8 rounded-2xl hover:bg-blue-600/30 transition flex items-center justify-center gap-3 relative group text-xs md:text-base uppercase"
          >
             📊 COMPARATIVO {monthsOfUsage < 3 && userRole !== 'admin' && '🔒'}
             {monthsOfUsage < 3 && userRole !== 'admin' && (
               <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] p-3 rounded-xl opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 font-black shadow-2xl border border-red-400">
                  DESBLOQUEIA EM {3 - monthsOfUsage} MESES
               </div>
             )}
          </button>
          <button 
            onClick={() => handleGenerate('normal')} 
            className="bg-yellow-500 text-gray-900 font-black py-4 px-8 rounded-2xl hover:bg-yellow-400 transition shadow-2xl text-xs md:text-lg flex items-center justify-center gap-3 uppercase"
          >
             📄 GERAR PDF ({userRole === 'admin' ? '∞' : `${reportsCount}/${reportLimit}`})
          </button>
        </div>
      </div>

      {/* 📐 Grid 100% Vertical no Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
        <MetricCard title="Leads Extraídos" value={metrics.totalLeads} unit="Leads" icon={<span>👥</span>} />
        <MetricCard title="Convertidos" value={metrics.totalConverted} unit="Vendas" icon={<span>🛍️</span>} />
        <MetricCard title="Taxa Média" value={metrics.conversionRate} unit="%" icon={<span>📈</span>} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
        {/* Gráfico 1 - Qualidade */}
        <div className="bg-[#1e293b] p-6 md:p-12 rounded-[2.5rem] border border-gray-800 flex flex-col items-center">
          <h3 className="text-sm md:text-2xl font-black text-white mb-8 md:mb-10 uppercase tracking-widest">Qualidade dos Canais</h3>
          <div className="relative w-40 h-40 md:w-64 md:h-64 flex items-center justify-center">
            <svg viewBox="0 0 36 36" className="w-full h-full text-yellow-500 drop-shadow-lg">
              <path className="text-gray-800" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-yellow-500" strokeWidth="3.5" strokeDasharray={`${metrics.complete}, 100`} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <span className="absolute text-3xl md:text-6xl font-black text-white">{metrics.complete}%</span>
          </div>
          <div className="w-full mt-10 md:mt-12 flex flex-col gap-3 md:gap-4 border-t border-gray-800 pt-8 md:pt-10">
             <LegendItem color="bg-yellow-500" label="DADOS COMPLETOS (WPP+EMAIL)" value={`${metrics.complete}%`} />
             <LegendItem color="bg-gray-600" label="DADOS PARCIAIS" value={`${100 - metrics.complete}%`} />
          </div>
        </div>

        {/* Gráfico 2 - IA Qualificação */}
        <div className="bg-[#1e293b] p-6 md:p-12 rounded-[2.5rem] border border-gray-800 flex flex-col items-center">
          <h3 className="text-sm md:text-2xl font-black text-white mb-8 md:mb-10 uppercase tracking-widest">Qualificação IA MAM</h3>
          <div className="w-40 h-40 md:w-64 md:h-64 rounded-full border-[15px] md:border-[28px] border-blue-500 border-t-red-500 border-r-yellow-500 flex items-center justify-center shadow-inner shadow-black/50">
             <span className="text-white font-black text-lg md:text-3xl uppercase tracking-tighter text-center leading-tight">Motor<br/>V12</span>
          </div>
          <div className="w-full mt-10 md:mt-12 flex flex-col gap-3 md:gap-4 border-t border-gray-800 pt-8 md:pt-10">
             <LegendItem color="bg-red-500" label="🔥 MUITO QUENTE" value={`${metrics.hot}%`} />
             <LegendItem color="bg-yellow-500" label="🌡️ QUENTE" value={`${metrics.warm}%`} />
             <LegendItem color="bg-blue-500" label="❄️ FRIO" value={`${metrics.cold}%`} />
          </div>
        </div>
      </div>

      {/* 📐 MODAL MENSAL - ÍNTEGRO E RESPONSIVO */}
      {showNormalModal && (
        <div className="fixed inset-0 bg-black/95 z-[110] flex items-center justify-center p-4 md:p-8" onClick={() => setShowNormalModal(false)}>
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl p-6 md:p-14 flex flex-col gap-6 md:gap-8 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
             <div className="flex justify-between items-center border-b pb-6 text-gray-900">
               <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Relatório PDF</h2>
               <button onClick={() => setShowNormalModal(false)} className="text-gray-400 hover:text-red-500 font-bold text-3xl md:text-4xl transition">✕</button>
             </div>
             {isGenerating ? (
               <div className="py-20 flex flex-col items-center gap-6">
                 <div className="w-16 h-16 border-8 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                 <p className="font-black text-gray-600 uppercase tracking-widest text-center">Processando Inteligência...</p>
               </div>
             ) : (
               <div className="flex flex-col gap-6 text-gray-800">
                 <div className="bg-yellow-50 p-6 rounded-2xl border-2 border-yellow-100 font-bold text-sm md:text-lg leading-snug">
                   💡 Insight do Robô: Seus leads com dados completos convertem 3x mais. Continue extraindo e ativando o Motor V12.
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-black text-xs md:text-sm">
                    <div className="p-4 bg-gray-50 rounded-xl border-2 uppercase">ENVIOS POR TIPO: 0</div>
                    <div className="p-4 bg-gray-50 rounded-xl border-2 uppercase text-green-600">ROI ESTIMADO: R$ 0,00</div>
                 </div>
                 <button className="w-full bg-gray-950 text-white py-5 md:py-6 rounded-3xl font-black text-lg md:text-xl shadow-2xl active:scale-95 transition uppercase tracking-widest">⬇️ BAIXAR AGORA</button>
               </div>
             )}
          </div>
        </div>
      )}

      {/* 📐 MODAL COMPARATIVO - ÍNTEGRO E RESPONSIVO */}
      {showCompModal && (
        <div className="fixed inset-0 bg-black/95 z-[110] flex items-center justify-center p-4 md:p-8" onClick={() => setShowCompModal(false)}>
           <div className="bg-white rounded-[2.5rem] w-full max-w-2xl p-6 md:p-14 flex flex-col gap-6 md:gap-8 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center border-b pb-6 text-gray-900">
                 <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">📊 EVOLUÇÃO TEMPORAL</h2>
                 <button onClick={() => setShowCompModal(false)} className="text-gray-400 font-bold text-3xl md:text-4xl transition">✕</button>
              </div>
              {monthsOfUsage < 3 && userRole !== 'admin' ? (
                 <div className="py-12 text-center flex flex-col gap-6 text-gray-500">
                    <span className="text-6xl md:text-8xl">⏳</span>
                    <h3 className="text-xl md:text-2xl font-black text-gray-800 uppercase">DADOS INSUFICIENTES</h3>
                    <p className="text-sm md:text-lg font-medium leading-relaxed">O relatório de evolução exige um histórico mínimo de 3 meses de operação do seu motor.</p>
                 </div>
              ) : (
                <div className="flex flex-col gap-8 md:gap-10">
                   <div>
                      <label className="text-[10px] md:text-xs font-black text-gray-400 uppercase block mb-4 tracking-widest">Escolha o Período Analisado:</label>
                      <div className="flex gap-3 md:gap-4">
                         {['3', '6', '12'].map(p => (
                            <button key={p} onClick={() => setCompPeriod(p)} className={`flex-1 py-4 md:py-5 rounded-2xl border-2 md:border-4 font-black text-base md:text-xl transition ${compPeriod === p ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-xl' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}>
                               {p === '12' ? 'ANUAL' : `${p} MESES`}
                            </button>
                         ))}
                      </div>
                   </div>
                   <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100 text-blue-900 font-bold leading-relaxed text-sm md:text-base">
                      O relatório comparativo analisará a performance da sua clínica cruzando dados de conversão e volume de extração nos últimos {compPeriod} meses.
                   </div>
                   <button className="w-full bg-gray-900 text-white font-black py-5 md:py-6 rounded-3xl shadow-2xl text-lg md:text-xl hover:scale-[1.02] active:scale-95 transition uppercase">GERAR COMPARATIVO</button>
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
}