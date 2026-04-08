import { useState } from 'react';

export default function Planilhas() {
  const [bases, setBases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // 🛡️ ESTADOS E LÓGICAS ORIGINAIS PRESERVADOS INTEGRALMENTE
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCompileModal, setShowCompileModal] = useState(false);
  const [uploadType, setUploadType] = useState('url');

  const filteredBases = bases.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.date.includes(searchTerm)
  );

  const closeAddModal = () => setShowAddModal(false);
  const closeCompileModal = () => setShowCompileModal(false);

  return (
    // 📐 PADRONIZAÇÃO: max-w-[1400px] (Página Densa)
    <div className="max-w-[1400px] mx-auto flex flex-col gap-8 md:gap-12 pb-20 px-2 md:px-0">
      
      {/* HEADER ROBUSTO E RESPONSIVO */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="w-full">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-tight">Bases de Dados</h1>
          <p className="text-gray-400 mt-2 font-medium italic text-sm md:text-xl">Repositório central de planilhas, PDFs e Imagens.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* BOTÃO COMPILAR COM TOOLTIP (CARD HOVER) */}
          <div className="relative group w-full md:w-auto">
            <button onClick={() => setShowCompileModal(true)} className="w-full bg-blue-600/20 text-blue-400 border-2 border-blue-500/30 font-black py-4 px-8 rounded-2xl hover:bg-blue-600/30 transition text-sm md:text-lg flex items-center justify-center gap-3 uppercase">
              🗂️ Compilar Planilhas
            </button>
            {/* Card Explicativo Restaurado */}
            <div className="absolute top-full mt-4 right-0 w-72 md:w-96 bg-[#1e293b] border-2 border-gray-700 p-6 rounded-3xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none">
              <h4 className="text-blue-400 font-bold text-base mb-2 uppercase">Por que Compilar?</h4>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                Útil para clínicas que possuem planilhas fragmentadas. Junte até 5 planilhas em uma única base mestra para acelerar a extração no Motor MAM.
              </p>
            </div>
          </div>

          <button onClick={() => setShowAddModal(true)} className="w-full md:w-auto bg-yellow-500 text-gray-900 font-black py-4 px-8 rounded-2xl md:rounded-3xl shadow-2xl transition hover:bg-yellow-400 text-sm md:text-lg uppercase">
            + Nova Base
          </button>
        </div>
      </div>

      {/* AVISO DE SEGURANÇA PADRONIZADO */}
      <div className="bg-red-500/10 border-2 border-red-500/20 p-6 rounded-3xl flex items-center gap-5 text-red-400">
        <span className="text-3xl hidden md:block">⚠️</span> 
        <p className="text-sm md:text-base font-bold leading-relaxed">
          <b>Atenção:</b> Esta página armazena as bases. A extração e o disparo acontecem no <b>Motor MAM</b>.
        </p>
      </div>

      {/* BARRA DE BUSCA ROBUSTA */}
      <div className="bg-[#1e293b] p-2 md:p-3 rounded-2xl border-2 border-gray-800 flex items-center shadow-inner">
        <span className="px-4 md:px-6 text-gray-500 text-xl md:text-2xl">🔍</span>
        <input 
          type="text" 
          placeholder="Buscar base por nome ou data (ex: 24/10/2026)..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent border-none text-white p-3 md:p-5 w-full focus:outline-none font-bold text-sm md:text-lg"
        />
      </div>

      {/* TABELA COM PROTEÇÃO DE SCROLL MOBILE */}
      <div className="bg-[#1e293b] rounded-[2rem] border-2 border-gray-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#0b1120] text-gray-500 text-xs md:text-sm uppercase tracking-widest">
                <th className="p-6 md:p-8 font-black">Nome da Base</th>
                <th className="p-6 md:p-8 font-black">Tipo</th>
                <th className="p-6 md:p-8 font-black">Data</th>
                <th className="p-6 md:p-8 font-black text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 font-medium">
              {filteredBases.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-16 md:p-20 text-center text-gray-500">
                    <span className="text-5xl block mb-4 grayscale opacity-30">📁</span>
                    <p className="font-black uppercase tracking-widest text-sm md:text-lg">Nenhuma base encontrada ou cadastrada.</p>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL ADICIONAR (RESTAURADO E RESPONSIVO) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4 md:p-8" onClick={closeAddModal}>
          <div className="bg-[#1e293b] p-8 md:p-12 rounded-[3rem] border-2 border-gray-700 w-full max-w-xl shadow-2xl flex flex-col gap-6 md:gap-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter text-center md:text-left">Armazenar Nova Base</h2>
            
            <div className="flex gap-2 bg-[#0b1120] p-2 rounded-2xl border border-gray-800">
              <button onClick={() => setUploadType('url')} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase transition ${uploadType === 'url' ? 'bg-yellow-500 text-gray-900' : 'text-gray-500 hover:text-gray-300'}`}>Link Google</button>
              <button onClick={() => setUploadType('pdf')} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase transition ${uploadType === 'pdf' ? 'bg-yellow-500 text-gray-900' : 'text-gray-500 hover:text-gray-300'}`}>Arquivo PDF</button>
              <button onClick={() => setUploadType('img')} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase transition ${uploadType === 'img' ? 'bg-yellow-500 text-gray-900' : 'text-gray-500 hover:text-gray-300'}`}>Imagem OCR</button>
            </div>

            {uploadType === 'url' && (
              <div className="flex flex-col gap-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">URL do Google Sheets</label>
                <textarea rows="4" placeholder="https://docs.google.com/..." className="bg-[#0b1120] border-2 border-gray-700 rounded-2xl p-5 text-white focus:border-yellow-500 outline-none resize-none font-bold"></textarea>
              </div>
            )}
            
            {(uploadType === 'pdf' || uploadType === 'img') && (
              <div className="flex flex-col gap-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Selecionar Arquivo</label>
                <div className="bg-[#0b1120] border-2 border-dashed border-gray-700 p-10 rounded-2xl text-center">
                  <input type="file" className="hidden" id="file-upload" accept={uploadType === 'pdf' ? ".pdf" : "image/*"} />
                  <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-3">
                    <span className="text-4xl">📤</span>
                    <span className="text-gray-500 font-bold uppercase text-[10px]">Clique para carregar</span>
                  </label>
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-2">
              <button onClick={closeAddModal} className="flex-1 text-gray-400 font-black uppercase hover:text-white transition">Cancelar</button>
              <button onClick={closeAddModal} className="flex-[2] bg-yellow-500 text-gray-900 py-4 rounded-2xl font-black uppercase shadow-xl hover:bg-yellow-400 text-sm md:text-base">Salvar Base</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL COMPILAR (RESTAURADO E RESPONSIVO) */}
      {showCompileModal && (
        <div className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4 md:p-8" onClick={closeCompileModal}>
          <div className="bg-[#1e293b] p-8 md:p-12 rounded-[3rem] border-2 border-blue-500/50 w-full max-w-2xl shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto scrollbar-none" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-3"><span>🗂️</span> Compilador</h2>
            
            <div className="bg-blue-500/10 p-5 rounded-2xl border-2 border-blue-500/20 text-xs md:text-sm text-blue-300 font-bold leading-relaxed">
              <ol className="list-decimal ml-5 flex flex-col gap-1">
                <li>Crie uma planilha VAZIA no Google Sheets e libere o acesso público.</li>
                <li>Cole o link dela no campo "Destino" abaixo.</li>
              </ol>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <label className="text-xs font-black text-yellow-500 uppercase tracking-widest">Planilha Destino (Vazia)</label>
                <input type="url" placeholder="URL da planilha de destino..." className="bg-[#0b1120] border-2 border-gray-700 p-5 rounded-2xl text-white outline-none focus:border-yellow-500 font-bold" />
              </div>
              
              <div className="flex flex-col gap-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Planilhas de Origem (Até 5)</label>
                {[1, 2, 3].map(num => (
                  <input key={num} type="url" placeholder={`URL de origem ${num}...`} className="bg-[#0b1120] border-2 border-gray-700 p-5 rounded-2xl text-white outline-none focus:border-blue-500 font-bold mb-1" />
                ))}
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <button onClick={closeCompileModal} className="flex-1 text-gray-400 font-black uppercase">Cancelar</button>
              <button onClick={closeCompileModal} className="flex-[2] bg-blue-600 text-white py-5 rounded-2xl font-black uppercase shadow-xl hover:bg-blue-500">Mesclar Planilhas</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}