import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Motor from './pages/Motor';
import Leads from './pages/Leads';
import Planilhas from './pages/Planilhas';
import Tutorial from './pages/Tutorial';
import PerguntasFrequentes from './pages/PerguntasFrequentes';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Plans from './pages/Plans';

// 🏎️ Componente de Telemetria: Reseta o Scroll a cada troca de rota
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* 🔓 Rotas Públicas (Sem Sidebar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* 🔐 Rotas Privadas (Com Layout/Sidebar V12) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/motor" element={<Motor />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/planilhas" element={<Planilhas />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/faq" element={<PerguntasFrequentes />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/plans" element={<Plans />} />
        </Route>
        
        {/* 🚨 Redirecionamento de Segurança (Protocolo Fallback) */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;