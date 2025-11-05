
import React from 'react';
import { AppState } from '../types';
import { LESSONS } from '../constants';

interface ResultsScreenProps {
  state: AppState;
  onBack: () => void;
  onGenerateCert: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ state, onBack, onGenerateCert }) => {
  const scoresArray = Object.values(state.scores);
  // FIX: Cast element `b` to number to allow addition in `reduce`.
  const average = scoresArray.length > 0 ? Math.round(scoresArray.reduce((a, b) => a + (b as number), 0) / scoresArray.length) : 0;

  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg">
      <h3 className="text-2xl font-extrabold text-slate-800 mb-6">📊 Resultados das Avaliações</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-100/50">
            <tr>
              <th className="px-6 py-3 rounded-l-lg">Aula</th>
              <th className="px-6 py-3">Cotação (0-100)</th>
              <th className="px-6 py-3 rounded-r-lg">Estado</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(LESSONS).map(key => {
              const i = parseInt(key, 10);
              const score = state.scores[i] || 0;

              let status = '—';
              let statusColor = 'text-slate-500';
              if (state.submitted[i]) {
                if (score >= 75) {
                    status = '✓ Completo'; statusColor = 'text-emerald-600';
                } else if (score >= 50) {
                    status = '~ Parcial'; statusColor = 'text-blue-600';
                } else {
                    status = '✗ Insuficiente'; statusColor = 'text-red-600';
                }
              }

              return (
                <tr key={i} className="bg-white border-b last:border-b-0">
                  <td className="px-6 py-4 font-medium text-slate-900">{`Aula ${i} – ${LESSONS[i].desc}`}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">{state.submitted[i] ? `${score}%` : '—'}</td>
                  <td className={`px-6 py-4 font-bold ${statusColor}`}>{status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-8 p-6 bg-slate-100/50 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <p className="text-xs text-slate-500 uppercase font-semibold">Percentagem Média Final</p>
          <p className="text-4xl font-extrabold text-slate-800">{average}%</p>
        </div>
        <button onClick={onGenerateCert} className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-base hover:scale-105 transition shadow-lg shadow-indigo-200">
          🏆 Gerar Certificado
        </button>
      </div>
      <div className="mt-6">
        <button onClick={onBack} className="px-4 py-3 rounded-xl bg-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-300 transition">← Voltar ao Menu</button>
      </div>
    </div>
  );
};

export default ResultsScreen;