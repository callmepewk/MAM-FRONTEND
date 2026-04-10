import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
  const [specialty, setSpecialty] = useState('');
  const [clinicSize, setClinicSize] = useState('');
  const [mainGoal, setMainGoal] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleFinish = async (e) => {
    e.preventDefault();
    setMensagem('⚙️ Salvando seu perfil...');
    
    // TODO: Criar a rota no backend para salvar esses dados de onboarding
    // Por enquanto, só simulamos o sucesso e mandamos para o Dashboard
    setTimeout(() => {
        setMensagem('✅ Perfil criado com sucesso! Decolando...');
        setTimeout(() => navigate('/dashboard'), 1500);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-4 text-gray-100">
      <div className="bg-gray-900 p-10 rounded-3xl shadow-2xl w-full max-w-2xl border border-gray-800">
        
        <h1 className="text-4xl font-extrabold text-indigo-500 mb-2">Bem-vindo ao MAM!</h1>
        <p className="text-gray-400 mb-10 text-lg">Só mais um passo: Responda a essas 3 perguntas rápidas para segmentarmos seu perfil.</p>
        
        <form onSubmit={handleFinish} className="flex flex-col gap-8">
          
          {/* Pergunta 1 */}
          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold text-gray-100">1. Qual é a sua especialidade médica?</label>
            <input
                type="text"
                placeholder="Ex: Estética, Dermatologia, Vascular..."
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="bg-gray-800 border border-gray-700 p-4 rounded-xl text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
            />
          </div>

          {/* Pergunta 2 */}
          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold text-gray-100">2. Qual é o tamanho da sua clínica?</label>
            <select 
                value={clinicSize}
                onChange={(e) => setClinicSize(e.target.value)}
                className="bg-gray-800 border border-gray-700 p-4 rounded-xl text-white text-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
            >
                <option value="" disabled className='text-gray-500'>Selecione o tamanho...</option>
                <option value="autonomo" className='text-white'>Autônomo (só eu)</option>
                <option value="pequena" className='text-white'>Pequena (2-5 funcionários)</option>
                <option value="media" className='text-white'>Média (6-15 funcionários)</option>
                <option value="grande" className='text-white'>Grande (+15 funcionários)</option>
            </select>
          </div>

          {/* Pergunta 3 */}
          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold text-gray-100">3. Qual é seu principal objetivo com a IA?</label>
            <input
                type="text"
                placeholder="Ex: Atrair novos pacientes, reativar pacientes antigos..."
                value={mainGoal}
                onChange={(e) => setMainGoal(e.target.value)}
                className="bg-gray-800 border border-gray-700 p-4 rounded-xl text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
            />
          </div>
          
          <button type="submit" className="bg-indigo-600 text-white text-xl font-bold py-4 rounded-xl hover:bg-indigo-700 transition duration-300 mt-6 active:scale-95">
            Finalizar e Decolar
          </button>
        </form>

        {mensagem && (
          <p className="mt-8 text-center font-semibold text-gray-100 bg-gray-800 p-4 rounded-xl border border-gray-700">
            {mensagem}
          </p>
        )}

      </div>
    </div>
  );
}