
import React, { useState } from 'react';
import type { View } from './types';
import MainScreen from './components/MainScreen';
import LatestAdditionsScreen from './components/LatestAdditionsScreen';
import FavoritesScreen from './components/FavoritesScreen';
import PlaylistsScreen from './components/PlaylistsScreen';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('MAIN');

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
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
