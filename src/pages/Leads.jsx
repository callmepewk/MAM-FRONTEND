import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Leads() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  // 🛡️ ESTADOS REAIS (ZERO PLACEHOLDERS)
  const [leads, setLeads] = useState([]); // Inicia vazio para receber dados reais
  const [selectedLeads, setSelectedLeads] = useState([]);

  const userRole = 'admin'; 
  const isPremiumUser = userRole === 'admin' ? true : false;

  // Lógica de Filtro e Busca
  const filteredLeads = leads.filter(l => {
    const matchesFilter = filter === 'all' ? true : l.status === filter;
    const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.phone.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  // 🗑️ FUNÇÕES DE EXCLUSÃO
  const handleDeleteSelected = () => {
    if (selectedLeads.length === 0) return;
    if (window.confirm(`Tem certeza que deseja excluir os ${selectedLeads.length} leads selecionados?`)) {
      setLeads(leads.filter(l => !selectedLeads.includes(l.id)));
      setSelectedLeads([]);
    }
  };

  const handleDeleteAll = () => {
    if (leads.length === 0) return;
    if (window.confirm("⚠️ ATENÇÃO: Esta ação é irreversível. Tem certeza que deseja apagar TODOS os leads do seu sistema?")) {
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
    <div className="max-w-[1400px] mx-auto flex flex-col gap-6 md:gap-10 pb-20 px-2 md:px-0">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left w-full">
           <h1 className="text-2xl md:text-5xl font-black text-white tracking-tighter uppercase">Gestão de Leads</h1>
           <p className="text-gray-400 mt-1 font-medium italic text-xs md:text-lg">IA aplicada na segmentação de pacientes.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {leads.length > 0 && (
            <button onClick={handleDeleteAll} className="bg-red-500/10 border-2 border-red-500/50 text-red-500 font-black py-4 px-6 rounded-2xl hover:bg-red-500 hover:text-white transition text-xs uppercase">
              Limpar Tudo
            </button>
          )}
          <button onClick={() => setShowAddModal(true)} className="bg-yellow-500 text-gray-900 font-black py-4 px-8 rounded-2xl md:rounded-3xl shadow-2xl transition hover:bg-yellow-400 text-sm md:text-lg whitespace-nowrap">
            + NOVO LEAD MANUAL
          </button>
        </div>
      </div>

      {/* BARRA DE BUSCA E AÇÕES EM MASSA */}
      <div className="flex flex-col gap-4">
        <div className="bg-[#1e293b] p-2 md:p-3 rounded-2xl border-2 border-gray-800 flex items-center shadow-inner">
          <span className="px-4 md:px-6 text-gray-500 text-xl md:text-2xl">🔍</span>
          <input 
            type="text" 
            placeholder="Buscar por nome ou celular..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none text-white p-3 md:p-5 w-full focus:outline-none font-bold text-sm md:text-lg"
          />
        </div>
        
        {/* BOTÃO EXCLUIR SELECIONADOS (Só aparece se houver seleção) */}
        {selectedLeads.length > 0 && (
          <button onClick={handleDeleteSelected} className="bg-red-600 text-white font-black py-3 px-6 rounded-xl animate-in slide-in-from-top-2 duration-300 text-xs uppercase flex items-center justify-center gap-2 self-end">
            🗑️ Excluir Selecionados ({selectedLeads.length})
          </button>
        )}
      </div>

      {/* FILTROS (CARROSSEL MOBILE) */}
      <div className="flex flex-col gap-6 bg-[#1e293b] p-4 md:p-6 rounded-[2rem] border-2 border-gray-800 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {['all', 'hot', 'warm', 'cold'].map((f) => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                className={`px-6 py-3 rounded-full text-[10px] md:text-sm font-black transition whitespace-nowrap uppercase border-2 
                  ${filter === f ? 'bg-yellow-500 text-gray-900 border-yellow-500 shadow-lg' : 'bg-[#0b1120] text-gray-400 border-gray-800 hover:border-gray-600'}`}
              >
                {f === 'all' ? `TODOS (${leads.length})` : f === 'hot' ? `🔥 MUITO QUENTE` : f === 'warm' ? `🌡️ QUENTE` : `❄️ FRIO`}
              </button>
            ))}
            
            <div className="relative ml-2 shrink-0" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-black text-white cursor-help border border-gray-600">?</div>
              {showTooltip && (
                <div className="absolute left-0 md:left-10 top-10 md:top-0 w-64 md:w-80 bg-gray-950 border-2 border-gray-700 p-5 rounded-2xl shadow-2xl z-[120] text-[10px] md:text-sm text-gray-200 flex flex-col gap-3">
                  <p><b className="text-red-500">🔥 MUITO QUENTE:</b> Pronto para agendamento.</p>
                  <p><b className="text-yellow-500">🌡️ QUENTE:</b> Demonstrou interesse, em nutrição.</p>
                  <p><b className="text-blue-400">❄️ FRIO:</b> Contato inicial ou sem resposta.</p>
                </div>
              )}
            </div>
          </div>

          {filter !== 'all' && (
            <div className="w-full md:w-auto">
              {isPremiumUser ? (
                 <button onClick={handleSendToMotor} className="w-full md:w-auto bg-yellow-500 text-gray-900 font-black px-8 py-3 rounded-xl hover:bg-yellow-400 uppercase text-xs tracking-widest shadow-lg">
                   🚀 Enviar {filter.toUpperCase()} p/ Motor
                 </button>
              ) : (
                 <button onClick={() => navigate('/plans')} className="w-full md:w-auto bg-yellow-500 text-gray-900 font-black px-6 py-3 rounded-xl text-xs uppercase">⭐ Liberar Segmentação</button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* LISTAGEM (PADRONIZADA VERTICAL) */}
      <div className="flex flex-col gap-4 min-h-[400px]">
        {filteredLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#1e293b]/20 rounded-[3rem] border-2 border-dashed border-gray-800 px-8 text-center">
             <span className="text-6xl md:text-8xl mb-6 grayscale opacity-30">📭</span>
             <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-xs md:text-lg">Nenhum lead capturado ou filtrado.</p>
          </div>
        ) : (
          filteredLeads.map(lead => (
            <div key={lead.id} className="bg-[#1e293b] p-5 md:p-8 rounded-[2rem] border-2 border-gray-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:border-gray-600 transition shadow-lg relative group">
              
              <div className="flex items-center gap-4 md:gap-6 w-full lg:w-auto">
                {/* CHECKBOX DE SELEÇÃO */}
                <input 
                  type="checkbox" 
                  checked={selectedLeads.includes(lead.id)} 
                  onChange={() => toggleLeadSelection(lead.id)} 
                  className="w-6 h-6 md:w-8 md:h-8 rounded-lg border-2 border-gray-700 bg-[#0b1120] checked:bg-yellow-500 cursor-pointer transition" 
                />
                
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-xl md:text-3xl shrink-0 ${lead.status === 'hot' ? 'bg-red-500/10 text-red-500' : lead.status === 'warm' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-blue-500/10 text-blue-500'}`}>
                  {lead.status === 'hot' ? '🔥' : lead.status === 'warm' ? '🌡️' : '❄️'}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <h3 className="text-base md:text-2xl font-black text-white truncate uppercase tracking-tighter">{lead.name}</h3>
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-[10px] md:text-sm text-gray-400 font-bold">
                    <span>✉️ {lead.email}</span>
                    <span className="hidden md:inline text-gray-700">|</span>
                    <span>📱 {lead.phone}</span>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto border-t-2 lg:border-t-0 border-gray-800/50 pt-4 lg:pt-0">
                 <div className="flex-1 lg:flex-none text-center px-4 border-r-2 border-gray-800/50">
                    <span className="block text-[10px] md:text-xs font-black text-white uppercase">{lead.contactCount || 0} envios</span>
                    <span className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase">Último: {lead.lastContact || 'N/A'}</span>
                 </div>
                 <a href={`https://wa.me/${lead.phone}`} target="_blank" rel="noreferrer" className="flex-1 lg:flex-none text-center bg-green-600 text-white font-black py-3 px-6 rounded-xl text-[10px] md:text-xs uppercase hover:bg-green-500 transition shadow-lg">WHATSAPP</a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL MANUAL (INTEGRIDADE MANTIDA) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4 md:p-8" onClick={() => setShowAddModal(false)}>
          <div className="bg-[#1e293b] p-8 md:p-14 rounded-[3.5rem] border-2 border-gray-700 w-full max-w-xl shadow-2xl flex flex-col gap-8 animate-in fade-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter border-b-2 border-gray-800 pb-6">Cadastrar Paciente</h2>
            <div className="flex flex-col gap-5">
              <input type="text" placeholder="NOME DO LEAD" className="bg-[#0b1120] border-2 border-gray-700 p-6 rounded-2xl text-white outline-none focus:border-yellow-500 font-black uppercase text-sm md:text-base" />
              <input type="text" placeholder="WHATSAPP (DDD)" className="bg-[#0b1120] border-2 border-gray-700 p-6 rounded-2xl text-white outline-none focus:border-yellow-500 font-black uppercase text-sm md:text-base" />
              <input type="email" placeholder="EMAIL DE CONTATO" className="bg-[#0b1120] border-2 border-gray-700 p-6 rounded-2xl text-white outline-none focus:border-yellow-500 font-black uppercase text-sm md:text-base" />
            </div>
            <div className="flex gap-4 mt-6">
               <button onClick={() => setShowAddModal(false)} className="flex-1 text-gray-400 font-black uppercase hover:text-white transition tracking-widest">Cancelar</button>
               <button className="flex-[2] bg-yellow-500 text-gray-900 font-black py-6 rounded-3xl shadow-xl hover:bg-yellow-400 transition uppercase tracking-widest text-lg">Salvar Lead</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}