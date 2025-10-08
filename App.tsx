import React, { useState, useEffect, useRef } from 'react';
import type { View, MediaItem, Playlist } from './types';
import MainScreen from './components/MainScreen';
import LatestAdditionsScreen from './components/LatestAdditionsScreen';
import FavoritesScreen from './components/FavoritesScreen';
import PlaylistsScreen from './components/PlaylistsScreen';
import SettingsScreen from './components/SettingsScreen';
import DownloadsScreen from './components/DownloadsScreen';
import PlaylistDetailsScreen from './components/PlaylistDetailsScreen';
import SplashScreen from './SplashScreen';
import SocialLinks from './components/SocialLinks';
import Player from './components/Player';
import VideoPlayerModal from './components/VideoPlayerModal';
import Notification from './Notification';
import OfflineIndicator from './components/OfflineIndicator';
import InstallPrompt from './components/InstallPrompt';
import { mediaItems as initialMediaItems } from './components/data';
import { initDB, getDownloadedIds, saveAudio, getAudio } from './db';
import { urlBase64ToUint8Array } from './utils';
import { BellIcon } from './components/icons';


const FAVORITES_STORAGE_KEY = 'ahmed-elmosalamy-favorites';
// This VAPID key is used to identify the application server to the push service.
// In a real-world scenario, this key should be securely generated and managed on a server.
const VAPID_PUBLIC_KEY = 'BPnZEgACUy5zC2nOG_n_3L3JtL2eY2y8Tq525t-SK4yr2a8p4AhzQUUa_hFLF9zAc_I37L2TfZIFe13sD2uG274';


interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

type RepeatMode = 'none' | 'playlist' | 'track';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('MAIN');
  const [showSplash, setShowSplash] = useState(true);
  const [dbReady, setDbReady] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [scrollToItem, setScrollToItem] = useState<{ id: number; key: number } | null>(null);


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
  const [activeMedia, setActiveMedia] = useState<{ item: MediaItem, playlist: MediaItem[], sourceView: View } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('none');
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [playerHeight, setPlayerHeight] = useState(78);
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

  // Check notification permission on load
  useEffect(() => {
    if ('Notification' in window) {
        // FIX: Use window.Notification to access the browser's Notification API,
        // as `Notification` is shadowed by the imported React component.
        setNotificationPermission(window.Notification.permission);
    }
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
      // Sync the component's view state with the browser's history state.
      setCurrentView(event.state?.view || 'MAIN');
    };

    window.addEventListener('popstate', handlePopState);
    
    // Set the initial history state on mount.
    window.history.replaceState({ view: 'MAIN' }, '');

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []); // Empty dependency array ensures this effect runs only once.


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

  // Effect to observe player height for dynamic padding
  useEffect(() => {
    const element = playerRef.current;
    if (!element) return;

    const observer = new ResizeObserver(entries => {
        for (let entry of entries) {
            setPlayerHeight(entry.contentRect.height);
        }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [activeMedia]); // Re-observe when player visibility changes


  // --- Player Handlers ---
  const handlePlayItem = async (item: MediaItem, playlist: MediaItem[], sourceView: View) => {
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
      
      setActiveMedia({ item, playlist, sourceView });
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
      handlePlayItem(activeMedia.playlist[nextIndex], activeMedia.playlist, activeMedia.sourceView);
    }
  };

  const handlePrevious = () => {
    if (!activeMedia) return;
    const currentIndex = findCurrentIndex();
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + activeMedia.playlist.length) % activeMedia.playlist.length;
      handlePlayItem(activeMedia.playlist[prevIndex], activeMedia.playlist, activeMedia.sourceView);
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
  
  const handleGoToTrackInList = () => {
      if (!activeMedia) return;
      setScrollToItem({ id: activeMedia.item.id, key: Date.now() });
      navigateTo(activeMedia.sourceView);
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

  const handleEnableNotifications = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        setNotification({ message: 'الإشعارات غير مدعومة في هذا المتصفح.', type: 'error' });
        return;
    }

    // FIX: Use window.Notification to access the browser's Notification API,
    // as `Notification` is shadowed by the imported React component.
    const permission = await window.Notification.requestPermission();
    setNotificationPermission(permission); // Update state with user's choice

    if (permission === 'granted') {
        try {
            const swRegistration = await navigator.serviceWorker.ready;
            const subscription = await swRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
            });
            
            // In a real app, send this subscription object to your backend server.
            console.log('User is subscribed:', JSON.stringify(subscription));
            setNotification({ message: 'تم الاشتراك بنجاح!', type: 'success' });

        } catch (error) {
            console.error('Failed to subscribe to push notifications:', error);
            setNotification({ message: 'فشل الاشتراك في التنبيهات.', type: 'error' });
        }
    } else if (permission === 'denied') {
        setNotification({ message: 'تم حظر إذن الإشعارات.', type: 'error' });
    }
    // If 'default', nothing happens yet, the user dismissed the prompt.
  };

  const navigateTo = (view: View) => {
    if (currentView !== view) {
        window.history.pushState({ view: view }, '');
        setCurrentView(view);
    }
  };

  const handleSelectPlaylist = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    navigateTo('PLAYLIST_DETAILS');
  };
  
  const handleBack = () => {
      window.history.back();
  };

  const onScrolled = () => {
    setScrollToItem(null);
  };
  
  const handleToggleRepeatMode = () => {
    setRepeatMode(prevMode => {
        if (prevMode === 'none') return 'playlist';
        if (prevMode === 'playlist') return 'track';
        return 'none'; // from 'track' back to 'none'
    });
  };

  const handleTrackEnd = () => {
    if (!activeMedia) return;

    if (repeatMode === 'track' && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.error("Error re-playing audio:", e));
        return;
    }
    
    const currentIndex = findCurrentIndex();
    const isLastTrack = currentIndex === activeMedia.playlist.length - 1;

    if (repeatMode === 'none' && isLastTrack) {
        setIsPlaying(false);
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        }
    } else {
        // This handles 'playlist' repeat mode and 'none' for non-last tracks
        handleNext();
    }
  };

  const renderContent = () => {
    const latestItems = [...mediaData].sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
    const favoriteItems = mediaData.filter(item => item.isFavorite);
    const downloadedItems = mediaData.filter(item => item.isDownloaded);

    // Fix: Correctly assign handler functions to props instead of using shorthand properties for non-existent variables.
    const commonProps = {
      onToggleFavorite: handleToggleFavorite,
      onDownload: handleDownloadItem,
      onShare: handleShareItem,
      onBack: handleBack,
      scrollToItem,
      onScrolled
    };

    switch (currentView) {
      case 'LATEST':
        return <LatestAdditionsScreen items={latestItems} onPlay={(item, playlist) => handlePlayItem(item, playlist, 'LATEST')} {...commonProps} />;
      case 'FAVORITES':
        return <FavoritesScreen items={favoriteItems} onPlay={(item, playlist) => handlePlayItem(item, playlist, 'FAVORITES')} {...commonProps} />;
      case 'DOWNLOADS':
        return <DownloadsScreen items={downloadedItems} onPlay={(item, playlist) => handlePlayItem(item, playlist, 'DOWNLOADS')} {...commonProps} />;
      case 'PLAYLISTS':
        return <PlaylistsScreen onBack={handleBack} onPlaylistSelect={handleSelectPlaylist} />;
      case 'PLAYLIST_DETAILS':
        if (!selectedPlaylist) {
          // Fallback if state is lost
          return <PlaylistsScreen onBack={handleBack} onPlaylistSelect={handleSelectPlaylist} />;
        }
        const playlistItems = mediaData.filter(item => selectedPlaylist.itemIds?.includes(item.id));
        return <PlaylistDetailsScreen playlist={selectedPlaylist} items={playlistItems} onPlay={(item, playlist) => handlePlayItem(item, playlist, 'PLAYLIST_DETAILS')} {...commonProps} />;
      case 'SETTINGS':
        return <SettingsScreen onBack={handleBack} onEnableNotifications={handleEnableNotifications} notificationPermission={notificationPermission} />;
      case 'MAIN':
      default:
        return <MainScreen onNavigate={navigateTo} />;
    }
  };

  const socialLinksNormalHeight = 56;
  const socialLinksCompactHeight = 56;
  
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
        onEnded={handleTrackEnd}
        hidden
      />
      {showSplash && <SplashScreen />}
      {!showSplash && 
        <>
          {currentView === 'MAIN' && (
            <div className="fixed top-4 left-4 z-30 animate-fade-in">
              <button 
                  onClick={() => navigateTo('SETTINGS')}
                  aria-label="الاشتراك في التنبيهات"
                  className="relative p-3 bg-slate-800/60 backdrop-blur-sm rounded-full text-cyan-400 hover:text-cyan-300 hover:bg-slate-700/80 transition-all duration-300 shadow-lg"
              >
                  <BellIcon className="w-6 h-6" />
                  {notificationPermission === 'default' && (
                      <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-slate-800/60"></span>
                  )}
              </button>
            </div>
          )}
          
          <OfflineIndicator 
            isOnline={isOnline} 
            hasDownloads={hasDownloads}
            onNavigate={() => navigateTo('DOWNLOADS')}
          />

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
              ref={playerRef}
              activeMedia={activeMedia.item}
              isPlaying={isPlaying}
              currentTime={currentTime}
              duration={duration}
              repeatMode={repeatMode}
              onTogglePlay={handleTogglePlay}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onClose={handleClosePlayer}
              onSeek={handleSeek}
              onGoToTrackInList={handleGoToTrackInList}
              onToggleRepeatMode={handleToggleRepeatMode}
            />
          )}
        </>
      }
    </div>
  );
};

export default App;