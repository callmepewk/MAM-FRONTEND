import { useState, useEffect } from 'react';

export default function Profile() {
  // 🛡️ Lógica para buscar dados reais do cadastro
  const [userData, setUserData] = useState({ name: 'Admin Master', email: 'admin@gmail.com' });
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [wppConnected, setWppConnected] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('mam_user'));
    if (savedUser) {
      setUserData({ name: savedUser.name, email: savedUser.email });
    }
  }, []);

  const isGmail = userData.email.toLowerCase().includes('@gmail.com');
  const [gmailConnected] = useState(isGmail);

  const handleConnectWpp = () => {
    setShowQrModal(true);
    setTimeout(() => {
      setShowQrModal(false);
      setWppConnected(true);
    }, 4000);
  };

  return (
    // 📐 PADRONIZAÇÃO: max-w-7xl (Régua de páginas leves)
    <div className="max-w-7xl mx-auto flex flex-col gap-10 md:gap-16 pb-20 px-2 md:px-0">
      
      <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase text-center md:text-left">
        Meu Perfil
      </h1>

      {/* CARD DO USUÁRIO ROBUSTO */}
      <div className="bg-[#1e293b] p-8 md:p-12 rounded-[2.5rem] border-2 border-gray-800 shadow-xl flex flex-col md:flex-row gap-8 md:gap-12 items-center">
        <div className="w-28 h-28 md:w-32 md:h-32 bg-gradient-to-tr from-yellow-500 to-yellow-300 rounded-full flex items-center justify-center text-4xl font-black text-gray-900 shadow-2xl shrink-0 uppercase border-4 border-[#0b1120]">
          {userData.name.substring(0, 2)}
        </div>
        <div className="flex-1 w-full flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight uppercase leading-tight">
              {userData.name}
            </h2>
            <p className="text-gray-400 font-bold text-base md:text-xl italic">{userData.email}</p>
          </div>
          <button 
            onClick={() => setShowEditProfile(!showEditProfile)} 
            className="bg-gray-800 text-white px-8 py-4 rounded-2xl font-black border-2 border-gray-700 hover:bg-gray-700 transition w-full md:w-auto uppercase tracking-widest text-sm"
          >
            {showEditProfile ? 'Fechar Edição' : 'Editar Perfil / Senha'}
          </button>
        </div>
      </div>

      {/* MÓDULO DE SENHA (SÓ APARECE EM EDIÇÃO) */}
      {showEditProfile && (
        <div className="bg-[#0b1120] p-8 md:p-10 rounded-[2.5rem] border-2 border-gray-800 animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="text-xl font-black text-white mb-6 uppercase tracking-widest">Alterar Credenciais</h3>
          <div className="flex flex-col gap-5 max-w-md mx-auto md:mx-0">
            <input type="password" placeholder="NOVA SENHA" className="bg-[#1e293b] border-2 border-gray-700 p-5 rounded-2xl text-white outline-none focus:border-yellow-500 font-bold" />
            <input type="password" placeholder="CONFIRMAR NOVA SENHA" className="bg-[#1e293b] border-2 border-gray-700 p-5 rounded-2xl text-white outline-none focus:border-yellow-500 font-bold" />
            <button className="bg-yellow-500 text-gray-900 font-black py-5 rounded-2xl hover:bg-yellow-400 transition uppercase tracking-widest shadow-lg">
              Salvar Alterações
            </button>
          </div>
        </div>
      )}

      {/* GRID DE CONEXÕES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <div className="bg-[#1e293b] p-8 md:p-10 rounded-[2.5rem] border-2 border-gray-800 flex flex-col gap-6 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest">WhatsApp</h3>
            <span className={`px-4 py-1 rounded-full text-[10px] md:text-xs font-black border-2 ${wppConnected ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
              {wppConnected ? 'ATIVO' : 'OFFLINE'}
            </span>
          </div>
          <p className="text-gray-400 font-medium text-sm md:text-base flex-1 leading-relaxed">
            Mantenha seu aparelho conectado para que o Motor V12 execute as extrações e disparos massivos.
          </p>
          {!wppConnected ? (
            <button onClick={handleConnectWpp} className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-5 rounded-2xl transition uppercase tracking-widest shadow-lg">
              Ler QR Code
            </button>
          ) : (
            <button onClick={() => setWppConnected(false)} className="w-full bg-red-500/10 border-2 border-red-500/30 text-red-400 font-black py-5 rounded-2xl uppercase tracking-widest">
              Desconectar
            </button>
          )}
        </div>

        <div className="bg-[#1e293b] p-8 md:p-10 rounded-[2.5rem] border-2 border-gray-800 flex flex-col gap-6 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest">Conta Google</h3>
            <span className={`px-4 py-1 rounded-full text-[10px] md:text-xs font-black border-2 ${gmailConnected ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
              {gmailConnected ? 'VINCULADO' : 'OFFLINE'}
            </span>
          </div>
          <p className="text-gray-400 font-medium text-sm md:text-base flex-1 leading-relaxed">
            {isGmail ? "Sincronização via OAuth efetuada com sucesso pelo seu e-mail de acesso." : "Vincule uma conta Google para liberar o canal de envios massivos por E-mail."}
          </p>
          <button className={`w-full font-black py-5 rounded-2xl transition uppercase tracking-widest ${gmailConnected ? 'bg-gray-800 text-gray-500 cursor-not-allowed border-2 border-gray-700' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg'}`}>
            {gmailConnected ? 'Conta Sincronizada' : 'Vincular Gmail'}
          </button>
        </div>
      </div>

      {/* EXPLICAÇÃO DO MAM ROBUSTA */}
      <div className="bg-gradient-to-br from-[#1e293b] to-[#0b1120] p-8 md:p-12 rounded-[3rem] border-2 border-gray-800 shadow-2xl">
        <h3 className="text-xl md:text-2xl font-black text-yellow-500 mb-6 uppercase tracking-[0.2em] flex items-center gap-4">
          <span>🤖</span> O QUE É O MAM?
        </h3>
        <p className="text-gray-300 leading-relaxed text-sm md:text-xl font-medium">
          O <b>Motor de Automação de Marketing (MAM)</b> é a infraestrutura robusta do SaaS Ai Doctor projetada inicialmente para a área da saúde, mas devido a qualidade técnica do software desenvolvida pelo CTO e Sócio da Ai Doctor, Pedro Henrique Brezolin de Freitas, o CTO foi atrás de melhorar ainda mais e trazer uma interface visual responsiva para uma funcionalidade única no mercado. 

        <br></br>
        <br></br>
         O sistema extrai contatos massivamente de múltiplas fontes e realiza disparos sincronizados por WhatsApp e E-mail, o MAM é um Omnichannel, feito para todos os tipos de demandas, personalizando as entregas e acompanhando a trajetória dos leads. 
        <br></br>
        <br></br>
         Nossa Inteligência Artificial, criada pelo nosso CTO do zero, qualifica leads em tempo real, garantindo que você foque apenas em quem está pronto para agendar consultas e meetings ou adquirir produtos ou serviços oferecidos. .
        </p>
      </div>

      {/* MODAL QR CODE (CLICK OUTSIDE) */}
      {showQrModal && (
        <div className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4" onClick={() => setShowQrModal(false)}>
          <div className="bg-[#1e293b] p-8 md:p-12 rounded-[3.5rem] border-2 border-gray-700 w-full max-w-sm text-center shadow-2xl flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">WhatsApp Web</h2>
            <p className="text-gray-400 text-sm mb-8 font-bold">Aponte a câmera para sincronizar</p>
            <div className="w-56 h-56 bg-white p-4 rounded-[2rem] relative overflow-hidden shadow-2xl border-4 border-yellow-500">
               <div className="absolute top-0 left-0 w-full h-1 bg-green-500 animate-[scan_2s_linear_infinite]"></div>
               <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="QR" className="opacity-90 w-full h-full" />
            </div>
            <p className="text-xs text-yellow-500 mt-8 font-black animate-pulse uppercase tracking-widest">Aguardando leitura do dispositivo...</p>
          </div>
        </div>
      )}

    </div>
  );
}