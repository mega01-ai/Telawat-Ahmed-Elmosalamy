import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MediaItem } from '../types';
import { CloseIcon, PlayIcon, PauseIcon } from './icons';
import { formatDuration } from '../utils';

// Add YT types to window for TypeScript
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

function getYouTubeVideoId(url: string): string | null {
  let videoId = null;
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      videoId = urlObj.pathname.slice(1);
    } else if (urlObj.hostname.includes('youtube.com')) {
      videoId = urlObj.searchParams.get('v');
    }
  } catch (e) {
    console.error("Invalid URL for YouTube parsing:", e);
    return null;
  }
  return videoId;
}

interface VideoPlayerModalProps {
  item: MediaItem;
  onClose: () => void;
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ item, onClose }) => {
  const [apiReady, setApiReady] = useState(!!window.YT?.Player);
  const playerRef = useRef<any>(null); // YT.Player instance
  const progressIntervalRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoId = useMemo(() => getYouTubeVideoId(item.url), [item.url]);
  const playerDivId = useMemo(() => `youtube-player-${item.id}`, [item.id]);

  // Effect to load the YouTube API script
  useEffect(() => {
    if (apiReady) return;

    const existingCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      existingCallback?.();
      setApiReady(true);
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
    }
  }, [apiReady]);

  // Effect to initialize the player once the API is ready and we have a video ID
  useEffect(() => {
    if (!apiReady || !videoId) {
      return;
    }

    const onPlayerStateChange = (event: any) => {
      const state = event.data;
      if (state === window.YT.PlayerState.PLAYING) {
        setIsPlaying(true);
        if(!duration) setDuration(playerRef.current.getDuration());
        
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = window.setInterval(() => {
          if(playerRef.current) {
            setCurrentTime(playerRef.current.getCurrentTime());
          }
        }, 250);

      } else {
        setIsPlaying(false);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
      }

      if (state === window.YT.PlayerState.ENDED) {
        onClose();
      }
    };

    const player = new window.YT.Player(playerDivId, {
      videoId: videoId,
      width: '100%',
      height: '100%',
      playerVars: {
        autoplay: 1,
        rel: 0,
        controls: 0,
        modestbranding: 1,
        showinfo: 0,
      },
      events: {
        onReady: (event: any) => {
          setDuration(event.target.getDuration());
        },
        onStateChange: onPlayerStateChange,
      },
    });
    playerRef.current = player;

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
      playerRef.current = null;
    };
  }, [apiReady, videoId, playerDivId, onClose, duration]);

  const handleClose = () => {
    if (playerRef.current && typeof playerRef.current.stopVideo === 'function') {
      playerRef.current.stopVideo();
    }
    onClose();
  };
  
  const handleTogglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.valueAsNumber;
    if (playerRef.current) {
      playerRef.current.seekTo(time, true);
      setCurrentTime(time);
    }
  };


  if (!videoId) {
    // Fallback for invalid URLs
    return (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in"
          onClick={onClose}
        >
          <div className="bg-slate-900 p-8 rounded-lg">
            <p className="text-red-400">فشل تحميل الفيديو. الرابط غير صالح.</p>
          </div>
        </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-player-title"
    >
      <div 
        className="relative bg-slate-900 rounded-lg shadow-2xl w-11/12 max-w-4xl animate-slide-up-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
            <h3 id="video-player-title" className="text-xl font-bold text-cyan-400">{item.title}</h3>
            <button onClick={handleClose} aria-label="Close video player" className="text-slate-400 hover:text-white transition-colors">
                <CloseIcon className="w-8 h-8"/>
            </button>
        </div>
        <div className="aspect-video bg-black">
          <div id={playerDivId} />
        </div>

        {/* Player Controls */}
        <div className="px-4 pt-2 pb-3">
            <input
                type="range"
                min="0"
                max={duration || 1}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                aria-label="Video progress bar"
            />
            <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-2">
                    <button onClick={handleTogglePlay} aria-label={isPlaying ? 'Pause' : 'Play'} className="text-slate-200 hover:text-white transition-colors">
                        {isPlaying ? <PauseIcon className="w-8 h-8" /> : <PlayIcon className="w-8 h-8" />}
                    </button>
                </div>
                <div className="text-sm text-slate-400 font-mono">
                    <span>{formatDuration(currentTime)}</span> / <span>{formatDuration(duration)}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerModal;
