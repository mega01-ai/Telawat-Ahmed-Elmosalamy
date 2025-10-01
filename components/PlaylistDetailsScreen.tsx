
import React from 'react';
import MediaListItem from './MediaListItem';
import { BackIcon } from './icons';
import { MediaItem, Playlist } from '../types';

interface PlaylistDetailsScreenProps {
  playlist: Playlist;
  items: MediaItem[];
  onBack: () => void;
  onPlay: (item: MediaItem, playlist: MediaItem[]) => void;
  onToggleFavorite: (id: number) => void;
  onDownload: (id: number) => Promise<void>;
  onShare: (id: number) => void;
}

const PlaylistDetailsScreen: React.FC<PlaylistDetailsScreenProps> = ({ playlist, items, onBack, onPlay, onToggleFavorite, onDownload, onShare }) => {

  return (
    <div className="animate-fade-in">
      <header className="flex items-center mb-6">
        <button onClick={onBack} aria-label="Go back" className="p-2 rounded-full hover:bg-slate-700 transition-colors">
          <BackIcon className="w-8 h-8 text-cyan-400" />
        </button>
        <h2 className="text-3xl font-bold text-center flex-grow text-cyan-400 pr-10">{playlist.name}</h2>
      </header>
      <div className="space-y-4">
        {items.length > 0 ? (
          items.map(item => <MediaListItem key={item.id} item={item} onPlay={() => onPlay(item, items)} onToggleFavorite={onToggleFavorite} onDownload={onDownload} onShare={onShare} />)
        ) : (
          <p className="text-center text-slate-400 mt-8">لا توجد مقاطع في هذه القائمة بعد.</p>
        )}
      </div>
    </div>
  );
};

export default PlaylistDetailsScreen;
