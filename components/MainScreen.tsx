
import React from 'react';
import type { View } from '../types';
import SectionCard from './SectionCard';
import { ClockIcon, HeartIcon, PlaylistIcon } from './icons';

interface MainScreenProps {
  onNavigate: (view: View) => void;
}

const MainScreen: React.FC<MainScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col h-[90vh] text-center">
      <header className="py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">تلاوات احمد المسلمي</h1>
        <p className="text-slate-400 mt-2 text-lg">استمع وعش أجواء القرآن الكريم</p>
      </header>
      <main className="flex-grow flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 px-4">
        <SectionCard 
          title="آخر الإضافات" 
          icon={<ClockIcon className="w-12 h-12" />} 
          onClick={() => onNavigate('LATEST')} 
        />
        <SectionCard 
          title="المفضلة" 
          icon={<HeartIcon className="w-12 h-12" />} 
          onClick={() => onNavigate('FAVORITES')} 
        />
        <SectionCard 
          title="القوائم" 
          icon={<PlaylistIcon className="w-12 h-12" />} 
          onClick={() => onNavigate('PLAYLISTS')} 
        />
      </main>
    </div>
  );
};

export default MainScreen;
