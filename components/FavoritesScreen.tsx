
import React from 'react';
import { mediaItems } from '../data';
import MediaListItem from './MediaListItem';
import { BackIcon } from './icons';
import { MediaItem } from '../types';

interface FavoritesScreenProps {
  onBack: () => void;
  onPlay: (item: MediaItem, playlist: MediaItem[]) => void;
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ onBack, onPlay }) => {
  const favoriteItems = mediaItems.filter(item => item.isFavorite);

  return (
    <div className="animate-fade-in">
      <header className="flex items-center mb-6">
        <button onClick={onBack} aria-label="Go back" className="p-2 rounded-full hover:bg-slate-700 transition-colors">
          <BackIcon className="w-8 h-8 text-cyan-400" />
        </button>
        <h2 className="text-3xl font-bold text-center flex-grow text-cyan-400 pr-10">المفضلة</h2>
      </header>
      <div className="space-y-4">
        {favoriteItems.length > 0 ? (
          favoriteItems.map(item => <MediaListItem key={item.id} item={item} onPlay={() => onPlay(item, favoriteItems)} />)
        ) : (
          <p className="text-center text-slate-400 mt-8">لا توجد عناصر في المفضلة بعد.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesScreen;
