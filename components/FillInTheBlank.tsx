
import React, { useMemo } from 'react';
import { FillInTheBlank as FillInTheBlankType } from '../types';

interface FillInTheBlankProps {
  fillData: FillInTheBlankType;
  userAnswers: string[];
  isSubmitted: boolean;
  onChange: (index: number, value: string) => void;
}

const FillInTheBlank: React.FC<FillInTheBlankProps> = ({ fillData, userAnswers, isSubmitted, onChange }) => {
  
  const content = useMemo(() => {
    const parts = fillData.text.split(/{\d+}/);
    const elements: (string | JSX.Element)[] = [];

    parts.forEach((part, i) => {
      elements.push(part);
      if (i < fillData.answers.length) {
        const isCorrect = isSubmitted && userAnswers[i]?.trim().toLowerCase() === fillData.answers[i].toLowerCase();
        
        let feedbackClass = 'border-slate-300 bg-slate-100 focus:border-indigo-500 focus:ring-indigo-500';
        if (isSubmitted) {
          feedbackClass = isCorrect 
            ? 'border-emerald-500 bg-emerald-100 ring-emerald-500 text-emerald-800'
            : 'border-red-500 bg-red-100 ring-red-500 text-red-800';
        }

        elements.push(
          <input
            key={`blank-${i}`}
            type="text"
            value={userAnswers[i] || ''}
            onChange={(e) => !isSubmitted && onChange(i, e.target.value)}
            disabled={isSubmitted}
            className={`inline-block w-48 mx-1 px-2 py-1 text-sm rounded-md border-2 transition focus:outline-none focus:ring-1 ${feedbackClass}`}
            placeholder={`Palavra ${i+1}`}
          />
        );
      }
    });

    return elements;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fillData, userAnswers, isSubmitted]);

  return (
    <div>
       <div className="font-bold text-slate-800 mb-4 flex items-start gap-3">
        <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-indigo-500 text-white rounded-lg font-bold text-sm">📝</span>
        <span>Preencha os espaços em branco:</span>
      </div>
      <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-200">
        {content}
      </p>
    </div>
  );
};

export default FillInTheBlank;