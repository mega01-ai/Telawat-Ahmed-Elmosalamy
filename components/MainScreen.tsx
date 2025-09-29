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
    <div className="flex flex-col min-h-[calc(100vh-112px)] justify-center text-center">
      <header className="mb-6 md:mb-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-cyan-400/80 shadow-lg flex-shrink-0">
                <img src={splashImage} alt="احمد المسلمي" className="w-full h-full object-cover" style={{objectPosition: '50% 15%'}}/>
            </div>
            <div className="text-center md:text-right">
                <h1 className="text-3xl md:text-4xl font-bold text-cyan-400">تلاوات احمد المسلمي</h1>
                <p className="text-slate-400 mt-2 text-base">استمع وعش أجواء القرآن الكريم</p>
            </div>
        </div>
      </header>
      <main className="w-full flex flex-row justify-center items-stretch gap-3 md:gap-5 px-2 md:px-4">
        <SectionCard 
          title="آخر الإضافات" 
          icon={<ClockIcon className="w-8 h-8 md:w-10 md:h-10" />} 
          onClick={() => onNavigate('LATEST')} 
        />
        <SectionCard 
          title="المفضلة" 
          icon={<HeartIcon className="w-8 h-8 md:w-10 md:h-10" />} 
          onClick={() => onNavigate('FAVORITES')} 
        />
        <SectionCard 
          title="القوائم" 
          icon={<PlaylistIcon className="w-8 h-8 md:w-10 md:h-10" />} 
          onClick={() => onNavigate('PLAYLISTS')} 
        />
      </main>
    </div>
  );
};

export default MainScreen;