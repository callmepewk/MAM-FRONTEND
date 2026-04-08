import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState('desktop'); 
  const userRole = 'admin'; 

  // Fecha o menu automaticamente ao mudar de página
  useEffect(() => { setIsMobileMenuOpen(false); }, [location]);

  // Padronização de Dimensões (conforme regra anterior)
  const densePages = ['/dashboard', '/motor', '/leads', '/planilhas'];
  const isDensePage = densePages.includes(location.pathname) || location.pathname === '/';
  const maxWidthClass = isDensePage ? 'max-w-[1400px]' : 'max-w-7xl';

  const navItems = [
    { path: '/dashboard', label: 'Painel de Métricas', icon: '📊' },
    { path: '/motor', label: 'Motor MAM', icon: '⚡' },
    { path: '/leads', label: 'Gestão de Leads', icon: '🎯' },
    { path: '/planilhas', label: 'Bases de Dados', icon: '🗂️' },
    { path: '/tutorial', label: 'Tutorial', icon: '📖' },
    { path: '/faq', label: 'F.A.Q', icon: '❓' },
    { path: '/plans', label: 'Assinaturas', icon: '⭐' },
    { path: '/perfil', label: 'Meu Perfil', icon: '👤' },
    { path: '/admin', label: 'Admin Master', icon: '⚙️' },
  ];

  return (
    <div className={`flex h-screen bg-[#020617] text-gray-100 font-sans transition-all duration-500 ${viewMode === 'mobile' ? 'justify-center items-center bg-black' : ''}`}>
      
      {/* SELETOR DE VISÃO ADMIN */}
      {userRole === 'admin' && (
        <div className="fixed top-4 left-4 md:left-auto md:right-4 z-[100] bg-[#1e293b] p-1 rounded-xl border border-gray-700 flex shadow-2xl scale-75 md:scale-100">
          <button onClick={() => setViewMode('desktop')} className={`px-4 py-2 text-xs font-black rounded-lg transition ${viewMode === 'desktop' ? 'bg-yellow-500 text-gray-900' : 'text-gray-400'}`}>DESKTOP</button>
          <button onClick={() => setViewMode('mobile')} className={`px-4 py-2 text-xs font-black rounded-lg transition ${viewMode === 'mobile' ? 'bg-yellow-500 text-gray-900' : 'text-gray-400'}`}>MOBILE</button>
        </div>
      )}

      {/* SIDEBAR DESKTOP - FIXA À ESQUERDA */}
      <aside className={`hidden md:flex flex-col w-80 bg-[#1e293b] border-r border-gray-800 justify-between shrink-0`}>
        <div className="overflow-y-auto scrollbar-none flex-1">
          <div className="p-8 border-b border-gray-800">
            <div className="flex items-center gap-4">
              <span className="text-yellow-500 text-5xl">🤖</span>
              <div>
                <h2 className="text-4xl font-black text-white tracking-tighter">MAM</h2>
                <p className="text-[10px] text-yellow-500/80 font-black uppercase tracking-[0.2em] leading-tight mt-1">Motor de Automação<br/>de Marketing</p>
              </div>
            </div>
          </div>
          <nav className="mt-6 px-6 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 font-bold text-lg ${location.pathname === item.path ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 'text-gray-400 hover:bg-gray-800'}`}>
                <span className="text-2xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-6 border-t border-gray-800">
          <Link to="/login" className="flex items-center justify-center gap-3 px-4 py-4 bg-[#0b1120] text-red-400 border border-gray-800 rounded-2xl font-black text-lg hover:bg-red-500/10 transition">🚪 Sair do Sistema</Link>
        </div>
      </aside>

      {/* HEADER MOBILE - BARRA SUPERIOR FIXA */}
      <div className={`md:hidden fixed top-0 left-0 w-full h-20 bg-[#1e293b] border-b border-gray-800 flex items-center justify-between px-6 z-[60]`}>
        <div className="flex flex-col">
          <h2 className="text-2xl font-black text-white">MAM</h2>
          <span className="text-[8px] text-yellow-500 font-bold uppercase">Motor de Automação</span>
        </div>
        {/* Botão de abrir menu (Hambúrguer) */}
        <button onClick={() => setIsMobileMenuOpen(true)} className="text-4xl text-gray-100 focus:outline-none">
          ☰
        </button>
      </div>

      {/* MENU GAVETA MOBILE - ABRE DA DIREITA (LATERAL DIREITA) */}
      <div className={`md:hidden fixed inset-0 z-[70] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Overlay Escuro (Fecha ao clicar fora) */}
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
        
        {/* Conteúdo do Menu (Puxado para a direita) */}
        <nav className={`absolute top-0 right-0 w-72 h-full bg-[#1e293b] shadow-2xl flex flex-col p-8 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🤖</span>
              <h2 className="text-2xl font-black text-white">MAM</h2>
            </div>
            {/* Botão de fechar (X) */}
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-3xl text-gray-400 font-bold">✕</button>
          </div>
          
          <div className="flex flex-col gap-3 overflow-y-auto scrollbar-none flex-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className={`flex items-center gap-5 p-5 rounded-3xl text-lg font-black ${location.pathname === item.path ? 'bg-yellow-500 text-gray-900' : 'text-gray-300 hover:bg-gray-800'}`}>
                <span>{item.icon}</span> {item.label}
              </Link>
            ))}
          </div>
          
          <Link to="/login" className="mt-8 p-5 bg-red-500/10 text-red-500 rounded-3xl font-black text-center border border-red-500/20 uppercase tracking-widest text-sm">Sair do Sistema</Link>
        </nav>
      </div>

      {/* ÁREA PRINCIPAL COM SCALING DE TEXTO */}
      <main className={`flex-1 overflow-y-auto bg-[#0b1120] relative w-full ${viewMode === 'mobile' ? 'max-w-[430px] h-[850px] border-[12px] border-gray-800 rounded-[3.5rem] m-auto mt-12 scrollbar-none shadow-2xl shadow-yellow-500/5' : 'p-6 pt-28 md:p-12 md:pt-12'}`}>
        <div className={`${maxWidthClass} mx-auto w-full overflow-x-hidden flex flex-col gap-10`}>
           {children}
        </div>
      </main>
    </div>
  );
}