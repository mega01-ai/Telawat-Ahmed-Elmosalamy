

import React from 'react';
import { splashImage } from './components/images';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#2C5261] flex justify-center items-center z-50 animate-fade-out" style={{animationDelay: '2s', animationFillMode: 'forwards'}}>
      <div className="w-full h-full flex justify-center items-center animate-fade-in">
         <img src={splashImage} alt="تلاوات احمد المسلمي" className="w-4/5 max-w-sm" />
      </div>
    </div>
  );
};

export default SplashScreen;