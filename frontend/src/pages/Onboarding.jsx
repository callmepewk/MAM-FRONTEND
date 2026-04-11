import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Target, Activity, Users, ChevronRight } from 'lucide-react';

export default function Onboarding() {
  const [specialty, setSpecialty] = useState('');
  const [clinicSize, setClinicSize] = useState('');
  const [mainGoal, setMainGoal] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleFinish = async (e) => {
    e.preventDefault();
    setMensagem('⚙️ CALIBRANDO ALGORITMOS...');
    
    setTimeout(() => {
        setMensagem('✅ PERFIL SINCRONIZADO. INICIANDO V12...');
        setTimeout(() => navigate('/dashboard'), 1500);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#020617] p-4 font-sans relative overflow-hidden">
      
      {/* Efeito de Fundo - Glow do Motor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="bg-[#1e293b]/40 backdrop-blur-2xl p-10 md:p-16 rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] w-full max-w-3xl border border-white/5 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* Header de Calibragem */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                <Bot className="w-6 h-6 text-amber-500" />
             </div>
             <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em]">Setup Inicial • V12 Engine</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-[0.9]">
            Calibragem de <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Inteligência</span>
          </h1>
          <p className="text-gray-500 mt-6 text-sm md:text-lg font-medium leading-relaxed">
            Personalize o motor para a sua realidade clínica. <br className="hidden md:block"/> 
            Responda ao protocolo de 3 passos.
          </p>
        </header>
        
        <form onSubmit={handleFinish} className="flex flex-col gap-10">
          
          {/* Pergunta 1 - Especialidade */}
          <div className="flex flex-col gap-4 group">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2 flex items-center gap-2 group-focus-within:text-amber-500 transition-colors">
              <Activity className="w-3 h-3" /> 1. Sua Especialidade Médica
            </label>
            <input
                type="text"
                placeholder="Ex: ESTÉTICA AVANÇADA, DERMATOLOGIA..."
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="bg-black/40 border border-white/10 p-5 rounded-2xl text-white text-sm md:text-lg placeholder:text-gray-800 focus:outline-none focus:border-amber-500 focus:shadow-[0_0_20px_rgba(245,158,11,0.1)] transition-all font-black uppercase italic"
                required
            />
          </div>

          {/* Pergunta 2 - Tamanho */}
          <div className="flex flex-col gap-4 group">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2 flex items-center gap-2 group-focus-within:text-amber-500 transition-colors">
              <Users className="w-3 h-3" /> 2. Envergadura da Operação
            </label>
            <select 
                value={clinicSize}
                onChange={(e) => setClinicSize(e.target.value)}
                className="bg-black/40 border border-white/10 p-5 rounded-2xl text-white text-sm md:text-lg focus:outline-none focus:border-amber-500 transition-all font-black uppercase appearance-none cursor-pointer"
                required
            >
                <option value="" disabled className='text-gray-700 bg-[#0f172a]'>Selecione a escala...</option>
                <option value="autonomo" className='text-white bg-[#0f172a]'>Autônomo (Solo Flight)</option>
                <option value="pequena" className='text-white bg-[#0f172a]'>Pequena (2-5 Funcionários)</option>
                <option value="media" className='text-white bg-[#0f172a]'>Média (6-15 Funcionários)</option>
                <option value="grande" className='text-white bg-[#0f172a]'>Grande (+15 Funcionários)</option>
            </select>
          </div>

          {/* Pergunta 3 - Objetivo */}
          <div className="flex flex-col gap-4 group">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2 flex items-center gap-2 group-focus-within:text-amber-500 transition-colors">
              <Target className="w-3 h-3" /> 3. Alvo Principal da Operação
            </label>
            <input
                type="text"
                placeholder="Ex: REATIVAÇÃO DE BASE, NOVOS PACIENTES..."
                value={mainGoal}
                onChange={(e) => setMainGoal(e.target.value)}
                className="bg-black/40 border border-white/10 p-5 rounded-2xl text-white text-sm md:text-lg placeholder:text-gray-800 focus:outline-none focus:border-amber-500 focus:shadow-[0_0_20px_rgba(245,158,11,0.1)] transition-all font-black uppercase italic"
                required
            />
          </div>
          
          <div className="pt-4">
            <button type="submit" className="w-full bg-amber-500 text-black text-lg md:text-xl font-black py-6 rounded-[2rem] hover:bg-amber-400 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] transition-all duration-500 active:scale-95 uppercase tracking-widest flex items-center justify-center gap-3">
              Finalizar Calibragem <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </form>

        {mensagem && (
          <div className="mt-10 p-6 bg-black/40 rounded-[2rem] border border-white/5 animate-in fade-in zoom-in">
            <p className="text-center font-black text-amber-500 uppercase tracking-[0.3em] text-[10px] md:text-xs">
              {mensagem}
            </p>
          </div>
        )}

      </div>

      {/* Footer Decorativo */}
      <div className="fixed bottom-8 text-[9px] font-black text-gray-800 uppercase tracking-[0.6em] pointer-events-none">
         Diagnostic System v2.4 • Ai Doctor Protocol
      </div>
    </div>
  );
}