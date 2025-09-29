
import React from 'react';
import type { View } from '../types';
import SectionCard from './SectionCard';
import { ClockIcon, HeartIcon, PlaylistIcon } from './icons';
import { splashImage } from '../images';

interface MainScreenProps {
  onNavigate: (view: View) => void;
}

const MainScreen: React.FC<MainScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3rem)] justify-center text-center">
      <header className="py-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-12">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-cyan-400/80 shadow-lg flex-shrink-0">
                <img src={splashImage} alt="احمد المسلمي" className="w-full h-full object-cover" style={{objectPosition: '50% 15%'}}/>
            </div>
            <div className="text-center md:text-right">
                <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">تلاوات احمد المسلمي</h1>
                <p className="text-slate-400 mt-2 text-lg">استمع وعش أجواء القرآن الكريم</p>
            </div>
        </div>
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
