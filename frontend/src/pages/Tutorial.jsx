export default function Tutorial() {
  return (
    // 📐 PADRONIZAÇÃO: max-w-7xl (Seguindo a régua da página de Planos)
    <div className="max-w-7xl mx-auto flex flex-col gap-10 md:gap-16 pb-20 px-2 md:px-0">
      
      {/* HEADER ROBUSTO E RESPONSIVO */}
      <div className="flex flex-col gap-4 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-tight">
          Manual do Piloto
        </h1>
        <p className="text-gray-400 text-base md:text-xl font-medium italic">
          Aprenda a pilotar a Ferrari das automações passo a passo.
        </p>
      </div>
      
      {/* GRID DE PASSOS - 100% VERTICAL NO MOBILE / PADRONIZADO NO PC */}
      <div className="flex flex-col gap-6 md:gap-8">
        
        {/* PASSO 1 */}
        <div className="bg-[#1e293b] p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] border-2 border-gray-800 shadow-xl hover:border-yellow-500/30 transition-colors duration-300">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
             <span className="bg-yellow-500 text-gray-900 w-10 h-10 rounded-full flex items-center justify-center font-black text-xl shrink-0">1</span>
             <h2 className="text-xl md:text-2xl font-black text-yellow-500 uppercase tracking-widest">
               Preparando o Terreno (Bases de Dados)
             </h2>
          </div>
          <p className="text-gray-300 text-sm md:text-lg leading-relaxed font-medium">
            Antes de rodar o motor, você precisa de contatos. Vá na aba <b>"Bases de Dados"</b> e adicione seus arquivos PDF, imagens ou links do Google Sheets. Se você tem várias planilhas espalhadas, use a função <b>"Compilar Planilhas"</b> para juntar todas em uma só base mestra e otimizar o tempo de extração.
          </p>
        </div>
        
        {/* PASSO 2 */}
        <div className="bg-[#1e293b] p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] border-2 border-gray-800 shadow-xl hover:border-yellow-500/30 transition-colors duration-300">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
             <span className="bg-yellow-500 text-gray-900 w-10 h-10 rounded-full flex items-center justify-center font-black text-xl shrink-0">2</span>
             <h2 className="text-xl md:text-2xl font-black text-yellow-500 uppercase tracking-widest">
               Conectando as Turbinas (WhatsApp e Gmail)
             </h2>
          </div>
          <p className="text-gray-300 text-sm md:text-lg leading-relaxed font-medium">
            O Motor não anda sem combustível. Vá na aba <b>"Motor MAM"</b> e clique nos botões de Status no topo da tela para abrir o QR Code do WhatsApp e a autorização do Google. Sem isso, o robô não terá permissão para realizar os disparos automáticos.
          </p>
        </div>
        
        {/* PASSO 3 */}
        <div className="bg-[#1e293b] p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] border-2 border-gray-800 shadow-xl hover:border-yellow-500/30 transition-colors duration-300">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
             <span className="bg-yellow-500 text-gray-900 w-10 h-10 rounded-full flex items-center justify-center font-black text-xl shrink-0">3</span>
             <h2 className="text-xl md:text-2xl font-black text-yellow-500 uppercase tracking-widest">
               Configurando a Campanha (Motor V12)
             </h2>
          </div>
          <p className="text-gray-300 text-sm md:text-lg leading-relaxed font-medium">
            Selecione as bases que deseja usar na fila de envio. Escolha se quer disparar por WhatsApp, E-mail ou ambos (Omnichannel). Defina a data de início e término. <b>Respeite os limites anti-ban</b> (50 por WPP e 100 por Email) para proteger a saúde das suas contas. Escreva uma copy matadora e clique em <b>ATIVAR O MAM</b>.
          </p>
        </div>
        
        {/* PASSO 4 */}
        <div className="bg-[#1e293b] p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] border-2 border-gray-800 shadow-xl hover:border-yellow-500/30 transition-colors duration-300">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
             <span className="bg-yellow-500 text-gray-900 w-10 h-10 rounded-full flex items-center justify-center font-black text-xl shrink-0">4</span>
             <h2 className="text-xl md:text-2xl font-black text-yellow-500 uppercase tracking-widest">
               Colhendo os Frutos (Gestão de Leads)
             </h2>
          </div>
          <p className="text-gray-300 text-sm md:text-lg leading-relaxed font-medium">
            Conforme o Motor roda, a aba <b>"Gestão de Leads"</b> será populada automaticamente. O robô vai classificar quem está "Muito Quente", "Quente" ou "Frio". Se você for usuário <b>Premium</b>, poderá criar campanhas ultra-segmentadas enviando promoções exclusivas apenas para os leads com maior probabilidade de agendamento.
          </p>
        </div>

      </div>
    </div>
  );
}