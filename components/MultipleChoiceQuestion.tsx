
import React from 'react';
import { Question } from '../types';

interface MCQProps {
  question: Question;
  qNumber: number;
  userAnswer: number | number[] | null | undefined;
  isSubmitted: boolean;
  onChange: (answer: number | number[]) => void;
}

const MultipleChoiceQuestion: React.FC<MCQProps> = ({ question, qNumber, userAnswer, isSubmitted, onChange }) => {

  const handleChange = (optionIndex: number) => {
    if (isSubmitted) return;
    if (question.type === 'multiple') {
      const current = Array.isArray(userAnswer) ? [...userAnswer] : [];
      const index = current.indexOf(optionIndex);
      if (index > -1) {
        current.splice(index, 1);
      } else {
        current.push(optionIndex);
      }
      onChange(current.sort((a,b) => a - b));
    } else {
      onChange(optionIndex);
    }
  };

  return (
    <div className="border-t border-slate-200 pt-6">
      <div className="font-bold text-slate-800 mb-4 flex items-start gap-3">
        <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-indigo-500 text-white rounded-lg font-bold text-sm">{qNumber}</span>
        <span>{question.text}</span>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {question.options.map((option, index) => {
          let isSelected = false;
          if (question.type === 'multiple') {
            isSelected = Array.isArray(userAnswer) && userAnswer.includes(index);
          } else {
            isSelected = userAnswer === index;
          }

          let feedbackClass = '';
          if (isSubmitted) {
            const isCorrect = Array.isArray(question.correct) ? question.correct.includes(index) : question.correct === index;
            if (isCorrect) {
              feedbackClass = 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-300';
            } else if (isSelected && !isCorrect) {
              feedbackClass = 'border-red-500 bg-red-50 text-red-800 ring-2 ring-red-300';
            } else {
              feedbackClass = 'border-slate-200 bg-slate-50 opacity-70';
            }
          } else {
            feedbackClass = isSelected 
              ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-300' 
              : 'border-slate-200 bg-slate-50 hover:bg-slate-100';
          }

          return (
            <div
              key={index}
              onClick={() => handleChange(index)}
              className={`p-4 rounded-xl border-2 flex items-center gap-4 transition cursor-pointer ${feedbackClass}`}
            >
              <input
                type={question.type === 'multiple' ? 'checkbox' : 'radio'}
                name={question.id}
                checked={isSelected}
                readOnly
                className="w-5 h-5 accent-indigo-600 cursor-pointer"
              />
              <label className="flex-1 text-sm text-slate-700 cursor-pointer">{option}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
