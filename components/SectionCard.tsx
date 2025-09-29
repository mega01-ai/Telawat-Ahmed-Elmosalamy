
import React from 'react';

interface SectionCardProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, icon, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group w-full md:w-1/3 max-w-sm h-32 md:h-48 flex flex-col justify-center items-center bg-slate-800 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-cyan-900/50 border-2 border-slate-700 hover:border-cyan-400"
    >
      <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
        {icon}
      </div>
      <h2 className="mt-3 md:mt-4 text-xl md:text-2xl font-bold text-slate-100 group-hover:text-white transition-colors duration-300">
        {title}
      </h2>
    </div>
  );
};

export default SectionCard;