import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bot, User, Mail, Lock, Eye, EyeOff, ShieldCheck, ChevronRight } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  // 🛡️ Validações de Segurança (Lógica Original Preservada)
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isPasswordValid = hasMinLength && hasUpperCase && hasSpecialChar;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isPasswordValid) return;

    setMensagem('⚙️ TRANSMITINDO DADOS PARA O ATLAS...');

    try {
      const response = await fetch('https://mam-completo.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('mam_user', JSON.stringify({ name, email }));
        setMensagem('✅ CREDENCIAL ATIVADA. SINCRONIZANDO...');
        setTimeout(() => navigate('/onboarding'), 2000); 
      } else {
        setMensagem('❌ FALHA: ' + (data.message || 'Erro no registro.'));
      }
    } catch (error) {
      setMensagem('❌ ERRO DE CONEXÃO: SERVIDOR OFFLINE.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] p-4 font-sans relative overflow-hidden selection:bg-amber-500/30">
      
      {/* Efeito de Fundo - Telemetria */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/20 blur-[120px] rounded-full"></div>
      </div>

      {/* Card de Registro (Glassmorphism) */}
      <div className="bg-[#1e293b]/40 backdrop-blur-2xl p-10 md:p-16 rounded-[3.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] w-full max-w-2xl border border-white/5 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        <header className="flex flex-col items-center text-center mb-12">
          <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 mb-6 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <Bot className="w-10 h-10 text-amber-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
            Protocolo de <br/> <span className="text-amber-500">Ativação</span>
          </h1>
          <p className="text-gray-500 mt-4 text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">Crie sua licença de uso MAM V12</p>
        </header>
        
        <form onSubmit={handleRegister} className="flex flex-col gap-8">
          
          {/* Nome */}
          <div className="space-y-2 group">
            <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2 group-focus-within:text-amber-500 transition-colors">
              <User className="w-3 h-3" /> Identificação do Operador
            </label>
            <input
              type="text"
              placeholder="NOME COMPLETO"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-amber-500 focus:shadow-[0_0_15px_rgba(245,158,11,0.1)] transition-all font-black uppercase italic text-sm md:text-base placeholder:text-gray-800"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2 group">
            <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2 group-focus-within:text-amber-500 transition-colors">
              <Mail className="w-3 h-3" /> Endpoint de Acesso (E-mail)
            </label>
            <input
              type="email"
              placeholder="VOE@EMPRESA.COM.BR"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-amber-500 transition-all font-black uppercase text-sm md:text-base placeholder:text-gray-800"
              required
            />
          </div>
          
          {/* Senha */}
          <div className="space-y-2 group">
            <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2 group-focus-within:text-amber-500 transition-colors">
              <Lock className="w-3 h-3" /> Chave Criptográfica
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="SENHA DE ALTA SEGURANÇA"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-amber-500 transition-all w-full pr-16 font-black uppercase text-sm md:text-base placeholder:text-gray-800 tracking-[0.2em]"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 hover:text-amber-500 transition-all"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Checklist de Segurança (Diagnostic View) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-black/40 p-5 rounded-[2rem] border border-white/5 shadow-inner">
            <div className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest ${hasMinLength ? "text-emerald-500" : "text-gray-700"}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${hasMinLength ? "bg-emerald-500 animate-pulse" : "bg-gray-800"}`}></div>
              8 Caracteres
            </div>
            <div className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest ${hasUpperCase ? "text-emerald-500" : "text-gray-700"}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${hasUpperCase ? "bg-emerald-500 animate-pulse" : "bg-gray-800"}`}></div>
              Maiúscula
            </div>
            <div className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest ${hasSpecialChar ? "text-emerald-500" : "text-gray-700"}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${hasSpecialChar ? "bg-emerald-500 animate-pulse" : "bg-gray-800"}`}></div>
              Especial
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={!isPasswordValid}
            className={`group relative flex items-center justify-center gap-3 py-6 rounded-[2rem] font-black text-lg uppercase tracking-[0.3em] transition-all duration-500 shadow-2xl overflow-hidden
              ${isPasswordValid ? 'bg-amber-500 text-black hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(245,158,11,0.4)]' : 'bg-white/5 text-gray-700 border border-white/5 cursor-not-allowed'}`}
          >
            {isPasswordValid && <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:left-full transition-all duration-1000"></div>}
            Ativar Licença <ChevronRight className="w-5 h-5" />
          </button>
        </form>

        {mensagem && (
          <div className="mt-10 p-6 bg-black/40 rounded-2xl border border-white/5 animate-in zoom-in text-center">
            <p className="font-black text-[10px] md:text-xs text-amber-500 uppercase tracking-[0.4em] animate-pulse">
              {mensagem}
            </p>
          </div>
        )}

        <footer className="mt-12 text-center border-t border-white/5 pt-8">
          <p className="text-gray-600 font-black text-[10px] uppercase tracking-[0.2em]">
            Operador já registrado?{' '}
            <Link to="/login" className="text-amber-500 hover:text-white transition-all underline underline-offset-4 ml-2">Iniciar Login</Link>
          </p>
        </footer>

      </div>

      {/* Decoração Final */}
      <div className="fixed bottom-8 text-[9px] font-black text-gray-800 uppercase tracking-[0.6em] pointer-events-none">
         Registry System Protocol • v2.4.12 • Ai Doctor Secure
      </div>
    </div>
  );
}