import React, { useState, useEffect, useRef } from 'react';
import type { View, MediaItem } from './types';
import MainScreen from './components/MainScreen';
import LatestAdditionsScreen from './components/LatestAdditionsScreen';
import FavoritesScreen from './components/FavoritesScreen';
import PlaylistsScreen from './components/PlaylistsScreen';
import SplashScreen from './components/SplashScreen';
import SocialLinks from './components/SocialLinks';
import Player from './components/Player';
import VideoPlayerModal from './components/VideoPlayerModal';
import { mediaItems as initialMediaItems } from './data';

const FAVORITES_STORAGE_KEY = 'ahmed-elmosalamy-favorites';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('MAIN');
  const [showSplash, setShowSplash] = useState(true);

  const [mediaData, setMediaData] = useState<MediaItem[]>(() => {
    try {
        const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
        const favoriteIds: number[] = storedFavorites ? JSON.parse(storedFavorites) : [];
        return initialMediaItems.map(item => ({
            ...item,
            isFavorite: favoriteIds.includes(item.id),
        }));
    } catch (error) {
        console.error("Failed to load favorites from localStorage", error);
        return initialMediaItems;
    }
  });

  // --- Player State ---
  const [activeMedia, setActiveMedia] = useState<{ item: MediaItem, playlist: MediaItem[] } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // --- Video Player State ---
  const [playingVideo, setPlayingVideo] = useState<MediaItem | null>(null);

  // Splash Screen Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500); // Show splash for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);
  
  // Persist favorites to localStorage
  useEffect(() => {
    try {
        const favoriteIds = mediaData.filter(item => item.isFavorite).map(item => item.id);
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch (error) {
        console.error("Failed to save favorites to localStorage", error);
    }
  }, [mediaData]);


  // Effect to control audio playback (play/pause)
  useEffect(() => {
    if (audioRef.current) {
        if (isPlaying) {
            audioRef.current.play().catch(error => console.error("Audio play failed:", error));
        } else {
            audioRef.current.pause();
        }
    }
  }, [isPlaying, activeMedia]);
  
  // --- Player Handlers ---
  const handlePlayItem = (item: MediaItem, playlist: MediaItem[]) => {
    if (item.type === 'video' && (item.url.includes('youtu') || item.url.includes('youtube'))) {
      handleClosePlayer();
      setPlayingVideo(item);
    } else if (item.type === 'audio') {
      setPlayingVideo(null);

      // If the same item is clicked, toggle play/pause
      if (activeMedia?.item.id === item.id) {
          handleTogglePlay();
          return;
      }
      
      setActiveMedia({ item, playlist });
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = item.url;
        audioRef.current.load();
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      }
    }
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
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleClosePlayer = () => {
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
    }
    setActiveMedia(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  };

  const handleCloseVideoPlayer = () => {
    setPlayingVideo(null);
  };

  const handleToggleFavorite = (itemId: number) => {
    setMediaData(currentMedia =>
        currentMedia.map(item =>
            item.id === itemId ? { ...item, isFavorite: !item.isFavorite } : item
        )
    );
  };

  const navigateTo = (view: View) => {
    setCurrentView(view);
  };

  const renderContent = () => {
    const latestItems = [...mediaData].sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
    const favoriteItems = mediaData.filter(item => item.isFavorite);

    switch (currentView) {
      case 'LATEST':
        return <LatestAdditionsScreen items={latestItems} onBack={() => navigateTo('MAIN')} onPlay={handlePlayItem} onToggleFavorite={handleToggleFavorite} />;
      case 'FAVORITES':
        return <FavoritesScreen items={favoriteItems} onBack={() => navigateTo('MAIN')} onPlay={handlePlayItem} onToggleFavorite={handleToggleFavorite} />;
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
      <audio 
        ref={audioRef}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={handleNext}
        hidden
      />
      {showSplash && <SplashScreen />}
      {!showSplash && 
        <>
          <div className="container mx-auto px-4 py-6 animate-fade-in">
            {renderContent()}
          </div>
          
          {/* Video Player Modal */}
          {playingVideo && <VideoPlayerModal item={playingVideo} onClose={handleCloseVideoPlayer} />}

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