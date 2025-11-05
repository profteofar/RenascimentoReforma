
import React, { useState, useMemo } from 'react';
import { AppState, Screen, LessonAnswers } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import WelcomeScreen from './components/WelcomeScreen';
import LessonScreen from './components/LessonScreen';
import ResultsScreen from './components/ResultsScreen';
import CertificateScreen from './components/CertificateScreen';
import { LESSONS } from './constants';

const initialAnswers: { [lessonId: number]: LessonAnswers } = {};
for (const id in LESSONS) {
    const lesson = LESSONS[id];
    initialAnswers[id] = {
        mcq: {},
        fill: Array(lesson.fillInTheBlank.answers.length).fill('')
    };
}


const initialState: AppState = {
  userName: '',
  currentLesson: null,
  answers: initialAnswers,
  scores: {},
  submitted: {},
};

function App() {
  const [state, setState] = useLocalStorage<AppState>('renaissance-reforma-state', initialState);
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');

  const completedCount = useMemo(() => Object.values(state.scores).filter(s => s >= 75).length, [state.scores]);
  const overallPercent = useMemo(() => completedCount > 0 ? Math.round((completedCount / 5) * 100) : 0, [completedCount]);
  
  const handleSetScreen = (screen: Screen) => {
    window.scrollTo(0, 0);
    setCurrentScreen(screen);
  };

  const handleSaveName = (name: string) => {
    if (!name) {
      alert('Por favor, introduza o seu nome.');
      return;
    }
    setState(prev => ({ ...prev, userName: name }));
    alert('Nome guardado! Pode começar as aulas.');
  };

  const handleReset = () => {
    if (!confirm('Tem a certeza que deseja reiniciar todo o progresso? Esta ação não pode ser desfeita.')) {
      return;
    }
    setState(initialState);
    handleSetScreen('welcome');
    alert('Progresso reiniciado com sucesso!');
  };

  const handleOpenLesson = (num: number) => {
    if (!state.userName) {
      alert('Por favor, introduza o seu nome primeiro.');
      return;
    }
    if (num > 1 && (!state.scores[num - 1] || state.scores[num - 1] < 50)) {
      alert('Complete a aula anterior com pelo menos 50% para desbloquear esta aula.');
      return;
    }
    setState(prev => ({ ...prev, currentLesson: num }));
    handleSetScreen('lesson');
  };

  const handleSaveProgress = (lessonId: number, answers: LessonAnswers) => {
    setState(prev => ({
        ...prev,
        answers: {
            ...prev.answers,
            [lessonId]: answers,
        }
    }));
    alert('Progresso guardado com sucesso!');
  };

  const handleSubmitLesson = (lessonId: number, answers: LessonAnswers) => {
    const lesson = LESSONS[lessonId];
    let mcqScore = 0;
    
    lesson.questions.forEach(q => {
        const userAnswer = answers.mcq[q.id];
        let isCorrect = false;
        if (q.type === 'multiple') {
            // FIX: Cast `q.correct` to `number[]` for the Set constructor.
            const correctSet = new Set(q.correct as number[]);
            const userSet = new Set(userAnswer as number[]);
            isCorrect = correctSet.size === userSet.size && [...correctSet].every(val => userSet.has(val));
        } else {
            isCorrect = userAnswer === q.correct;
        }
        if (isCorrect) {
            mcqScore += lesson.scoring[q.id];
        }
    });

    let fillScore = 0;
    answers.fill.forEach((userAnswer, index) => {
      if (userAnswer.trim().toLowerCase() === lesson.fillInTheBlank.answers[index].toLowerCase()) {
        fillScore += lesson.fillInTheBlank.pointsPerBlank;
      }
    });

    const totalScore = Math.round(mcqScore + fillScore);

    setState(prev => ({
        ...prev,
        scores: { ...prev.scores, [lessonId]: totalScore },
        submitted: { ...prev.submitted, [lessonId]: true },
        answers: { ...prev.answers, [lessonId]: answers },
    }));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'lesson':
        if (state.currentLesson) {
          return <LessonScreen 
            lessonId={state.currentLesson}
            lesson={LESSONS[state.currentLesson]}
            answers={state.answers[state.currentLesson]}
            score={state.scores[state.currentLesson]}
            isSubmitted={state.submitted[state.currentLesson]}
            onSave={handleSaveProgress}
            onSubmit={handleSubmitLesson}
            onBack={() => handleSetScreen('welcome')}
          />;
        }
        return <WelcomeScreen onStart={() => handleOpenLesson(1)} />;
      case 'results':
        return <ResultsScreen 
          state={state} 
          onBack={() => handleSetScreen('welcome')}
          onGenerateCert={() => handleSetScreen('certificate')}
        />;
      case 'certificate':
        return <CertificateScreen 
          state={state} 
          onBack={() => handleSetScreen('results')}
        />;
      case 'welcome':
      default:
        return <WelcomeScreen onStart={() => handleOpenLesson(1)} />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          <aside className="lg:col-span-4">
            <Sidebar
              userName={state.userName}
              scores={state.scores}
              currentLesson={state.currentLesson}
              completedCount={completedCount}
              overallPercent={overallPercent}
              onSaveName={handleSaveName}
              onReset={handleReset}
              onOpenLesson={handleOpenLesson}
              onViewResults={() => handleSetScreen('results')}
              onGenerateCert={() => handleSetScreen('certificate')}
            />
          </aside>
          <main className="lg:col-span-8">
            {renderScreen()}
          </main>
        </div>
        <footer className="mt-8 text-center text-white/90 text-sm p-5 bg-black/10 rounded-2xl backdrop-blur-sm">
          Teodósio Faria ©2025 Percurso Interativo – Renascimento & Reforma • Funciona melhor em PC e tablets
        </footer>
      </div>
    </div>
  );
}

export default App;