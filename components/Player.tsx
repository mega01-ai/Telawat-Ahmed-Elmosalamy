import React from 'react';
import { MediaItem } from '../types';
import { PlayIcon, PauseIcon, NextIcon, PreviousIcon, CloseIcon, AudioIcon, VideoIcon } from './icons';
import { formatDuration } from '../utils';

interface PlayerProps {
  activeMedia: MediaItem;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
  onSeek: (time: number) => void;
}

const Player: React.FC<PlayerProps> = ({
  activeMedia,
  isPlaying,
  currentTime,
  duration,
  onTogglePlay,
  onNext,
  onPrevious,
  onClose,
  onSeek
}) => {
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  const playerBottomOffset = 56; // Raised from 44px to make social links fully visible

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSeek(e.target.valueAsNumber);
  };

  return (
    <div 
      className="fixed left-0 right-0 z-20 bg-slate-800/80 backdrop-blur-lg border-t border-slate-700/60 text-slate-100 animate-slide-up-fade-in"
      style={{ bottom: `${playerBottomOffset}px` }}
    >
      <div className="container mx-auto px-4 py-2">
        {/* Progress bar and time display */}
        <div className="flex items-center gap-2">
          <span className="w-12 text-center text-xs text-slate-400 font-mono">
            {formatDuration(currentTime)}
          </span>
          <div className="relative flex-grow h-2">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="absolute w-full h-full bg-transparent appearance-none cursor-pointer z-10 range-sm accent-cyan-400"
              aria-label="Audio progress bar"
            />
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-1 bg-slate-600 rounded-full">
                <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>
          <span className="w-12 text-center text-xs text-slate-400 font-mono">
            {formatDuration(duration)}
          </span>
        </div>

        <div className="flex items-center justify-between mt-1">
          {/* Track Info */}
          <div className="flex items-center gap-3 w-1/3 min-w-0">
            <div className="text-cyan-400 flex-shrink-0">
                {activeMedia.type === 'audio' ? <AudioIcon className="w-6 h-6"/> : <VideoIcon className="w-6 h-6"/>}
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-slate-50 overflow-hidden">
                  <div className="inline-block whitespace-nowrap animate-marquee">
                      <span className="mx-6">{activeMedia.title}</span>
                      <span className="mx-6">{activeMedia.title}</span>
                  </div>
              </div>
              <p className="text-xs text-slate-400">{activeMedia.reciter}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 w-auto">
            <button onClick={onPrevious} aria-label="Previous track" className="text-slate-300 hover:text-white transition-colors"><PreviousIcon className="w-8 h-8"/></button>
            <button onClick={onTogglePlay} aria-label={isPlaying ? 'Pause' : 'Play'} className="p-2 bg-cyan-400 text-slate-900 rounded-full hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/30">
              {isPlaying ? <PauseIcon className="w-10 h-10" /> : <PlayIcon className="w-10 h-10" />}
            </button>
            <button onClick={onNext} aria-label="Next track" className="text-slate-300 hover:text-white transition-colors"><NextIcon className="w-8 h-8"/></button>
          </div>
          
          {/* Close Button */}
          <div className="flex items-center justify-end w-1/3">
            <button onClick={onClose} aria-label="Close player" className="text-slate-400 hover:text-white transition-colors"><CloseIcon className="w-6 h-6"/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;