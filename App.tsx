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
import Notification from './components/Notification';
import OfflineIndicator from './components/OfflineIndicator';
import InstallPrompt from './components/InstallPrompt';
import { mediaItems as initialMediaItems } from './data';
import { initDB, getDownloadedIds, saveAudio, getAudio } from './db';

const FAVORITES_STORAGE_KEY = 'ahmed-elmosalamy-favorites';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('MAIN');
  const [showSplash, setShowSplash] = useState(true);
  const [dbReady, setDbReady] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);


  const [mediaData, setMediaData] = useState<MediaItem[]>(() => {
    try {
        const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
        const favoriteIds: number[] = storedFavorites ? JSON.parse(storedFavorites) : [];
        return initialMediaItems.map(item => ({
            ...item,
            isFavorite: favoriteIds.includes(item.id),
            isDownloaded: false,
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
  const currentBlobUrl = useRef<string | null>(null);

  // --- Video Player State ---
  const [playingVideo, setPlayingVideo] = useState<MediaItem | null>(null);

  // Splash Screen Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Initialize DB
  useEffect(() => {
    initDB().then(() => setDbReady(true)).catch(console.error);
  }, []);

  // Network Status Listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // PWA Install Prompt Listener
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setInstallPromptEvent(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
        // Clear the prompt event once installed
        setInstallPromptEvent(null);
    };
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // History management for back button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      setCurrentView(event.state?.view || 'MAIN');
    };

    window.addEventListener('popstate', handlePopState);
    // Ensure the initial state is correctly set in the history
    window.history.replaceState({ view: 'MAIN' }, '');

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);


  // Load downloaded status from DB when it's ready
  useEffect(() => {
    if (dbReady) {
      getDownloadedIds().then(downloadedIds => {
        setMediaData(currentData =>
          currentData.map(item => ({
            ...item,
            isDownloaded: downloadedIds.includes(item.id),
          }))
        );
      }).catch(console.error);
    }
  }, [dbReady]);
  
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
  
  // Effect to clean up blob URLs
  useEffect(() => {
    return () => {
        if (currentBlobUrl.current) {
            URL.revokeObjectURL(currentBlobUrl.current);
        }
    }
  }, []);

  // --- Player Handlers ---
  const handlePlayItem = async (item: MediaItem, playlist: MediaItem[]) => {
    if (currentBlobUrl.current) {
        URL.revokeObjectURL(currentBlobUrl.current);
        currentBlobUrl.current = null;
    }

    if (item.type === 'video' && (item.url.includes('youtu') || item.url.includes('youtube'))) {
      handleClosePlayer();
      setPlayingVideo(item);
    } else if (item.type === 'audio') {
      setPlayingVideo(null);

      if (activeMedia?.item.id === item.id) {
          handleTogglePlay();
          return;
      }
      
      setActiveMedia({ item, playlist });
      setIsPlaying(true);

      let audioSrc = item.url;
      if (item.isDownloaded) {
          try {
              const blob = await getAudio(item.id);
              if (blob) {
                  const blobUrl = URL.createObjectURL(blob);
                  currentBlobUrl.current = blobUrl;
                  audioSrc = blobUrl;
              }
          } catch (error) {
              console.error("Failed to load downloaded audio, falling back to network", error);
          }
      }
      
      if (audioRef.current) {
        audioRef.current.src = audioSrc;
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
    if (currentBlobUrl.current) {
        URL.revokeObjectURL(currentBlobUrl.current);
        currentBlobUrl.current = null;
    }
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

  const handleDownloadItem = async (itemId: number) => {
    const itemToDownload = mediaData.find(item => item.id === itemId);
    if (!itemToDownload || itemToDownload.isDownloaded || !dbReady) return;

    try {
        const response = await fetch(itemToDownload.url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const blob = await response.blob();
        await saveAudio(itemToDownload.id, blob);

        setMediaData(currentData =>
            currentData.map(item =>
                item.id === itemId ? { ...item, isDownloaded: true } : item
            )
        );
        setNotification({ message: 'تم التحميل بنجاح!', type: 'success' });
    } catch (error) {
        console.error('Download failed:', error);
        setNotification({ message: 'فشل التحميل، قد يكون المصدر غير متاح.', type: 'error' });
        throw error;
    }
  };

  const handleShareItem = async (itemId: number) => {
    const itemToShare = mediaData.find(item => item.id === itemId);
    if (!itemToShare) return;

    const sharePayload = {
      title: `تلاوة: ${itemToShare.title}`,
      text: `استمع إلى تلاوة "${itemToShare.title}" للقارئ ${itemToShare.reciter}`,
      url: itemToShare.url,
    };

    if (navigator.share) {
      try {
        await navigator.share(sharePayload);
      } catch (error) {
        console.error('Sharing failed:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(itemToShare.url);
        setNotification({ message: 'تم نسخ الرابط إلى الحافظة', type: 'success' });
      } catch (error) {
        console.error('Failed to copy URL:', error);
        setNotification({ message: 'فشل نسخ الرابط', type: 'error' });
      }
    }
  };

  const handleInstall = () => {
    if (!installPromptEvent) return;
    installPromptEvent.prompt();
    installPromptEvent.userChoice.then(({ outcome }) => {
        console.log(`User response to the install prompt: ${outcome}`);
        setInstallPromptEvent(null);
    });
  };

  const handleDismissInstall = () => {
      setInstallPromptEvent(null);
  };

  const navigateTo = (view: View) => {
    if (currentView !== view) {
        window.history.pushState({ view: view }, '');
        setCurrentView(view);
    }
  };
  
  const handleBack = () => {
      window.history.back();
  };

  const renderContent = () => {
    const latestItems = [...mediaData].sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
    const favoriteItems = mediaData.filter(item => item.isFavorite);

    switch (currentView) {
      case 'LATEST':
        return <LatestAdditionsScreen items={latestItems} onBack={handleBack} onPlay={handlePlayItem} onToggleFavorite={handleToggleFavorite} onDownload={handleDownloadItem} onShare={handleShareItem} />;
      case 'FAVORITES':
        return <FavoritesScreen items={favoriteItems} onBack={handleBack} onPlay={handlePlayItem} onToggleFavorite={handleToggleFavorite} onDownload={handleDownloadItem} onShare={handleShareItem} />;
      case 'PLAYLISTS':
        return <PlaylistsScreen onBack={handleBack} />;
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
  
  const hasDownloads = mediaData.some(item => item.isDownloaded);

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
          <OfflineIndicator isOnline={isOnline} hasDownloads={hasDownloads} />

          <div className="container mx-auto px-4 py-6 animate-fade-in">
            {renderContent()}
          </div>

          {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
          
          {/* Video Player Modal */}
          {playingVideo && <VideoPlayerModal item={playingVideo} onClose={handleCloseVideoPlayer} />}

          {/* Footer Elements */}
          {installPromptEvent && (
              <InstallPrompt 
                  onInstall={handleInstall} 
                  onDismiss={handleDismissInstall} 
                  bottomOffset={bottomPadding} 
              />
          )}

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