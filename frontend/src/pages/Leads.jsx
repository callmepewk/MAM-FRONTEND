import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Leads() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const [leads, setLeads] = useState([]); // Prontidão para dados reais
  const [selectedLeads, setSelectedLeads] = useState([]);

  const userRole = 'admin'; 
  const isPremiumUser = userRole === 'admin';

  const filteredLeads = leads.filter(l => {
    const matchesFilter = filter === 'all' ? true : l.status === filter;
    const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.phone.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const handleDeleteSelected = () => {
    if (selectedLeads.length === 0) return;
    if (window.confirm(`Excluir ${selectedLeads.length} leads permanentemente?`)) {
      setLeads(leads.filter(l => !selectedLeads.includes(l.id)));
      setSelectedLeads([]);
    }
  };

  const handleDeleteAll = () => {
    if (leads.length === 0) return;
    if (window.confirm("⚠️ OPERAÇÃO CRÍTICA: Apagar todo o banco de leads?")) {
      setLeads([]);
      setSelectedLeads([]);
    }
  };

  const toggleLeadSelection = (id) => {
    setSelectedLeads(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleSendToMotor = () => {
    navigate('/motor', { state: { targetFilter: filter, selectedCount: selectedLeads.length } });
  };

  return (
    <div className="flex flex-col gap-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* 🚀 HEADER PREMIUM */}
      <div className="flex flex-col xl:flex-row justify-between items-end gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic">Gestão de Leads</h1>
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-12 bg-amber-500"></span>
            <p className="text-gray-500 text-xs md:text-sm font-black uppercase tracking-[0.4em]">Segmentação e Inteligência de Pacientes</p>
          </div>
        </div>
        
        <div className="flex gap-4 w-full xl:w-auto">
          {leads.length > 0 && (
            <button onClick={handleDeleteAll} className="flex-1 xl:flex-none bg-red-500/5 border border-red-500/20 text-red-500 font-black py-5 px-8 rounded-3xl hover:bg-red-500 hover:text-white transition-all text-[10px] tracking-[0.2em] uppercase">
              Limpar Banco
            </button>
          )}
          <button onClick={() => setShowAddModal(true)} className="flex-1 xl:flex-none bg-amber-500 text-black font-black py-5 px-10 rounded-3xl hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all text-[10px] tracking-[0.2em] uppercase">
            + Novo Lead Manual
          </button>
        </div>
      </div>

      {/* 🔍 BARRA DE BUSCA (TECH STYLE) */}
      <div className="relative group">
        <div className="absolute inset-0 bg-amber-500/5 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
        <div className="relative bg-[#1e293b]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] flex items-center p-2 shadow-2xl">
          <span className="pl-8 pr-4 text-amber-500/50 text-2xl group-focus-within:text-amber-500 transition-colors">🔍</span>
          <input 
            type="text" 
            placeholder="Filtrar por nome ou identificador..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none text-white py-6 w-full focus:outline-none font-black text-sm md:text-xl uppercase tracking-widest placeholder:text-gray-700"
          />
          {selectedLeads.length > 0 && (
            <button onClick={handleDeleteSelected} className="mr-4 bg-red-600 text-white font-black py-3 px-6 rounded-2xl text-[9px] uppercase tracking-widest animate-in zoom-in shadow-lg">
              Deletar Selecionados ({selectedLeads.length})
            </button>
          )}
        </div>
      </div>

      {/* 🚥 FILTROS E AÇÕES DE SEGMENTAÇÃO */}
      <div className="bg-[#1e293b]/20 backdrop-blur-md p-6 rounded-[3rem] border border-white/5 flex flex-col xl:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3 overflow-x-auto w-full xl:w-auto pb-4 xl:pb-0 scrollbar-none">
          {['all', 'hot', 'warm', 'cold'].map((f) => (
            <button 
              key={f} 
              onClick={() => setFilter(f)}
              className={`px-8 py-4 rounded-full text-[10px] font-black transition-all whitespace-nowrap uppercase tracking-widest border
                ${filter === f ? 'bg-amber-500 text-black border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)]' : 'bg-black/20 text-gray-500 border-white/5 hover:border-white/20'}`}
            >
              {f === 'all' ? `Global (${leads.length})` : f === 'hot' ? `🔥 Muito Quente` : f === 'warm' ? `🌡️ Quente` : `❄️ Frio`}
            </button>
          ))}
          
          <div className="relative ml-2 shrink-0 group" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-black text-amber-500 cursor-help transition-all group-hover:bg-amber-500/10">?</div>
            {showTooltip && (
              <div className="absolute left-0 xl:left-12 top-12 xl:top-0 w-72 bg-[#0f172a] border border-white/10 p-6 rounded-[2rem] shadow-3xl z-[120] animate-in fade-in zoom-in">
                <div className="space-y-4">
                  <p className="text-[10px] uppercase font-black tracking-widest"><b className="text-red-500 mr-2">🔥</b> Pronto para agendamento.</p>
                  <p className="text-[10px] uppercase font-black tracking-widest"><b className="text-amber-500 mr-2">🌡️</b> Demonstrou interesse.</p>
                  <p className="text-[10px] uppercase font-black tracking-widest"><b className="text-blue-400 mr-2">❄️</b> Contato inicial/frio.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {filter !== 'all' && (
          <div className="w-full xl:w-auto">
            {isPremiumUser ? (
               <button onClick={handleSendToMotor} className="w-full xl:w-auto bg-amber-500 text-black font-black px-10 py-4 rounded-2xl hover:scale-[1.02] transition-all uppercase text-[10px] tracking-[0.2em] shadow-lg">
                 🚀 Enviar {filter.toUpperCase()} para Motor
               </button>
            ) : (
               <button onClick={() => navigate('/plans')} className="w-full xl:w-auto bg-amber-500/10 border border-amber-500/20 text-amber-500 font-black px-10 py-4 rounded-2xl text-[10px] uppercase tracking-widest">⭐ Liberar Segmentação</button>
            )}
          </div>
        )}
      </div>

      {/* 📊 LISTA DE LEADS (GLASS CARDS) */}
      <div className="flex flex-col gap-6 min-h-[400px]">
        {filteredLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-[#1e293b]/10 rounded-[4rem] border-2 border-dashed border-white/5 px-8 text-center">
             <span className="text-8xl mb-8 opacity-10 filter grayscale">📭</span>
             <p className="text-gray-600 font-black uppercase tracking-[0.5em] text-xs">Aguardando Captura de Dados</p>
          </div>
        ) : (
          filteredLeads.map(lead => (
            <div key={lead.id} className="bg-[#1e293b]/40 backdrop-blur-xl p-8 rounded-[3rem] border border-white/5 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 hover:border-amber-500/30 transition-all duration-500 shadow-xl group">
              
              <div className="flex items-center gap-8 w-full xl:w-auto">
                {/* CHECKBOX CUSTOM */}
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    checked={selectedLeads.includes(lead.id)} 
                    onChange={() => toggleLeadSelection(lead.id)} 
                    className="w-8 h-8 rounded-xl border-2 border-white/10 bg-black/40 appearance-none checked:bg-amber-500 transition-all cursor-pointer shadow-inner" 
                  />
                  {selectedLeads.includes(lead.id) && <span className="absolute inset-0 flex items-center justify-center text-black font-bold pointer-events-none">✓</span>}
                </div>
                
                {/* STATUS ICON (SAE GLASS STYLE) */}
                <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-3xl shrink-0 shadow-2xl relative overflow-hidden
                  ${lead.status === 'hot' ? 'bg-red-500/10 text-red-500' : lead.status === 'warm' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'}`}>
                  <div className="absolute inset-0 bg-current opacity-5 animate-pulse"></div>
                  {lead.status === 'hot' ? '🔥' : lead.status === 'warm' ? '🌡️' : '❄️'}
                </div>

                <div className="flex flex-col overflow-hidden">
                  <h3 className="text-xl md:text-3xl font-black text-white truncate uppercase tracking-tighter italic">{lead.name}</h3>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-[10px] font-black uppercase tracking-widest text-gray-500 mt-2">
                    <span className="flex items-center gap-2"><span className="text-amber-500/50">✉</span> {lead.email}</span>
                    <span className="flex items-center gap-2"><span className="text-amber-500/50">📱</span> {lead.phone}</span>
                  </div>
                </div>
              </div>

              {/* STATS & ACTIONS */}
              <div className="flex flex-wrap items-center gap-6 w-full xl:w-auto border-t xl:border-t-0 border-white/5 pt-6 xl:pt-0">
                 <div className="flex-1 xl:flex-none text-left xl:text-right px-6 xl:border-r border-white/5">
                    <span className="block text-[10px] font-black text-white uppercase tracking-widest">{lead.contactCount || 0} Ciclos</span>
                    <span className="text-[9px] text-gray-600 font-black uppercase mt-1 block">Ult. Interação: {lead.lastContact || '---'}</span>
                 </div>
                 <a href={`https://wa.me/${lead.phone}`} target="_blank" rel="noreferrer" className="flex-1 xl:flex-none text-center bg-white/5 hover:bg-green-600 text-white hover:text-white border border-white/10 rounded-2xl py-4 px-8 font-black text-[10px] uppercase tracking-widest transition-all shadow-lg">
                   Ativar WhatsApp
                 </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🔐 MODAL MANUAL (BLACK GLASS) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[200] flex items-center justify-center p-6 animate-in zoom-in duration-300" onClick={() => setShowAddModal(false)}>
          <div className="bg-[#0f172a] border border-white/10 p-12 rounded-[4rem] w-full max-w-xl shadow-3xl flex flex-col gap-10 relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px]"></div>
            
            <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter border-b border-white/5 pb-8 relative z-10">Cadastrar Paciente</h2>
            <div className="flex flex-col gap-6 relative z-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] ml-2">Identificação</label>
                <input type="text" placeholder="NOME DO PACIENTE" className="w-full bg-black/40 border border-white/10 p-6 rounded-[1.5rem] text-white outline-none focus:border-amber-500 font-black uppercase text-sm italic transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] ml-2">Contato</label>
                <input type="text" placeholder="WHATSAPP (DDD)" className="w-full bg-black/40 border border-white/10 p-6 rounded-[1.5rem] text-white outline-none focus:border-amber-500 font-black uppercase text-sm transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] ml-2">Correio Eletrônico</label>
                <input type="email" placeholder="EMAIL@EXEMPLO.COM" className="w-full bg-black/40 border border-white/10 p-6 rounded-[1.5rem] text-white outline-none focus:border-amber-500 font-black uppercase text-sm transition-all" />
              </div>
            </div>
            
            <div className="flex gap-4 mt-4 relative z-10">
               <button onClick={() => setShowAddModal(false)} className="flex-1 text-gray-600 font-black uppercase text-[10px] tracking-[0.2em] hover:text-white transition">Cancelar</button>
               <button className="flex-[2] bg-amber-500 text-black font-black py-6 rounded-[2rem] shadow-2xl hover:scale-[1.02] transition-all uppercase tracking-[0.2em] text-sm">Salvar Registro</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}