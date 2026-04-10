import { useState } from 'react';

export default function Admin() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  
  // 🛡️ ESTADOS ORIGINAIS PRESERVADOS (AGUARDANDO BACKEND)
  const [metrics] = useState({ leads: 0, envios: 0, conversao: 0 });
  const [clients] = useState([]); 

  const generatePassword = (e) => {
    e.preventDefault();
    setNewPassword(Math.random().toString(36).slice(-10) + '!A');
  };

  return (
    // 📐 PADRONIZAÇÃO MESTRA: max-w-7xl
    <div className="max-w-7xl mx-auto flex flex-col gap-10 md:gap-16 pb-20 px-2 md:px-0">
      
      {/* HEADER ROBUSTO */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="w-full">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-tight">Admin Master</h1>
          <p className="text-gray-400 mt-2 font-medium italic text-sm md:text-xl">Visão consolidada da operação Ai Doctor Ltda.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="bg-[#1e293b] border-2 border-gray-800 rounded-2xl px-6 py-4 flex items-center shadow-inner group">
            <span className="text-gray-500 font-bold uppercase text-xs md:text-sm whitespace-nowrap">🔍 Buscar cliente...</span>
          </div>
          <button onClick={() => setShowAddModal(true)} className="bg-yellow-500 text-gray-900 font-black py-4 px-8 rounded-2xl md:rounded-3xl shadow-2xl hover:bg-yellow-400 transition text-sm md:text-lg uppercase tracking-widest active:scale-95">
            + Adicionar Cliente
          </button>
        </div>
      </div>

      {/* METRICAS GLOBAIS (GRID PADRONIZADO) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div className="bg-[#1e293b] p-8 rounded-[2rem] border-2 border-gray-800 shadow-xl flex flex-col gap-4">
          <span className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] flex justify-between items-center">Leads Totais <span>👥</span></span>
          <div className="text-4xl md:text-6xl font-black text-white leading-none">{metrics.leads}</div>
          <div className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-widest border-t border-gray-800 pt-4 mt-2">Base Global (PF + PJ)</div>
        </div>

        <div className="bg-[#1e293b] p-8 rounded-[2rem] border-2 border-gray-800 shadow-xl flex flex-col gap-4">
          <span className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] flex justify-between items-center">Envios Totais <span className="text-blue-500">↗</span></span>
          <div className="text-4xl md:text-6xl font-black text-white leading-none">{metrics.envios}</div>
          <div className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-widest border-t border-gray-800 pt-4 mt-2">Tráfego Omnichannel</div>
        </div>

        <div className="bg-[#1e293b] p-8 rounded-[2rem] border-2 border-gray-800 shadow-xl flex flex-col gap-4">
          <span className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] flex justify-between items-center">Conversão Média <span className="text-green-500">📊</span></span>
          <div className="text-4xl md:text-6xl font-black text-white leading-none">{metrics.conversao}%</div>
          <div className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-widest border-t border-gray-800 pt-4 mt-2">Performance SaaS</div>
        </div>
      </div>

      {/* LISTAGEM DE CLIENTES COM PROTEÇÃO DE SCROLL MOBILE */}
      <div className="bg-[#1e293b] rounded-[2.5rem] border-2 border-gray-800 overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">Clientes Ativos</h2>
          <div className="flex gap-3 text-[10px] md:text-xs font-black uppercase">
            <span className="bg-yellow-500/10 text-yellow-500 px-4 py-2 rounded-xl border border-yellow-500/20">PJ: 0</span>
            <span className="bg-blue-500/10 text-blue-500 px-4 py-2 rounded-xl border border-blue-500/20">PF: 0</span>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#0b1120] text-gray-500 text-[10px] md:text-xs uppercase tracking-[0.2em]">
                <th className="p-8 font-black">Cliente / Tipo</th>
                <th className="p-8 font-black">Setor / Uso</th>
                <th className="p-8 font-black text-center">Funcionários</th>
                <th className="p-8 font-black text-center">Leads</th>
                <th className="p-8 font-black text-center">Envios</th>
                <th className="p-8 font-black text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 font-medium">
              {clients.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-20 text-center text-gray-500">
                    <span className="text-5xl block mb-4 grayscale opacity-30">🏢</span>
                    <p className="font-black uppercase tracking-widest">Nenhum cliente na base de dados</p>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL ADICIONAR (RESTAURADO E RESPONSIVO) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4 md:p-8" onClick={() => setShowAddModal(false)}>
          <div className="bg-[#1e293b] p-8 md:p-12 rounded-[3.5rem] border-2 border-yellow-500/30 w-full max-w-2xl shadow-2xl flex flex-col gap-8 animate-in fade-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
            <div className="border-b border-gray-800 pb-6">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Novo Acesso</h2>
              <p className="text-gray-400 text-sm font-bold mt-1">O cliente será forçado a trocar a senha no primeiro login.</p>
            </div>
            
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="NOME DA EMPRESA" className="bg-[#0b1120] border-2 border-gray-700 p-5 rounded-2xl text-white outline-none focus:border-yellow-500 font-black uppercase text-sm" />
                <input type="email" placeholder="EMAIL COMERCIAL" className="bg-[#0b1120] border-2 border-gray-700 p-5 rounded-2xl text-white outline-none focus:border-yellow-500 font-black uppercase text-sm" />
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 items-center bg-[#0b1120] p-4 rounded-2xl border-2 border-gray-800">
                <input type="text" readOnly value={newPassword} placeholder="SENHA NÃO GERADA" className="flex-1 bg-transparent text-yellow-500 font-mono font-black text-center md:text-left tracking-widest" />
                <button onClick={generatePassword} className="w-full md:w-auto bg-gray-800 text-white px-6 py-3 rounded-xl font-black uppercase text-[10px] hover:bg-gray-700 transition">Gerar Senha</button>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
               <button onClick={() => setShowAddModal(false)} className="flex-1 text-gray-500 font-black uppercase hover:text-white transition tracking-widest">Cancelar</button>
               <button onClick={() => setShowAddModal(false)} className="flex-[2] bg-green-600 text-white py-5 rounded-3xl shadow-xl hover:bg-green-500 transition uppercase font-black tracking-widest text-lg">Criar Cliente</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}