
import React, { useState, useEffect, useRef } from 'react';
import type { View, MediaItem } from './types';
import MainScreen from './components/MainScreen';
import LatestAdditionsScreen from './components/LatestAdditionsScreen';
import FavoritesScreen from './components/FavoritesScreen';
import PlaylistsScreen from './components/PlaylistsScreen';
import SplashScreen from './components/SplashScreen';
import SocialLinks from './components/SocialLinks';
import Player from './components/Player';
import { parseDuration } from './utils';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('MAIN');
  const [showSplash, setShowSplash] = useState(true);

  // --- Player State ---
  const [activeMedia, setActiveMedia] = useState<{ item: MediaItem, playlist: MediaItem[] } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const intervalRef = useRef<number | null>(null);

  // Splash Screen Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500); // Show splash for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Player playback simulation effect
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (isPlaying && duration > 0) {
      intervalRef.current = window.setInterval(() => {
        setCurrentTime(prevTime => {
          if (prevTime < duration) {
            return prevTime + 1;
          }
          // Autoplay next track
          handleNext();
          return 0;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, duration]);
  
  // --- Player Handlers ---
  const handlePlayItem = (item: MediaItem, playlist: MediaItem[]) => {
    setActiveMedia({ item, playlist });
    const newDuration = parseDuration(item.duration);
    setDuration(newDuration);
    setCurrentTime(0);
    setIsPlaying(true);
  };
  
  const handleTogglePlay = () => {
    if (!activeMedia) return;
    setIsPlaying(!isPlaying);
  };

  const findCurrentIndex = () => {
    if (!activeMedia) return -1;
    return activeMedia.playlist.findIndex(track => track.id === activeMedia.item.id);
  };

  const handleNext = () => {
    if (!activeMedia) return;
    const currentIndex = findCurrentIndex();
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % activeMedia.playlist.length;
      handlePlayItem(activeMedia.playlist[nextIndex], activeMedia.playlist);
    }
  };

  const handlePrevious = () => {
    if (!activeMedia) return;
    const currentIndex = findCurrentIndex();
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + activeMedia.playlist.length) % activeMedia.playlist.length;
      handlePlayItem(activeMedia.playlist[prevIndex], activeMedia.playlist);
    }
  };
  
  const handleSeek = (time: number) => {
    setCurrentTime(time);
  };

  const handleClosePlayer = () => {
    setActiveMedia(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  };

  const navigateTo = (view: View) => {
    setCurrentView(view);
  };

  const renderContent = () => {
    const props = { onBack: () => navigateTo('MAIN'), onPlay: handlePlayItem };
    switch (currentView) {
      case 'LATEST':
        return <LatestAdditionsScreen {...props} />;
      case 'FAVORITES':
        return <FavoritesScreen {...props} />;
      case 'PLAYLISTS':
        return <PlaylistsScreen onBack={() => navigateTo('MAIN')} />;
      case 'MAIN':
      default:
        return <MainScreen onNavigate={navigateTo} />;
    }
  };

  const socialLinksNormalHeight = 56;
  const socialLinksCompactHeight = 44;
  const playerHeight = 78;
  
  const bottomPadding = activeMedia 
    ? playerHeight + socialLinksCompactHeight 
    : socialLinksNormalHeight;

  return (
    <div className="min-h-screen bg-slate-900" style={{ paddingBottom: `${bottomPadding}px`, transition: 'padding-bottom 0.4s ease-out' }}>
      {showSplash && <SplashScreen />}
      {!showSplash && 
        <>
          <div className="container mx-auto px-4 py-6 animate-fade-in">
            {renderContent()}
          </div>
          
          {/* Footer Elements */}
          <SocialLinks isPlayerActive={!!activeMedia} />

          {activeMedia && (
            <Player 
              activeMedia={activeMedia.item}
              isPlaying={isPlaying}
              currentTime={currentTime}
              duration={duration}
              onTogglePlay={handleTogglePlay}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onClose={handleClosePlayer}
              onSeek={handleSeek}
            />
          )}
        </>
      }
    </div>
  );
};

export default App;
