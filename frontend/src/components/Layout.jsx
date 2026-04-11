import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Outlet, Link, useLocation } from 'react-router-dom'; // Adicione o Outlet aqui

export default function Layout({ children }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState('desktop'); 
  const userRole = 'admin'; 

  useEffect(() => { setIsMobileMenuOpen(false); }, [location]);

  const densePages = ['/dashboard', '/motor', '/leads', '/planilhas'];
  const isDensePage = densePages.includes(location.pathname) || location.pathname === '/';
  const maxWidthClass = isDensePage ? 'max-w-[1500px]' : 'max-w-6xl';

  const navItems = [
    { path: '/dashboard', label: 'Métricas Reais', icon: '📊' },
    { path: '/motor', label: 'Motor V12', icon: '⚡' },
    { path: '/leads', label: 'Gestão de Leads', icon: '🎯' },
    { path: '/planilhas', label: 'Bases de Dados', icon: '🗂️' },
    { path: '/tutorial', label: 'Academy', icon: '📖' },
    { path: '/plans', label: 'Premium', icon: '💎' },
    { path: '/perfil', label: 'Meu Perfil', icon: '👤' },
    { path: '/admin', label: 'Master Admin', icon: '🛡️' },
  ];

  return (
    <div className={`flex h-screen bg-[#020617] text-gray-100 font-sans antialiased selection:bg-amber-500/30 ${viewMode === 'mobile' ? 'justify-center items-center bg-black' : ''}`}>
      
      {/* 🛠️ SELETOR DE VISÃO (ESTILO SAE) */}
      {userRole === 'admin' && (
        <div className="fixed top-6 right-6 z-[100] bg-[#1e293b]/80 backdrop-blur-xl p-1.5 rounded-2xl border border-white/5 flex shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <button onClick={() => setViewMode('desktop')} className={`px-5 py-2 text-[10px] font-black rounded-xl transition-all duration-300 ${viewMode === 'desktop' ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'text-gray-500 hover:text-gray-300'}`}>DESKTOP</button>
          <button onClick={() => setViewMode('mobile')} className={`px-5 py-2 text-[10px] font-black rounded-xl transition-all duration-300 ${viewMode === 'mobile' ? 'bg-amber-500 text-black' : 'text-gray-500 hover:text-gray-300'}`}>MOBILE</button>
        </div>
      )}

      {/* 🏰 SIDEBAR PREMIUM */}
      <aside className={`hidden md:flex flex-col w-72 bg-[#0f172a]/40 backdrop-blur-2xl border-r border-white/5 justify-between shrink-0 relative z-50`}>
        {/* Glow de fundo da Sidebar */}
        <div className="absolute top-0 left-0 w-full h-64 bg-amber-500/5 blur-[100px] pointer-events-none"></div>

        <div className="overflow-y-auto scrollbar-none flex-1">
          <div className="p-10 mb-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="text-4xl filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">🤖</span>
                <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">MAM</h2>
              </div>
              <div className="h-[2px] w-12 bg-amber-500 rounded-full"></div>
              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-2">Marketing Automation<br/>Engine V12</p>
            </div>
          </div>

          <nav className="px-4 flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} 
                  className={`group flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden
                  ${isActive ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.05)]' : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'}`}>
                  
                  {isActive && <div className="absolute left-0 top-1/4 h-1/2 w-1 bg-amber-500 rounded-r-full"></div>}
                  
                  <span className={`text-xl transition-transform duration-300 group-hover:scale-110 ${isActive ? 'filter drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]' : ''}`}>
                    {item.icon}
                  </span>
                  <span className="text-sm font-black uppercase tracking-widest">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          <Link to="/login" className="flex items-center justify-center gap-3 px-6 py-4 bg-red-500/5 hover:bg-red-500 hover:text-white text-red-500 border border-red-500/10 rounded-2xl font-black text-xs uppercase tracking-tighter transition-all duration-500 group">
            <span className="group-hover:translate-x-[-4px] transition-transform">🚪</span> Sair do Sistema
          </Link>
        </div>
      </aside>

      {/* 📱 MOBILE HEADER (GLASS) */}
      <div className={`md:hidden fixed top-0 left-0 w-full h-20 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 z-[60]`}>
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-black text-white italic">MAM</h2>
          <div className="h-4 w-[1px] bg-gray-800"></div>
          <span className="text-[10px] text-amber-500 font-black uppercase tracking-tighter">V12 Engine</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(true)} className="w-10 h-10 flex items-center justify-center bg-amber-500/10 rounded-xl text-amber-500 border border-amber-500/20">
          <span className="text-2xl">☰</span>
        </button>
      </div>

      {/* 📱 MOBILE DRAWER (SAE STYLE) */}
      <div className={`md:hidden fixed inset-0 z-[70] transition-all duration-500 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMobileMenuOpen(false)}></div>
        <nav className={`absolute top-0 right-0 w-[80%] h-full bg-[#0f172a] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col p-10 transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black italic">MAM</h2>
            <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full text-gray-400">✕</button>
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className={`flex items-center gap-5 p-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] ${location.pathname === item.path ? 'bg-amber-500 text-black shadow-[0_10px_20px_rgba(245,158,11,0.2)]' : 'text-gray-400'}`}>
                {item.icon} {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* 🚀 ÁREA DE CONTEÚDO (O "MOTOR") */}
      <main className={`flex-1 overflow-y-auto bg-[#020617] relative w-full scroll-smooth
        ${viewMode === 'mobile' ? 'max-w-[430px] h-[880px] border-[14px] border-[#1e293b] rounded-[4rem] m-auto mt-8 shadow-[0_0_100px_rgba(245,158,11,0.1)]' : 'p-6 pt-28 md:p-12 md:pt-16'}`}>
        
        {/* Glow central de fundo */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[150px] pointer-events-none"></div>

{/* Antes estava assim: */}
<div className={`${maxWidthClass} mx-auto w-full flex flex-col gap-12 relative z-10 ...`}>
    {children} {/* 👈 APAGUE ISSO */}
</div>

{/* Deixe assim: */}
<div className={`${maxWidthClass} mx-auto w-full flex flex-col gap-12 relative z-10 ...`}>
    <Outlet /> {/* 👈 COLOQUE ISSO */}
</div>

        {/* Rodapé sutil de versão */}
        <div className="mt-20 mb-10 text-center opacity-20">
          <p className="text-[10px] font-black tracking-[0.5em] uppercase text-gray-500">MAM AI Doctor • Version 2026.4.12</p>
        </div>
      </main>
    </div>
  );
}