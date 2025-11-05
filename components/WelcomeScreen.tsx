
import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const FeatureCard: React.FC<{ icon: string; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="p-5 bg-slate-100/50 rounded-xl text-center">
    <div className="text-4xl mb-2">{icon}</div>
    <div className="font-bold text-slate-800 text-sm">{title}</div>
    <div className="text-xs text-slate-500 mt-1">{desc}</div>
  </div>
);

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg">
      <div className="text-center py-8">
        <h2 className="text-4xl font-extrabold text-slate-800 mb-3">Bem-vindo ao Percurso Interativo</h2>
        <p className="text-slate-500 max-w-xl mx-auto mb-8">
          Este percurso pedagógico abrange os temas do Renascimento e da Reforma Protestante. Complete as 5 aulas com avaliação automática e obtenha o seu certificado.
        </p>
        <button onClick={onStart} className="px-8 py-4 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-base hover:scale-105 transition shadow-lg shadow-indigo-200">
          🚀 Começar Aula 1
        </button>
      </div>
      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        <FeatureCard icon="📚" title="Conteúdo Estruturado" desc="5 aulas com base em fontes históricas" />
        <FeatureCard icon="✅" title="Avaliação Automática" desc="Correção imediata e feedback detalhado" />
        <FeatureCard icon="🏆" title="Certificado Final" desc="Documento imprimível com resultados" />
      </div>
    </div>
  );
};

export default WelcomeScreen;
