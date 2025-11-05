
import React, { useState, useEffect } from 'react';
import { Lesson, LessonAnswers } from '../types';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import FillInTheBlank from './FillInTheBlank';
import Feedback from './Feedback';

interface LessonScreenProps {
  lessonId: number;
  lesson: Lesson;
  answers: LessonAnswers;
  score: number | undefined;
  isSubmitted: boolean | undefined;
  onSave: (lessonId: number, answers: LessonAnswers) => void;
  onSubmit: (lessonId: number, answers: LessonAnswers) => void;
  onBack: () => void;
}

const LessonScreen: React.FC<LessonScreenProps> = ({
  lessonId, lesson, answers, score, isSubmitted, onSave, onSubmit, onBack
}) => {
  const [currentAnswers, setCurrentAnswers] = useState<LessonAnswers>(answers);

  useEffect(() => {
    setCurrentAnswers(answers);
  }, [answers, lessonId]);
  
  const handleMcqChange = (questionId: string, answer: number | number[]) => {
    setCurrentAnswers(prev => ({
        ...prev,
        mcq: {
            ...prev.mcq,
            [questionId]: answer
        }
    }));
  };

  const handleFillChange = (index: number, value: string) => {
    const newFillAnswers = [...currentAnswers.fill];
    newFillAnswers[index] = value;
    setCurrentAnswers(prev => ({
        ...prev,
        fill: newFillAnswers,
    }));
  };
  
  const handleSubmit = () => {
    const allMcqAnswered = lesson.questions.every(q => {
        const answer = currentAnswers.mcq[q.id];
        if (q.type === 'multiple') return Array.isArray(answer) && answer.length > 0;
        return typeof answer === 'number';
    });

    const allFillAnswered = currentAnswers.fill.every(a => a.trim() !== '');

    if (!allMcqAnswered || !allFillAnswered) {
        alert('Por favor, responda a todas as questões e preencha todos os espaços antes de submeter.');
        return;
    }
    onSubmit(lessonId, currentAnswers);
  };

  let statusText = 'Por fazer';
  let statusClass = 'bg-amber-100 text-amber-700';
  if (score >= 75) {
      statusText = 'Completo';
      statusClass = 'bg-emerald-100 text-emerald-700';
  } else if (score >= 50) {
      statusText = 'Parcial';
      statusClass = 'bg-blue-100 text-blue-700';
  } else if (isSubmitted) {
      statusText = 'Insuficiente';
      statusClass = 'bg-red-100 text-red-700';
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center gap-6">
        <div className="w-48 h-32 flex-shrink-0 rounded-xl bg-slate-100 flex items-center justify-center text-6xl">{lesson.icon}</div>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800">{`Aula ${lessonId} – ${lesson.title}`}</h2>
          <p className="text-slate-500 mt-2 text-sm">{lesson.desc}</p>
          <span className={`inline-block mt-3 px-3 py-1 text-xs font-bold rounded-full ${statusClass}`}>{statusText}</span>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg space-y-8">
        <FillInTheBlank 
          fillData={lesson.fillInTheBlank}
          userAnswers={currentAnswers.fill}
          isSubmitted={!!isSubmitted}
          onChange={handleFillChange}
        />
        {lesson.questions.map((q, index) => (
          <MultipleChoiceQuestion
            key={q.id}
            question={q}
            qNumber={index + 1}
            userAnswer={currentAnswers.mcq[q.id]}
            isSubmitted={!!isSubmitted}
            onChange={(answer) => handleMcqChange(q.id, answer)}
          />
        ))}
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg flex justify-between items-center">
        <button onClick={onBack} className="px-4 py-3 rounded-xl bg-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-300 transition">← Voltar ao Menu</button>
        <div className="flex gap-3">
          <button onClick={() => onSave(lessonId, currentAnswers)} className="px-4 py-3 rounded-xl bg-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-300 transition">💾 Guardar Progresso</button>
          <button onClick={handleSubmit} disabled={isSubmitted} className="px-4 py-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold text-sm hover:scale-105 transition shadow-md shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100">
            {isSubmitted ? 'Submetido' : '✓ Submeter Atividade'}
          </button>
        </div>
      </div>
      
      {isSubmitted && score !== undefined && <Feedback score={score} lesson={lesson} answers={answers}/>}
    </div>
  );
};

export default LessonScreen;
