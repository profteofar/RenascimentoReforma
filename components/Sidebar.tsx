
import React, { useState } from 'react';
import LessonList from './LessonList';
import { AppState } from '../types';

interface SidebarProps {
  userName: string;
  scores: AppState['scores'];
  currentLesson: number | null;
  completedCount: number;
  overallPercent: number;
  onSaveName: (name: string) => void;
  onReset: () => void;
  onOpenLesson: (num: number) => void;
  onViewResults: () => void;
  onGenerateCert: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  userName, scores, currentLesson, completedCount, overallPercent,
  onSaveName, onReset, onOpenLesson, onViewResults, onGenerateCert
}) => {
  const [nameInput, setNameInput] = useState(userName);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
        <h3 className="text-base font-bold text-slate-700 mb-4">👤 Dados do Aluno</h3>
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Introduza o seu nome completo..."
          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
        />
        <div className="flex gap-2 mt-3">
          <button onClick={() => onSaveName(nameInput)} className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold text-sm hover:scale-105 transition shadow-md shadow-indigo-200">
            ✓ Guardar e Iniciar
          </button>
          <button onClick={onReset} className="px-4 py-3 rounded-xl bg-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-300 transition">
            🔄 Reiniciar
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-3">💾 Os resultados são guardados no navegador.</p>
      </div>

      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-5 rounded-2xl shadow-xl shadow-indigo-300/50">
        <p className="text-sm opacity-90 mb-1">Progresso Global</p>
        <div className="flex justify-between items-center">
          <div className="text-4xl font-extrabold">{completedCount}/5</div>
          <div className="text-3xl font-extrabold bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full">{overallPercent}%</div>
        </div>
        <p className="text-xs opacity-90 mt-3">≥50% para desbloquear • ≥75% para completar</p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
        <h3 className="text-base font-bold text-slate-700 mb-4">📖 Aulas Disponíveis</h3>
        <LessonList
          scores={scores}
          currentLesson={currentLesson}
          onOpenLesson={onOpenLesson}
        />
        <div className="flex gap-2 mt-3">
          <button onClick={onViewResults} className="flex-1 px-4 py-3 rounded-xl bg-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-300 transition">📊 Ver Resultados</button>
          <button onClick={onGenerateCert} className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold text-sm hover:scale-105 transition shadow-md shadow-indigo-200">🏆 Certificado</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
