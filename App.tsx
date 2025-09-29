import React, { useState, useEffect } from 'react';
import type { View } from './types';
import MainScreen from './components/MainScreen';
import LatestAdditionsScreen from './components/LatestAdditionsScreen';
import FavoritesScreen from './components/FavoritesScreen';
import PlaylistsScreen from './components/PlaylistsScreen';
import SplashScreen from './components/SplashScreen';
import SocialLinks from './components/SocialLinks';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('MAIN');
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500); // Show splash for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);


  const navigateTo = (view: View) => {
    setCurrentView(view);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'LATEST':
        return <LatestAdditionsScreen onBack={() => navigateTo('MAIN')} />;
      case 'FAVORITES':
        return <FavoritesScreen onBack={() => navigateTo('MAIN')} />;
      case 'PLAYLISTS':
        return <PlaylistsScreen onBack={() => navigateTo('MAIN')} />;
      case 'MAIN':
      default:
        return <MainScreen onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 pb-20">
      {showSplash && <SplashScreen />}
      {!showSplash && 
        <>
          <div className="container mx-auto px-4 py-6 animate-fade-in">
            {renderContent()}
          </div>
          <SocialLinks />
        </>
      }
    </div>
  );
};

export default App;
