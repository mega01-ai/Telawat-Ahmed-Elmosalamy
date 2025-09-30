import React from 'react';
import type { View } from '../types';
import SectionCard from './SectionCard';
import { ClockIcon, HeartIcon, PlaylistIcon, SettingsIcon } from './icons';
import { splashImage } from '../images';

interface MainScreenProps {
  onNavigate: (view: View) => void;
}

const MainScreen: React.FC<MainScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-112px)] justify-center text-center">
      <header className="mb-8 md:mb-12">
        <div className="flex flex-col items-center justify-center gap-6">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 ring-4 ring-cyan-500/70 ring-offset-4 ring-offset-slate-900">
                <img src={splashImage} alt="احمد المسلمي" className="w-full h-full object-cover" style={{objectPosition: '50% 15%'}}/>
            </div>
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">تلاوات احمد المسلمي</h1>
                <p className="text-slate-400 mt-3 text-base">استمع وعش أجواء القرآن الكريم</p>
            </div>
        </div>
      </header>
      <main className="w-full flex flex-row flex-wrap justify-center items-stretch gap-3 md:gap-5 px-2 md:px-4">
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
        <SectionCard 
          title="الإعدادات" 
          icon={<SettingsIcon className="w-8 h-8 md:w-10 md:h-10" />} 
          onClick={() => onNavigate('SETTINGS')} 
        />
      </main>
    </div>
  );
};

export default MainScreen;