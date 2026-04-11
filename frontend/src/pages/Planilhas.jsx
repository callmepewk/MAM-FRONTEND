import { useState } from 'react';
import { Database, Layers, Plus, Search, AlertTriangle, FileText, Image as ImageIcon, Link as LinkIcon, X } from 'lucide-react';

export default function Planilhas() {
  const [bases, setBases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCompileModal, setShowCompileModal] = useState(false);
  const [uploadType, setUploadType] = useState('url');

  const filteredBases = bases.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.date.includes(searchTerm)
  );

  return (
    <div className="flex flex-col gap-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* 🏎️ HEADER V12 STYLE */}
      <header className="flex flex-col xl:flex-row justify-between items-end gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic">Bases de Dados</h1>
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-12 bg-amber-500"></span>
            <p className="text-gray-500 text-xs md:text-sm font-black uppercase tracking-[0.4em]">Vault de Ativos e Repositório de Leads</p>
          </div>
        </div>
        
        <div className="flex gap-4 w-full xl:w-auto">
          <button onClick={() => setShowCompileModal(true)} className="flex-1 xl:flex-none bg-white/5 border border-white/10 text-white font-black py-5 px-10 rounded-3xl hover:bg-white/10 transition-all text-[10px] tracking-[0.2em] uppercase backdrop-blur-md flex items-center justify-center gap-3">
            <Layers className="w-4 h-4 text-amber-500" /> Compilador V12
          </button>
          <button onClick={() => setShowAddModal(true)} className="flex-1 xl:flex-none bg-amber-500 text-black font-black py-5 px-10 rounded-3xl hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all text-[10px] tracking-[0.2em] uppercase flex items-center justify-center gap-3">
            <Plus className="w-4 h-4" /> Nova Base
          </button>
        </div>
      </header>

      {/* ⚠️ AVISO DE PROTOCOLO */}
      <div className="bg-amber-500/5 border border-amber-500/20 p-8 rounded-[2.5rem] flex items-center gap-6 group overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl group-hover:bg-amber-500/10 transition-all"></div>
        <div className="bg-amber-500/10 p-4 rounded-2xl">
          <AlertTriangle className="w-6 h-6 text-amber-500" />
        </div>
        <p className="text-xs md:text-base font-black uppercase tracking-widest text-gray-400">
          <b className="text-amber-500">Protocolo de Segurança:</b> Este vault armazena os ativos. A injeção e o disparo de dados ocorrem exclusivamente no <span className="text-white italic">Motor MAM V12</span>.
        </p>
      </div>

      {/* 🔍 SEARCH CONSOLE */}
      <div className="relative group">
        <div className="absolute inset-0 bg-amber-500/5 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
        <div className="relative bg-[#1e293b]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] flex items-center p-2 shadow-2xl">
          <span className="pl-8 pr-4 text-amber-500/50 text-2xl group-focus-within:text-amber-500 transition-colors">
            <Search className="w-6 h-6" />
          </span>
          <input 
            type="text" 
            placeholder="Filtrar por nome da base ou carimbo de data..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none text-white py-6 w-full focus:outline-none font-black text-sm md:text-xl uppercase tracking-widest placeholder:text-gray-700"
          />
        </div>
      </div>

      {/* 🚥 DATA GRID (VAULT VIEW) */}
      <div className="bg-[#1e293b]/20 backdrop-blur-md rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto scrollbar-none">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white/5 text-gray-500 text-[10px] uppercase tracking-[0.4em] italic">
                <th className="p-10 font-black">Ativo de Dados</th>
                <th className="p-10 font-black">Extensão</th>
                <th className="p-10 font-black">Data de Registro</th>
                <th className="p-10 font-black text-right">Ações de Voo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredBases.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-32 text-center">
                    <div className="flex flex-col items-center gap-6 opacity-20">
                      <Database className="w-20 h-20 text-gray-400" />
                      <p className="font-black uppercase tracking-[0.5em] text-xs">Bases Inexistentes no Repositório</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredBases.map((base, index) => (
                    <tr key={index} className="group hover:bg-white/5 transition-colors">
                        <td className="p-10">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <span className="text-white font-black uppercase tracking-tighter text-xl">{base.name}</span>
                            </div>
                        </td>
                        <td className="p-10 text-[10px] font-black text-gray-500 uppercase tracking-widest">{base.type}</td>
                        <td className="p-10 text-[10px] font-black text-gray-400 uppercase tracking-widest">{base.date}</td>
                        <td className="p-10 text-right">
                             <button className="bg-white/5 hover:bg-amber-500 hover:text-black border border-white/10 rounded-xl py-3 px-6 font-black text-[10px] uppercase tracking-widest transition-all">Configurar</button>
                        </td>
                    </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔐 MODAL NOA BASE (BLACK GLASS) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[200] flex items-center justify-center p-6 animate-in zoom-in duration-300" onClick={() => setShowAddModal(false)}>
          <div className="bg-[#0f172a] border border-white/10 p-12 rounded-[4rem] w-full max-w-xl shadow-3xl flex flex-col gap-10 relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px]"></div>
            
            <header className="flex justify-between items-center border-b border-white/5 pb-8 relative z-10">
                <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Armazenar Ativo</h2>
                <X className="w-6 h-6 text-gray-500 cursor-pointer hover:text-white transition" onClick={() => setShowAddModal(false)} />
            </header>

            <div className="flex gap-2 bg-black/40 p-2 rounded-2xl border border-white/5 relative z-10">
              {['url', 'pdf', 'img'].map(t => (
                <button key={t} onClick={() => setUploadType(t)} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${uploadType === t ? 'bg-amber-500 text-black' : 'text-gray-500 hover:text-white'}`}>
                    {t === 'url' ? 'G. Sheets' : t === 'pdf' ? 'PDF' : 'OCR Imagem'}
                </button>
              ))}
            </div>

            <div className="space-y-6 relative z-10">
                {uploadType === 'url' ? (
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] ml-2">Endpoint Google Sheets</label>
                    <textarea rows="4" placeholder="Cole a URL pública da planilha..." className="w-full bg-black/40 border border-white/10 p-6 rounded-[2rem] text-white outline-none focus:border-amber-500 font-bold text-sm italic transition-all resize-none shadow-inner" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] ml-2">Input de Arquivo</label>
                    <div className="bg-black/40 border-2 border-dashed border-white/10 p-12 rounded-[2rem] text-center group/upload cursor-pointer hover:border-amber-500/50 transition-all">
                        <input type="file" className="hidden" id="file-vault" />
                        <label htmlFor="file-vault" className="cursor-pointer flex flex-col items-center gap-4">
                            {uploadType === 'pdf' ? <FileText className="w-10 h-10 text-amber-500 opacity-40 group-hover/upload:opacity-100 transition-all" /> : <ImageIcon className="w-10 h-10 text-amber-500 opacity-40 group-hover/upload:opacity-100 transition-all" />}
                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest group-hover/upload:text-white transition-all">Transmitir arquivo para o Cloud Vault</span>
                        </label>
                    </div>
                  </div>
                )}
            </div>

            <div className="flex gap-4 relative z-10">
               <button onClick={() => setShowAddModal(false)} className="flex-1 text-gray-600 font-black uppercase text-[10px] tracking-[0.2em] hover:text-white transition">Abortar</button>
               <button className="flex-[2] bg-amber-500 text-black font-black py-6 rounded-[2rem] shadow-2xl hover:scale-[1.02] transition-all uppercase tracking-[0.2em] text-sm">Validar e Salvar</button>
            </div>
          </div>
        </div>
      )}

      {/* 📟 MODAL COMPILADOR (TECH CONSOLE) */}
      {showCompileModal && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-3xl z-[200] flex items-center justify-center p-6 animate-in slide-in-from-top-10 duration-500" onClick={() => setShowCompileModal(false)}>
          <div className="bg-[#0f172a] border border-blue-500/30 p-12 rounded-[4rem] w-full max-w-2xl shadow-[0_0_80px_rgba(59,130,246,0.1)] flex flex-col gap-10 max-h-[90vh] overflow-y-auto scrollbar-none relative" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
            
            <header className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 border border-blue-500/20">
                    <Layers className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Compilador de Bases</h2>
            </header>
            
            <div className="bg-blue-500/5 p-6 rounded-3xl border border-blue-500/10 text-[10px] md:text-xs text-blue-400 font-black tracking-widest leading-relaxed uppercase">
              <p className="flex items-center gap-2 mb-2"><span className="w-1 h-1 bg-blue-500 rounded-full"></span> Mapeie até 5 origens para uma base mestra.</p>
              <p className="flex items-center gap-2"><span className="w-1 h-1 bg-blue-500 rounded-full"></span> A planilha destino deve estar configurada como pública.</p>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] ml-2 italic">Output: Planilha Mestra (Destino)</label>
                <input type="url" placeholder="URL da planilha vazia de destino..." className="w-full bg-black/60 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-amber-500 font-bold transition-all text-sm" />
              </div>
              
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] ml-2 italic">Input: Origens Fragmentadas</label>
                <div className="space-y-3">
                  {[1, 2, 3].map(num => (
                    <div key={num} className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-700">0{num}</div>
                        <input type="url" placeholder={`Link da planilha de origem ${num}...`} className="w-full bg-black/40 border border-white/5 p-5 pl-12 rounded-2xl text-white outline-none focus:border-blue-500 transition-all text-xs" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-6 mt-4">
              <button onClick={() => setShowCompileModal(false)} className="flex-1 text-gray-600 font-black uppercase text-[10px] tracking-widest hover:text-white transition">Cancelar Operação</button>
              <button className="flex-[2] bg-blue-600 text-white py-6 rounded-[2rem] font-black uppercase shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:bg-blue-500 hover:scale-[1.02] transition-all tracking-widest text-sm">Mesclar e Compilar</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer System Info */}
      <div className="text-center text-[9px] font-black text-gray-800 uppercase tracking-[0.6em] mt-10">
         Data Integrity Vault • v2.4.12 • Ai Doctor Protocol
      </div>
    </div>
  );
}