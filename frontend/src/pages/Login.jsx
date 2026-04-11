import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bot, Mail, Lock, LogIn, ArrowRight, Zap, ShieldCheck } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Trava de Segurança V12 (Super Admin)
    if (email === 'aidoctorbr@gmail.com' && senha === 'aidoctor01#') {
      // Salva no LocalStorage para o App.jsx reconhecer
      localStorage.setItem('mam_user', JSON.stringify({ email, role: 'admin' }));
      navigate('/dashboard');
    } else {
      setErro('Acesso Negado: Credenciais inválidas ou licença expirada.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] p-4 font-sans selection:bg-amber-500/30">
      
      {/* Container Principal Estilo Cockpit */}
      <div className="max-w-5xl w-full flex rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] bg-[#0f172a]/40 backdrop-blur-2xl border border-white/5 relative">
        
        {/* Lado Esquerdo - Branding Imersivo */}
        <div className="hidden lg:flex lg:w-1/2 p-16 flex-col justify-between relative overflow-hidden border-r border-white/5 bg-gradient-to-br from-black to-slate-900">
          {/* Efeitos de Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px] -mr-32 -mt-32 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px] -ml-20 -mb-20"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-12">
              <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <Bot className="w-10 h-10 text-amber-500" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-white tracking-tighter italic">MAM<span className="text-amber-500">.</span></h1>
                <span className="text-[10px] font-black text-amber-500/60 uppercase tracking-[0.4em]">Engine V12</span>
              </div>
            </div>
            
            <h2 className="text-5xl font-black text-white leading-[0.9] mb-8 uppercase italic tracking-tighter">
              A Nova Era do <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Marketing</span><br/>
              Médico.
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed font-medium">
              O ecossistema definitivo de prospecção. Extraia dados, automatize funis e escale a sua autoridade técnica com IA.
            </p>
          </div>

          <div className="relative z-10 flex flex-col gap-4">
             <div className="p-6 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-md flex items-center gap-4 group hover:bg-white/10 transition-all">
                <div className="p-3 bg-amber-500/20 rounded-xl text-amber-500">
                  <Zap className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <p className="text-white font-black text-xs uppercase tracking-widest italic">ETL de Alta Octanagem</p>
                  <p className="text-gray-500 text-[10px] font-bold mt-1 uppercase">100k leads processados em 3s</p>
                </div>
             </div>
             <div className="flex items-center gap-2 ml-4 opacity-30 italic">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span className="text-[9px] font-black text-white uppercase tracking-widest">Protocolo LaserSafe Ativo</span>
             </div>
          </div>
        </div>

        {/* Lado Direito - O Form */}
        <div className="w-full lg:w-1/2 p-10 lg:p-20 flex flex-col justify-center bg-[#020617]/80 relative overflow-hidden">
          
          {/* Logo Mobile */}
          <div className="text-center mb-12 lg:hidden">
            <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
              <Bot className="w-10 h-10 text-amber-500" />
            </div>
            <h2 className="text-3xl font-black text-white italic tracking-tighter">MAM AI DOCTOR</h2>
          </div>

          <div className="max-w-sm w-full mx-auto relative z-10">
            <h3 className="text-3xl font-black text-white mb-2 uppercase italic tracking-tighter">Login de Ignição</h3>
            <p className="text-gray-600 mb-10 text-sm font-bold uppercase tracking-widest">Insira suas credenciais de acesso.</p>

            <form onSubmit={handleLogin} className="space-y-6">
              {erro && (
                <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-[10px] font-black uppercase tracking-widest animate-in fade-in slide-in-from-top-2">
                  ⚠️ {erro}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-700 uppercase tracking-[0.3em] ml-2">Correio Eletrônico</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-700" />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-14 pr-6 py-5 bg-black/40 border border-white/5 rounded-2xl text-white text-sm outline-none focus:border-amber-500 focus:shadow-[0_0_20px_rgba(245,158,11,0.1)] transition-all placeholder:text-gray-800 font-bold"
                    placeholder="voce@aidoctor.com.br"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-700 uppercase tracking-[0.3em] ml-2">Chave de Acesso</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-700" />
                  </div>
                  <input 
                    type="password" 
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="block w-full pl-14 pr-6 py-5 bg-black/40 border border-white/5 rounded-2xl text-white text-sm outline-none focus:border-amber-500 transition-all placeholder:text-gray-800 font-bold tracking-[0.3em]"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full group relative flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 text-black font-black py-5 px-6 rounded-2xl transition-all duration-500 shadow-[0_10px_30px_rgba(245,158,11,0.2)] hover:shadow-[0_15px_40px_rgba(245,158,11,0.4)] overflow-hidden"
              >
                {/* Efeito de Reflexo no Botão */}
                <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:left-full transition-all duration-1000"></div>
                
                <LogIn className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                <span className="uppercase tracking-[0.2em] text-xs">Iniciar Operação</span>
              </button>
            </form>

            <div className="mt-12 text-center border-t border-white/5 pt-8">
              <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
                Sem acesso?{' '}
                <Link to="/cadastro" className="text-amber-500 hover:text-white transition-colors ml-2 flex items-center justify-center gap-2 mt-2 group">
                  Solicitar Licença <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </p>
            </div>
          </div>
        </div>

      </div>
      
      {/* Rodapé Sutil */}
      <div className="fixed bottom-6 text-[10px] font-black text-gray-800 uppercase tracking-[0.5em] pointer-events-none">
         Protocolo Ai Doctor • V12 Security Standard
      </div>
    </div>
  );
}