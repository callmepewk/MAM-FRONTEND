import { useState } from 'react';
import { Check, Zap, Crown, ShieldCheck, ArrowRight, Star } from 'lucide-react';

const PlanCard = ({ title, price, features, isRecommended, icon: Icon, color }) => (
  <div className={`relative bg-[#1e293b]/40 backdrop-blur-xl p-10 rounded-[3.5rem] border ${isRecommended ? 'border-amber-500 shadow-[0_0_50px_rgba(245,158,11,0.15)]' : 'border-white/5'} flex flex-col gap-8 group transition-all duration-500 hover:translate-y-[-10px]`}>
    
    {isRecommended && (
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-500 text-black font-black text-[10px] px-6 py-2 rounded-full uppercase tracking-[0.3em] shadow-xl">
        Mais Potente
      </div>
    )}

    <div className="space-y-4">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${color} bg-opacity-10 mb-6 shadow-2xl`}>
        <Icon className={`w-8 h-8 ${color.replace('bg-', 'text-')}`} />
      </div>
      <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">{title}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-gray-500 text-sm font-bold">R$</span>
        <span className="text-5xl font-black text-white tracking-tighter">{price}</span>
        <span className="text-gray-600 text-[10px] font-black uppercase tracking-widest">/mês</span>
      </div>
    </div>

    <div className="space-y-4 flex-1">
      {features.map((feature, i) => (
        <div key={i} className="flex items-center gap-3 group/item">
          <div className="p-1 bg-white/5 rounded-md group-hover/item:bg-amber-500/20 transition-colors">
            <Check className="w-3 h-3 text-amber-500" />
          </div>
          <span className="text-gray-400 text-xs font-medium group-hover/item:text-gray-200 transition-colors uppercase tracking-tight">{feature}</span>
        </div>
      ))}
    </div>

    <button className={`w-full py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all ${isRecommended ? 'bg-amber-500 text-black hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}>
      Ativar Módulo
    </button>
  </div>
);

export default function Plans() {
  return (
    <div className="flex flex-col gap-16 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* 🏎️ HEADER V12 STYLE */}
      <header className="flex flex-col items-center text-center gap-4">
        <div className="flex items-center gap-3 mb-2">
           <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
           <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em]">Upgrade de Performance</span>
           <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
        </div>
        <h1 className="text-5xl md:text-8xl italic font-black tracking-tighter text-white uppercase leading-[0.8]">
          Escolha sua <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Potência</span>
        </h1>
        <p className="text-gray-500 text-sm md:text-xl font-medium max-w-2xl mt-4">
          Do consultório individual à rede de clínicas. <br className="hidden md:block"/> Libere o poder total do Motor MAM V12.
        </p>
      </header>

      {/* 🚥 GRID DE PLANOS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto w-full">
        
        <PlanCard 
          title="Starter"
          price="497"
          icon={Zap}
          color="bg-blue-500"
          features={[
            "Até 1.000 Leads/mês",
            "1 Planilha Ativa",
            "Disparos WhatsApp Manual",
            "Relatórios Básicos",
            "Suporte via Ticket"
          ]}
        />

        <PlanCard 
          title="V12 Engine"
          price="997"
          isRecommended={true}
          icon={Crown}
          color="bg-amber-500"
          features={[
            "Leads Ilimitados",
            "Até 10 Planilhas Ativas",
            "Automação V12 (Mãos Livres)",
            "IA de Segmentação (Quente/Frio)",
            "Relatórios Comparativos",
            "Suporte Prioritário"
          ]}
        />

        <PlanCard 
          title="Ultra Ops"
          price="2.497"
          icon={ShieldCheck}
          color="bg-purple-500"
          features={[
            "Multi-Clínicas (Rede)",
            "Bases Customizadas",
            "API de Integração Direta",
            "Mentoria Master Legacy",
            "Segurança LaserSafe Full",
            "Gerente de Conta Exclusivo"
          ]}
        />
      </div>

      {/* 🛡️ TRUST SECTION */}
      <div className="bg-[#1e293b]/20 backdrop-blur-md p-10 md:p-16 rounded-[4rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 max-w-[1200px] mx-auto w-full">
        <div className="space-y-4 text-center md:text-left">
          <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter">Segurança Garantida</h4>
          <p className="text-gray-500 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] leading-loose">
            Criptografia de ponta a ponta em todos os módulos. <br/> 
            Cancelamento sem multas. Transparência total Ai Doctor.
          </p>
        </div>
        
        <div className="flex gap-8 items-center opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            <span className="font-black text-white italic text-2xl tracking-tighter">Ai Doctor</span>
            <span className="font-black text-white italic text-2xl tracking-tighter">LaserSafe</span>
            <span className="font-black text-white italic text-2xl tracking-tighter">V12 Certified</span>
        </div>
      </div>

      {/* Footer System Info */}
      <div className="text-center text-[9px] font-black text-gray-800 uppercase tracking-[0.6em] mt-10">
         Billing System • Transactional Security v2.4
      </div>
    </div>
  );
}