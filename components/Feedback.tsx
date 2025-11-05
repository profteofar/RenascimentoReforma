
import React from 'react';
import { Lesson, LessonAnswers } from '../types';

interface FeedbackProps {
    score: number;
    lesson: Lesson;
    answers: LessonAnswers;
}

const Feedback: React.FC<FeedbackProps> = ({ score, lesson, answers }) => {
  let className = 'border-red-500 bg-red-50 text-red-900';
  let message = 'Necessita melhorar. Reveja a matéria e tente novamente.';
  let icon = '✗';
  if (score >= 75) {
    className = 'border-emerald-500 bg-emerald-50 text-emerald-900';
    message = 'Excelente! Aula completada com sucesso.';
    icon = '✓';
  } else if (score >= 50) {
    className = 'border-amber-500 bg-amber-50 text-amber-900';
    message = 'Bom trabalho! Passou, mas pode melhorar.';
    icon = '~';
  }

  const mcqCorrectCount = lesson.questions.filter(q => {
    const userAnswer = answers.mcq[q.id];
    if (q.type === 'multiple') {
      // FIX: Cast `q.correct` to `number[]` for the Set constructor.
      const correctSet = new Set(q.correct as number[]);
      const userSet = new Set(userAnswer as number[]);
      return correctSet.size === userSet.size && [...correctSet].every(val => userSet.has(val));
    }
    return userAnswer === q.correct;
  }).length;

  const fillCorrectCount = answers.fill.filter((userAnswer, index) => 
    userAnswer.trim().toLowerCase() === lesson.fillInTheBlank.answers[index].toLowerCase()
  ).length;

  return (
    <div className={`p-6 rounded-2xl border-l-4 ${className} animate-fade-in`}>
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">{icon} Avaliação Submetida</h3>
        <div className="text-4xl font-extrabold">{score}%</div>
      </div>
      <p className="mt-2 text-sm">{message}</p>
      <div className="mt-4 text-sm bg-white/50 p-3 rounded-lg">
          <p><strong>Resultados Detalhados:</strong></p>
          <ul className="list-disc list-inside ml-2 mt-1">
              <li>Perguntas de escolha múltipla: <strong>{mcqCorrectCount} / {lesson.questions.length}</strong> corretas.</li>
              <li>Preencher espaços: <strong>{fillCorrectCount} / {lesson.fillInTheBlank.answers.length}</strong> palavras corretas.</li>
          </ul>
      </div>
    </div>
  );
};

export default Feedback;