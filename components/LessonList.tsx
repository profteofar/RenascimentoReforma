
import React from 'react';
import { LESSONS } from '../constants';
import { AppState } from '../types';

interface LessonListProps {
  scores: AppState['scores'];
  currentLesson: number | null;
  onOpenLesson: (num: number) => void;
}

const iconColors = [
    'from-pink-400 to-red-500',
    'from-cyan-400 to-blue-500',
    'from-green-400 to-teal-500',
    'from-red-400 to-yellow-500',
    'from-teal-400 to-indigo-600',
];

const LessonList: React.FC<LessonListProps> = ({ scores, currentLesson, onOpenLesson }) => {
  return (
    <ul className="space-y-2">
      {Object.keys(LESSONS).map((key) => {
        const i = parseInt(key, 10);
        const lesson = LESSONS[i];
        const isLocked = i > 1 && (!scores[i - 1] || scores[i - 1] < 50);
        const isComplete = scores[i] >= 75;
        const score = scores[i];
        
        let badgeText = '—';
        let badgeClass = 'bg-slate-200 text-slate-600';
        if (isComplete) {
            badgeText = `✓ ${score}%`;
            badgeClass = 'bg-emerald-100 text-emerald-700';
        } else if (score >= 50) {
            badgeText = `~ ${score}%`;
            badgeClass = 'bg-blue-100 text-blue-700';
        } else if (isLocked) {
            badgeText = '🔒';
        } else if (score > 0) {
            badgeText = `✗ ${score}%`;
            badgeClass = 'bg-red-100 text-red-700';
        }
        
        const baseClasses = "flex items-center gap-3 p-3 rounded-xl transition duration-200";
        const stateClasses = isLocked 
            ? "opacity-50 cursor-not-allowed bg-slate-100" 
            : `cursor-pointer hover:bg-slate-200 hover:scale-105 ${currentLesson === i ? 'bg-indigo-100 border-indigo-500 border-2' : 'bg-slate-100'}`;

        return (
          <li key={i} className={`${baseClasses} ${stateClasses}`} onClick={() => !isLocked && onOpenLesson(i)}>
            <div className={`w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center text-2xl bg-gradient-to-br ${iconColors[i-1]}`}>
              {lesson.icon}
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm text-slate-800">Aula {i}</div>
              <div className="text-xs text-slate-500">{lesson.desc}</div>
            </div>
            <div className={`px-2.5 py-1 rounded-md text-xs font-bold ${badgeClass}`}>
              {badgeText}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default LessonList;
