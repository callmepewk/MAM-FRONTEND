import { useState } from 'react';
import { User, Mail, Shield, Smartphone, Globe, Edit3, LogOut, CheckCircle2 } from 'lucide-react';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('mam_user')) || { email: "admin@gmail.com", name: "Admin Master" };
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col gap-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* 🏎️ HEADER V12 STYLE */}
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-7xl italic font-black tracking-tighter text-white uppercase">Meu Perfil</h1>
        <div className="flex items-center gap-3">
          <span className="h-[2px] w-12 bg-amber-500"></span>
          <p className="text-gray-500 text-xs md:text-sm font-black uppercase tracking-[0.4em]">Identidade e Credenciais do Operador</p>
        </div>
      </header>

      {/* 🆔 CARD PRINCIPAL (DOSSIÊ) */}
      <div className="bg-[#1e293b]/40 backdrop-blur-xl p-10 md:p-16 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
          {/* Avatar V12 */}
          <div className="relative">
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-[3rem] bg-gradient-to-br from-amber-500 to-orange-600 p-[2px] shadow-[0_0_50px_rgba(245,158,11,0.2)]">
               <div className="w-full h-full bg-[#0f172a] rounded-[2.9rem] flex items-center justify-center">
                  <span className="text-5xl md:text-7xl font-black text-white italic tracking-tighter">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
               </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-green-500 p-3 rounded-2xl border-4 border-[#0f172a] shadow-lg">
               <Shield className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="space-y-1">
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">{user.name}</h2>
              <p className="text-amber-500 font-black text-[10px] md:text-xs uppercase tracking-[0.5em] flex items-center justify-center md:justify-start gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span> Comandante V12 Nível 5
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 pt-4">
               <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black py-4 px-8 rounded-2xl transition-all text-[10px] uppercase tracking-widest">
                 <Edit3 className="w-4 h-4" /> Editar Perfil / Senha
               </button>
               <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-2xl py-4 px-8 transition-all text-[10px] font-black uppercase tracking-widest">
                 <LogOut className="w-4 h-4" /> Encerrar Operação
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🔗 STATUS DE CONEXÃO (GRID 2 COLUNAS) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* WhatsApp Card */}
        <div className="bg-[#1e293b]/40 backdrop-blur-xl p-10 rounded-[3rem] border border-white/5 flex flex-col gap-8 group">
          <div className="flex justify-between items-start">
             <div className="space-y-2">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Módulo de Disparo</span>
                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">WhatsApp eSIM</h3>
             </div>
             <div className="px-4 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-500 text-[10px] font-black uppercase tracking-widest">Ativo</div>
          </div>
          <p className="text-gray-500 text-sm font-medium leading-relaxed">
            Sua linha está sincronizada com o motor de ETL. Mantenha o aparelho conectado para garantir a cadência do Motor V12.
          </p>
          <button className="w-full bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 text-red-500 font-black py-5 rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all">Desconectar Linha</button>
        </div>

        {/* Google Card */}
        <div className="bg-[#1e293b]/40 backdrop-blur-xl p-10 rounded-[3rem] border border-white/5 flex flex-col gap-8 group">
          <div className="flex justify-between items-start">
             <div className="space-y-2">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Ecossistema Google</span>
                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Conta Google</h3>
             </div>
             <div className="px-4 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-500 text-[10px] font-black uppercase tracking-widest">Vinculado</div>
          </div>
          <p className="text-gray-500 text-sm font-medium leading-relaxed">
            Sincronização via OAuth efetuada. O MAM tem permissão para ler planilhas autorizadas e disparar via Gmail corporativo.
          </p>
          <button className="w-full bg-white/5 border border-white/10 text-white font-black py-5 rounded-2xl text-[10px] uppercase tracking-[0.2em] opacity-50 cursor-not-allowed">Conta Sincronizada</button>
        </div>

      </div>

      {/* 🤖 SEÇÃO TÉCNICA: O QUE É O MAM? */}
      <div className="bg-[#1e293b]/20 backdrop-blur-md p-10 md:p-16 rounded-[4rem] border border-white/5 relative overflow-hidden group">
        <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-amber-500/5 blur-[100px] pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
           <div className="shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-amber-500/10 rounded-[2.5rem] flex items-center justify-center shadow-2xl border border-amber-500/20">
                 <Globe className="w-12 h-12 text-amber-500 animate-spin-slow" />
              </div>
           </div>
           
           <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter">
                O que é o <span className="text-amber-500">Motor MAM</span>?
              </h3>
              <p className="text-gray-500 text-sm md:text-lg font-medium leading-relaxed italic">
                O Motor de Automação de Marketing (MAM) é a infraestrutura robusta do SaaS Ai Doctor projetada inicialmente para a área da saúde. Sob a visão técnica do CTO Pedro Maia de Freitas, o sistema utiliza algoritmos de Deep Learning para segmentar leads em escala real, garantindo que nenhum paciente em potencial seja ignorado pela sua clínica.
              </p>
              <div className="flex flex-wrap gap-4">
                 {['Deep Learning', 'ETL Engine', 'SAE Protocol', 'V12 Performance'].map(tag => (
                   <span key={tag} className="text-[9px] font-black text-gray-600 border border-white/5 px-4 py-2 rounded-full uppercase tracking-widest">{tag}</span>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Footer System Info */}
      <div className="text-center text-[9px] font-black text-gray-800 uppercase tracking-[0.6em] mt-10">
         Operator Security Protocol • v2.4.12 • Ai Doctor Certified
      </div>
    </div>
  );
}