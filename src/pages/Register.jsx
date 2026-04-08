import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  // 🛡️ Validações de Segurança (Preservadas)
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isPasswordValid = hasMinLength && hasUpperCase && hasSpecialChar;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isPasswordValid) return;

    setMensagem('⚙️ SALVANDO SEUS DADOS...');

    try {
      const response = await fetch('https://mam-completo.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // 💾 SALVAMENTO LOCAL: Para alimentar a página de Perfil dinamicamente
        localStorage.setItem('mam_user', JSON.stringify({ name, email }));
        
        setMensagem('✅ ' + data.message + ' Redirecionando...');
        setTimeout(() => navigate('/onboarding'), 2000); 
      } else {
        setMensagem('❌ ' + (data.message || 'Erro ao cadastrar.'));
      }
    } catch (error) {
      setMensagem('❌ Erro de conexão. Verifique o servidor.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#020617] p-4 font-sans text-gray-100">
      {/* 📐 CARD ROBUSTO: Padronizado com Plans/Dashboard */}
      <div className="bg-[#1e293b] p-8 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-lg border-2 border-gray-800 transition-all duration-500">
        
        <div className="flex flex-col items-center gap-2 mb-10">
          <span className="text-5xl">🤖</span>
          <h1 className="text-3xl md:text-4xl font-black text-center text-yellow-500 uppercase tracking-tighter">MAM Ai Doctor</h1>
          <p className="text-gray-400 text-center font-bold uppercase tracking-widest text-[10px] md:text-xs opacity-60">Crie sua credencial de acesso</p>
        </div>
        
        <form onSubmit={handleRegister} className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="NOME COMPLETO"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#0b1120] border-2 border-gray-800 p-5 rounded-2xl text-white focus:outline-none focus:border-yellow-500 transition font-bold text-sm md:text-base uppercase"
            required
          />
          <input
            type="email"
            placeholder="E-MAIL CORPORATIVO"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#0b1120] border-2 border-gray-800 p-5 rounded-2xl text-white focus:outline-none focus:border-yellow-500 transition font-bold text-sm md:text-base uppercase"
            required
          />
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="SENHA FORTE"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#0b1120] border-2 border-gray-800 p-5 rounded-2xl text-white focus:outline-none focus:border-yellow-500 transition w-full pr-14 font-bold text-sm md:text-base uppercase"
              required
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-5 text-gray-500 hover:text-yellow-500 transition text-2xl"
            >
              {showPassword ? "👁️‍🗨️" : "👁️"}
            </button>
          </div>

          {/* Checklist Interativo (Mantido 100%) */}
          <div className="flex flex-col gap-2 text-[10px] md:text-xs bg-[#0b1120] p-5 rounded-2xl border-2 border-gray-800">
            <span className={`font-black uppercase flex items-center gap-2 ${hasMinLength ? "text-emerald-500" : "text-gray-600"}`}>
              {hasMinLength ? "✓" : "○"} 8 Caracteres
            </span>
            <span className={`font-black uppercase flex items-center gap-2 ${hasUpperCase ? "text-emerald-500" : "text-gray-600"}`}>
              {hasUpperCase ? "✓" : "○"} 1 Letra Maiúscula
            </span>
            <span className={`font-black uppercase flex items-center gap-2 ${hasSpecialChar ? "text-emerald-500" : "text-gray-600"}`}>
              {hasSpecialChar ? "✓" : "○"} 1 Caractere Especial
            </span>
          </div>
          
          <button 
            type="submit" 
            disabled={!isPasswordValid}
            className={`text-gray-900 text-lg font-black py-5 rounded-[1.5rem] transition duration-300 mt-2 uppercase tracking-widest shadow-xl
              ${isPasswordValid ? 'bg-yellow-500 hover:bg-yellow-400 active:scale-95 shadow-yellow-500/20' : 'bg-gray-800 text-gray-500 cursor-not-allowed border-2 border-gray-700'}`}
          >
            Finalizar Cadastro
          </button>
        </form>

        {mensagem && (
          <div className="mt-8 text-center font-black text-[10px] md:text-xs text-white bg-[#0b1120] p-4 rounded-2xl border-2 border-gray-800 uppercase animate-pulse">
            {mensagem}
          </div>
        )}

        <p className="mt-10 text-center text-gray-500 font-bold text-xs md:text-sm uppercase tracking-tighter">
          Já tem uma conta? <Link to="/login" className="text-yellow-500 hover:text-yellow-400 transition ml-1 underline">Entrar no Motor</Link>
        </p>

      </div>
    </div>
  );
}