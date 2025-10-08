import React from 'react';
import { MediaItem } from '../types';
import { PlayIcon, PauseIcon, NextIcon, PreviousIcon, CloseIcon, AudioIcon, VideoIcon, RepeatIcon, RepeatOneIcon } from './icons';
import { formatDuration } from '../utils';

interface PlayerProps {
  activeMedia: MediaItem;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  repeatMode: 'none' | 'playlist' | 'track';
  onTogglePlay: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
  onSeek: (time: number) => void;
  onGoToTrackInList: () => void;
  onToggleRepeatMode: () => void;
}

const Player = React.forwardRef<HTMLDivElement, PlayerProps>(({
  activeMedia,
  isPlaying,
  currentTime,
  duration,
  repeatMode,
  onTogglePlay,
  onNext,
  onPrevious,
  onClose,
  onSeek,
  onGoToTrackInList,
  onToggleRepeatMode
}, ref) => {
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  const playerBottomOffset = 56;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSeek(e.target.valueAsNumber);
  };
  
  const getRepeatAriaLabel = () => {
    switch (repeatMode) {
        case 'track': return 'تكرار المقطع الحالي';
        case 'playlist': return 'تكرار القائمة';
        default: return 'التكرار متوقف';
    }
  };

  return (
    <div 
      ref={ref}
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

        <div className="flex items-center justify-between mt-1 gap-4">
          {/* Track Info */}
          <div
            className="group flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
            onClick={onGoToTrackInList}
            title="تحديد المقطع في القائمة"
          >
            <div className="text-cyan-400 flex-shrink-0">
                {activeMedia.type === 'audio' ? <AudioIcon className="w-6 h-6"/> : <VideoIcon className="w-6 h-6"/>}
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-slate-50 whitespace-normal leading-tight group-hover:text-cyan-400 transition-colors">
                {activeMedia.title}
              </h3>
              <p className="text-xs text-slate-400">{activeMedia.reciter}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-end gap-1 sm:gap-2 flex-shrink-0">
            <button 
                onClick={onToggleRepeatMode} 
                aria-label={getRepeatAriaLabel()} 
                className={`p-1 transition-colors rounded-full ${repeatMode === 'none' ? 'text-slate-400 hover:text-white' : 'text-cyan-400 hover:text-cyan-300'}`}
            >
                {repeatMode === 'track' ? <RepeatOneIcon className="w-6 h-6 sm:w-7 sm:h-7" /> : <RepeatIcon className="w-6 h-6 sm:w-7 sm:h-7" />}
            </button>
            <button onClick={onPrevious} aria-label="Previous track" className="text-slate-300 hover:text-white transition-colors p-1"><PreviousIcon className="w-7 h-7 sm:w-8 sm:h-8"/></button>
            <button onClick={onTogglePlay} aria-label={isPlaying ? 'Pause' : 'Play'} className="p-2 bg-cyan-400 text-slate-900 rounded-full hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/30">
              {isPlaying ? <PauseIcon className="w-10 h-10" /> : <PlayIcon className="w-10 h-10" />}
            </button>
            <button onClick={onNext} aria-label="Next track" className="text-slate-300 hover:text-white transition-colors p-1"><NextIcon className="w-7 h-7 sm:w-8 sm:h-8"/></button>
            <div className="w-px h-8 bg-slate-600 mx-1 hidden sm:block"></div>
            <button onClick={onClose} aria-label="Close player" className="text-slate-400 hover:text-white transition-colors p-1"><CloseIcon className="w-6 h-6"/></button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Player;