import { Routes, Route } from 'react-router-dom';
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
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/onboarding" element={<Onboarding />} />
      
      <Route path="/" element={<Layout><Dashboard /></Layout>} />
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/motor" element={<Layout><Motor /></Layout>} />
      <Route path="/planilhas" element={<Layout><Planilhas /></Layout>} />
      <Route path="/leads" element={<Layout><Leads /></Layout>} />
      <Route path="/plans" element={<Layout><Plans /></Layout>} />
      <Route path="/perfil" element={<Layout><Profile /></Layout>} />
      <Route path="/admin" element={<Layout><Admin /></Layout>} />
      <Route path="/tutorial" element={<Layout><Tutorial /></Layout>} />
      <Route path="/faq" element={<Layout><PerguntasFrequentes /></Layout>} />
    </Routes>
  );
}

export default App;