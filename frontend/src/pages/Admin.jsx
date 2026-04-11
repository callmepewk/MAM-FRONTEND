import { useState } from 'react';
import { Users, BarChart3, Zap, Settings, Plus, Search, Building2, ShieldAlert, Key, X, TrendingUp } from 'lucide-react';

export default function Admin() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  
  // 🛡️ ESTADOS ORIGINAIS PRESERVADOS
  const [metrics] = useState({ leads: 0, envios: 0, conversao: 0 });
  const [clients] = useState([]); 

  const generatePassword = (e) => {
    e.preventDefault();
    setNewPassword(Math.random().toString(36).slice(-10).toUpperCase() + '!V12');
  };

  return (
    <div className="flex flex-col gap-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* 🏎️ HEADER HQ STYLE */}
      <header className="flex flex-col xl:flex-row justify-between items-end gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic">Admin Master</h1>
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-12 bg-amber-500"></span>
            <p className="text-gray-500 text-xs md:text-sm font-black uppercase tracking-[0.4em]">Visão Consolidada da Operação Ai Doctor Ltda.</p>
          </div>
        </div>
        
        <div className="flex gap-4 w-full xl:w-auto">
          <div className="relative group flex-1 xl:flex-none">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-600 group-focus-within:text-amber-500 transition-colors" />
            </div>
            <input type="text" placeholder="FILTRAR CLIENTE..." className="w-full bg-white/5 border border-white/10 text-white font-black py-5 pl-12 pr-6 rounded-3xl outline-none focus:border-amber-500/50 transition-all text-[10px] tracking-widest uppercase backdrop-blur-md" />
          </div>
          <button onClick={() => setShowAddModal(true)} className="flex-1 xl:flex-none bg-amber-500 text-black font-black py-5 px-10 rounded-3xl hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all text-[10px] tracking-[0.2em] uppercase flex items-center justify-center gap-3">
            <Plus className="w-4 h-4" /> Novo Acesso
          </button>
        </div>
      </header>

      {/* 🚥 METRICAS GLOBAIS (TELEMETRIA HQ) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Leads Totais', val: metrics.leads, unit: 'Capturas', icon: Users, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Tráfego Total', val: metrics.envios, unit: 'Disparos', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Performance', val: `${metrics.conversao}%`, unit: 'Conversion', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' }
        ].map((item, i) => (
          <div key={i} className="bg-[#1e293b]/40 backdrop-blur-xl p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className={`absolute -right-4 -top-4 w-24 h-24 ${item.bg.replace('/10', '/5')} blur-3xl group-hover:opacity-100 transition-opacity`}></div>
            <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">{item.label}</span>
                <div className={`${item.bg} p-3 rounded-2xl ${item.color} shadow-lg`}>
                    <item.icon className="w-5 h-5" />
                </div>
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-6xl font-black text-white italic tracking-tighter">{item.val}</span>
                <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{item.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 📊 DATABASE CLIENTS (HQ VAULT) */}
      <div className="bg-[#1e293b]/20 backdrop-blur-md rounded-[3.5rem] border border-white/5 overflow-hidden shadow-2xl">
        <div className="p-10 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-500">
                <Building2 className="w-6 h-6" />
             </div>
             <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Frota de Clientes</h2>
          </div>
          <div className="flex gap-3">
             <span className="px-6 py-2 bg-white/5 rounded-full text-[10px] font-black text-amber-500 uppercase tracking-widest border border-white/5">PJ: 00</span>
             <span className="px-6 py-2 bg-white/5 rounded-full text-[10px] font-black text-blue-500 uppercase tracking-widest border border-white/5">PF: 00</span>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-none">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-white/5 text-gray-500 text-[10px] uppercase tracking-[0.4em] italic">
                <th className="p-10 font-black">Cliente / ID</th>
                <th className="p-10 font-black text-center">Vertical</th>
                <th className="p-10 font-black text-center">Staff</th>
                <th className="p-10 font-black text-center">Leads Vol.</th>
                <th className="p-10 font-black text-center">Status V12</th>
                <th className="p-10 font-black text-right">Controle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {clients.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-32 text-center">
                    <div className="flex flex-col items-center gap-6 opacity-20">
                      <ShieldAlert className="w-20 h-20 text-gray-400" />
                      <p className="font-black uppercase tracking-[0.5em] text-xs">Aguardando Conexão de Novos Operadores</p>
                    </div>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔐 MODAL NOVO ACESSO (SECURITY CONSOLE) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-3xl z-[200] flex items-center justify-center p-6 animate-in zoom-in duration-500" onClick={() => setShowAddModal(false)}>
          <div className="bg-[#0f172a] border border-amber-500/20 p-12 rounded-[4rem] w-full max-w-2xl shadow-[0_0_80px_rgba(245,158,11,0.1)] flex flex-col gap-10 relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>
            
            <header className="flex justify-between items-center border-b border-white/5 pb-8 relative z-10">
                <div className="space-y-1">
                   <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Injetar Novo Operador</h2>
                   <p className="text-amber-500/50 text-[10px] font-black uppercase tracking-widest">Protocolo de Criação de Credenciais</p>
                </div>
                <X className="w-6 h-6 text-gray-500 cursor-pointer hover:text-white transition" onClick={() => setShowAddModal(false)} />
            </header>

            <div className="flex flex-col gap-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-2 italic">Nome da Corporação</label>
                  <input type="text" placeholder="EX: CLÍNICA VIP..." className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-amber-500 font-black uppercase text-sm italic transition-all" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-2 italic">Endpoint Admin</label>
                  <input type="email" placeholder="EMAIL@EXEMPLO.COM" className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-amber-500 font-black uppercase text-sm transition-all" />
                </div>
              </div>
              
              <div className="space-y-4">
                <label className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] ml-2 italic">Token de Acesso Temporário</label>
                <div className="flex flex-col md:flex-row gap-4 items-center bg-black/40 p-3 rounded-3xl border border-white/5">
                  <div className="flex-1 flex items-center gap-4 pl-4">
                    <Key className="w-4 h-4 text-amber-500/50" />
                    <input type="text" readOnly value={newPassword} placeholder="AGUARDANDO GERAÇÃO..." className="bg-transparent text-amber-500 font-mono font-black text-sm tracking-[0.3em] outline-none w-full" />
                  </div>
                  <button onClick={generatePassword} className="w-full md:w-auto bg-amber-500/10 hover:bg-amber-500 hover:text-black border border-amber-500/30 text-amber-500 px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all">Gerar Chave</button>
                </div>
              </div>
            </div>

            <div className="flex gap-6 relative z-10">
               <button onClick={() => setShowAddModal(false)} className="flex-1 text-gray-600 font-black uppercase text-[10px] tracking-widest hover:text-white transition">Cancelar</button>
               <button onClick={() => setShowAddModal(false)} className="flex-[2] bg-green-600 text-black py-6 rounded-[2rem] font-black uppercase shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:bg-green-500 hover:scale-[1.02] transition-all tracking-widest text-sm italic">Efetivar Cadastro</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer HQ System */}
      <div className="text-center text-[9px] font-black text-gray-800 uppercase tracking-[0.6em] mt-10">
         HQ System Control • Version 2026.4.12 • CTO Access Only
      </div>
    </div>
  );
}