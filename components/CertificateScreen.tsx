
import React from 'react';
import { AppState } from '../types';
import { LESSONS } from '../constants';

interface CertificateScreenProps {
  state: AppState;
  onBack: () => void;
}

const CertificateScreen: React.FC<CertificateScreenProps> = ({ state, onBack }) => {
  const scoresArray = Object.values(state.scores);
  // FIX: Cast element `b` to number to allow addition in `reduce`.
  const average = scoresArray.length > 0 ? Math.round(scoresArray.reduce((a, b) => a + (b as number), 0) / scoresArray.length) : 0;
  const dateStr = new Date().toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div>
      <div className="bg-white p-6 sm:p-12 rounded-2xl shadow-2xl border-8 border-transparent" style={{borderImage: 'linear-gradient(135deg, #6366f1, #8b5cf6) 1'}}>
        <div className="text-center relative">
          <div className="absolute -top-16 sm:-top-24 left-1/2 -translate-x-1/2 text-7xl" style={{filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))'}}>🏆</div>
          <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-700 text-transparent bg-clip-text mt-8">Certificado de Avaliação</h2>
          <p className="text-slate-500 mt-2">Renascimento & Reforma – Percurso Interativo (5 Aulas)</p>
        </div>

        <div className="my-8 p-6 bg-slate-50 rounded-xl flex justify-between items-center text-sm sm:text-base">
          <div>
            <p className="text-xs text-slate-400 uppercase font-semibold">Nome do Aluno</p>
            <p className="font-bold text-slate-800">{state.userName || '—'}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 uppercase font-semibold">Data de Conclusão</p>
            <p className="font-bold text-slate-800">{dateStr}</p>
          </div>
        </div>
        
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-100/50">
            <tr>
              <th className="px-4 py-3 rounded-l-lg">Aula</th>
              <th className="px-4 py-3 text-right rounded-r-lg">Cotação</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(LESSONS).map(key => {
              const i = parseInt(key, 10);
              const score = state.scores[i] || 0;
              return (
                <tr key={i} className="border-b last:border-b-0">
                  <td className="px-4 py-3 font-medium text-slate-700">{`Aula ${i} – ${LESSONS[i].title}`}</td>
                  <td className="px-4 py-3 font-bold text-slate-800 text-right">{state.submitted[i] ? `${score}%` : '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        <div className="mt-8 p-6 text-center text-white bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-200">
            <p className="text-sm opacity-90">Percentagem Final (Média das 5 Aulas)</p>
            <p className="text-6xl font-extrabold">{average}%</p>
        </div>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center print:hidden">
        <button onClick={() => window.print()} className="px-8 py-4 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-base hover:scale-105 transition shadow-lg shadow-indigo-200">🖨️ Imprimir / Guardar</button>
        <button onClick={onBack} className="px-8 py-4 rounded-xl bg-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-300 transition">← Voltar</button>
      </div>
    </div>
  );
};

export default CertificateScreen;