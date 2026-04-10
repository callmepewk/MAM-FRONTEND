import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bot, Mail, Lock, LogIn, ArrowRight } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Trava do Super Admin (Você)
    if (email === 'aidoctorbr@gmail.com' && senha === 'aidoctor01#') {
      navigate('/dashboard');
    } else {
      setErro('Credenciais inválidas ou plano inativo.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-fundo p-4">
      {/* Container Principal */}
      <div className="max-w-4xl w-full flex rounded-2xl overflow-hidden shadow-2xl bg-painel border border-slate-700/50">
        
        {/* Lado Esquerdo - Marketing/Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-slate-900 p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primaria/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primaria/5 rounded-full blur-3xl -ml-20 -mb-20"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primaria/20 rounded-xl">
                <Bot className="w-8 h-8 text-primaria" />
              </div>
              <h1 className="text-2xl font-bold text-white tracking-wider">MAM<span className="text-primaria">.</span></h1>
            </div>
            
            <h2 className="text-4xl font-bold text-white leading-tight mb-6">
              Motor de Automação <br/> de <span className="text-primaria">Marketing</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              O ecossistema definitivo de prospecção omnichannel. Extraia dados, automatize funis e escale a sua operação de saúde e estética.
            </p>
          </div>

          <div className="relative z-10 p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm">
            <p className="text-primaria font-semibold mb-2">⚡ Alta Performance</p>
            <p className="text-slate-300 text-sm">Capacidade de leitura e processamento de até 100.000 leads em 3 segundos no nosso motor ETL.</p>
          </div>
        </div>

        {/* Lado Direito - Formulário */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <div className="text-center mb-10 lg:hidden">
              <Bot className="w-12 h-12 text-primaria mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white">MAM Ai Doctor</h2>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">Acesso à Plataforma</h3>
            <p className="text-slate-400 mb-8">Insira as suas credenciais para entrar no motor.</p>

            <form onSubmit={handleLogin} className="space-y-5">
              {erro && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                  {erro}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">E-mail Corporativo</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-500" />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-primaria/50 focus:border-primaria transition-colors"
                    placeholder="voce@empresa.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Senha</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500" />
                  </div>
                  <input 
                    type="password" 
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-primaria/50 focus:border-primaria transition-colors"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-primaria hover:bg-yellow-500 text-slate-900 font-bold py-3.5 px-4 rounded-xl transition-all duration-200 mt-4"
              >
                <LogIn className="w-5 h-5" />
                Entrar no Motor
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-400 text-sm">
                Ainda não tem uma conta?{' '}
                <Link to="/cadastro" className="text-primaria hover:text-yellow-400 font-medium inline-flex items-center gap-1 transition-colors">
                  Criar conta agora <ArrowRight className="w-4 h-4" />
                </Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

