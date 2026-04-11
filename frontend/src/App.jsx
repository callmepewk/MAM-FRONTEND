import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Motor from './pages/Motor';
import Planilhas from './pages/Planilhas';
import Leads from './pages/Leads';
import Plans from './pages/Plans';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Tutorial from './pages/Tutorial';
import PerguntasFrequentes from './pages/PerguntasFrequentes';

function App() {
  // Simulando verificação de login para segurança básica
  const isAuth = !!localStorage.getItem('mam_user');

  return (
    <Routes>
      {/* Rotas Públicas (Sem Sidebar/Layout) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cadastro" element={<Navigate to="/register" />} />
      <Route path="/onboarding" element={<Onboarding />} />

      {/* Rotas Privadas (Todas dentro do Layout SAE) */}
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/motor" element={<Motor />} />
        <Route path="/planilhas" element={<Planilhas />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/faq" element={<PerguntasFrequentes />} />
      </Route>

      {/* Fallback para não dar tela branca */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;