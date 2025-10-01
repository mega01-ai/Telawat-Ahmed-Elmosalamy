

import React from 'react';
import { playlists } from './data';
import { BackIcon } from './icons';
import type { Playlist } from '../types';

interface PlaylistsScreenProps {
  onBack: () => void;
}

const PlaylistCard: React.FC<{ playlist: Playlist }> = ({ playlist }) => (
    <div className="group cursor-pointer">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-slate-800">
            <img src={playlist.coverImageUrl} alt={playlist.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <h3 className="mt-2 text-lg font-semibold text-slate-100">{playlist.name}</h3>
        <p className="text-sm text-slate-400">{playlist.itemCount} مقطعًا</p>
    </div>
);


const PlaylistsScreen: React.FC<PlaylistsScreenProps> = ({ onBack }) => {
  return (
    <div className="animate-fade-in">
      <header className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-700 transition-colors">
          <BackIcon className="w-8 h-8 text-cyan-400" />
        </button>
        <h2 className="text-3xl font-bold text-center flex-grow text-cyan-400 pr-10">القوائم</h2>
      </header>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {playlists.map(playlist => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
};

export default PlaylistsScreen;