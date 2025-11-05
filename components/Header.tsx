
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg flex items-center gap-5">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl font-extrabold text-white shadow-indigo-300/50 shadow-xl">
        📚
      </div>
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800">Renascimento & Reforma</h1>
        <p className="text-sm text-slate-500 mt-1">Percurso Interativo • 5 Aulas • Avaliação Automática • Certificado Imprimível</p>
      </div>
    </header>
  );
};

export default Header;
