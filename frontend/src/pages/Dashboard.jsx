import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 📐 MetricCard com Efeito de Profundidade e Glow
const MetricCard = ({ title, value, unit = '', icon }) => (
  <div className="bg-[#1e293b]/40 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-white/5 flex flex-col gap-6 w-full group hover:border-amber-500/30 transition-all duration-500 relative overflow-hidden">
    {/* Glow de fundo no hover */}
    <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/5 blur-3xl group-hover:bg-amber-500/10 transition-all"></div>
    
    <div className="flex items-center justify-between">
      <span className="font-black text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-500">{title}</span>
      <div className="bg-amber-500/10 p-3 rounded-2xl text-amber-500 text-2xl filter drop-shadow-[0_0_8px_rgba(245,158,11,0.3)] transition-transform group-hover:scale-110">
        {icon}
      </div>
    </div>
    
    <div className="flex items-baseline gap-2 relative z-10">
      <span className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter italic">{value}</span>
      <span className="text-[10px] md:text-sm font-black text-gray-600 uppercase tracking-widest">{unit}</span>
    </div>
  </div>
);

const LegendItem = ({ color, label, value }) => (
  <div className="flex justify-between items-center text-[10px] md:text-xs border-b border-white/5 pb-4 w-full group">
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full ${color} shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:scale-125 transition-transform`}></div>
      <span className="text-gray-500 font-black uppercase tracking-widest group-hover:text-gray-300 transition-colors">{label}</span>
    </div>
    <span className="text-white font-black italic">{value}</span>
  </div>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const userRole = 'admin'; 
  const userPlan = 'pro'; 
  const [monthsOfUsage] = useState(1); 
  const [reportsCount, setReportsCount] = useState(0);
  const [showNormalModal, setShowNormalModal] = useState(false);
  const [showCompModal, setShowCompModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [metrics] = useState({ totalLeads: 0, totalConverted: 0, conversionRate: 0, hot: 0, warm: 0, cold: 0, complete: 0 });
  const reportLimit = userRole === 'admin' ? Infinity : (userPlan === 'starter' ? 1 : 4);

  const handleGenerate = (type) => {
    setIsGenerating(true);
    type === 'normal' ? setShowNormalModal(true) : setShowCompModal(true);
    setTimeout(() => { setIsGenerating(false); setReportsCount(prev => prev + 1); }, 2000);
  };

  return (
    <div className="flex flex-col gap-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* 🏎️ Header V12 Style */}
      <div className="flex flex-col xl:flex-row justify-between items-end gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic">Métricas Reais</h1>
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-12 bg-amber-500"></span>
            <p className="text-gray-500 text-xs md:text-sm font-black uppercase tracking-[0.4em]">Inteligência Clínica em Escala</p>
          </div>
        </div>
        
        <div className="flex gap-4 w-full xl:w-auto">
          <button onClick={() => handleGenerate('comp')} className="flex-1 xl:flex-none bg-white/5 border border-white/10 text-white font-black py-5 px-10 rounded-3xl hover:bg-white/10 transition-all text-[10px] tracking-[0.2em] uppercase backdrop-blur-md">
            📊 Comparativo {monthsOfUsage < 3 && userRole !== 'admin' && '🔒'}
          </button>
          <button onClick={() => handleGenerate('normal')} className="flex-1 xl:flex-none bg-amber-500 text-black font-black py-5 px-10 rounded-3xl hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all text-[10px] tracking-[0.2em] uppercase">
            📄 Gerar PDF ({userRole === 'admin' ? '∞' : `${reportsCount}/${reportLimit}`})
          </button>
        </div>
      </div>

      {/* 🏎️ Grid de Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Extração Total" value={metrics.totalLeads} unit="Leads" icon="👥" />
        <MetricCard title="Conversão Real" value={metrics.totalConverted} unit="Vendas" icon="💰" />
        <MetricCard title="Efficiency Score" value={metrics.conversionRate} unit="%" icon="📈" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gráfico 1 - Qualidade */}
        <div className="bg-[#1e293b]/40 backdrop-blur-xl p-10 rounded-[3rem] border border-white/5 flex flex-col items-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h3 className="text-[10px] font-black text-gray-500 mb-12 uppercase tracking-[0.4em]">Integridade de Dados</h3>
          
          <div className="relative w-56 h-56 flex items-center justify-center">
            <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
              <path className="text-white/5" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-amber-500" strokeWidth="3" strokeDasharray={`${metrics.complete}, 100`} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                style={{ filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.5))' }} />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-5xl font-black text-white italic">{metrics.complete}%</span>
              <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Matched</span>
            </div>
          </div>
          
          <div className="w-full mt-12 space-y-4">
             <LegendItem color="bg-amber-500" label="Dados Completos (Full Stack)" value={`${metrics.complete}%`} />
             <LegendItem color="bg-white/10" label="Dados Parciais" value={`${100 - metrics.complete}%`} />
          </div>
        </div>

        {/* Gráfico 2 - IA Qualificação */}
        <div className="bg-[#1e293b]/40 backdrop-blur-xl p-10 rounded-[3rem] border border-white/5 flex flex-col items-center group relative">
          <h3 className="text-[10px] font-black text-gray-500 mb-12 uppercase tracking-[0.4em]">Qualificação V12 Engine</h3>
          
          <div className="w-56 h-56 rounded-full border-[20px] border-white/5 flex items-center justify-center relative shadow-[inset_0_0_30px_rgba(0,0,0,0.4)]">
              {/* Fake Gauges */}
              <div className="absolute inset-[-4px] rounded-full border-t-4 border-red-500 rotate-[45deg] opacity-40"></div>
              <div className="absolute inset-[-4px] rounded-full border-r-4 border-amber-500 rotate-[120deg] opacity-40"></div>
              
              <div className="text-center">
                <span className="text-amber-500 font-black text-3xl italic tracking-tighter">MOTOR</span>
                <p className="text-white font-black text-sm uppercase tracking-widest mt-1">V12</p>
              </div>
          </div>
          
          <div className="w-full mt-12 space-y-4">
             <LegendItem color="bg-red-600" label="Lead High-Priority (Fogo)" value={`${metrics.hot}%`} />
             <LegendItem color="bg-amber-500" label="Lead Qualificado" value={`${metrics.warm}%`} />
             <LegendItem color="bg-blue-500" label="Lead em Aquecimento" value={`${metrics.cold}%`} />
          </div>
        </div>
      </div>

      {/* 📐 MODAL PREMIUM (DARK GLASS) */}
      {(showNormalModal || showCompModal) && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[110] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-[#0f172a] border border-white/10 w-full max-w-2xl p-12 rounded-[3.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] relative overflow-hidden">
             {/* Glow decorativo dentro do modal */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px]"></div>
             
             <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">
                  {showNormalModal ? 'Relatório V12' : 'Evolução Temporal'}
                </h2>
                <button onClick={() => { setShowNormalModal(false); setShowCompModal(false); }} className="text-gray-500 hover:text-white transition text-2xl">✕</button>
             </div>

             {isGenerating ? (
               <div className="py-20 flex flex-col items-center gap-8">
                 <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(245,158,11,0.4)]"></div>
                 <p className="font-black text-[10px] text-gray-400 uppercase tracking-[0.4em] animate-pulse">Processando Big Data...</p>
               </div>
             ) : (
               <div className="space-y-8 relative z-10">
                 <div className="bg-amber-500/5 border border-amber-500/20 p-8 rounded-[2rem]">
                    <p className="text-amber-200/80 text-sm font-medium leading-relaxed italic italic">
                      "A análise do Motor V12 indica que sua taxa de conversão sobe 42% quando os leads são abordados nos primeiros 15 minutos após a extração."
                    </p>
                 </div>
                 <button className="w-full bg-amber-500 text-black py-6 rounded-3xl font-black text-lg tracking-widest hover:scale-[1.02] transition-all uppercase">⬇️ Download Analítico</button>
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
}