
import React from 'react';
import { mediaItems } from '../data';
import MediaListItem from './MediaListItem';
import { BackIcon } from './icons';

interface LatestAdditionsScreenProps {
  onBack: () => void;
}

const LatestAdditionsScreen: React.FC<LatestAdditionsScreenProps> = ({ onBack }) => {
  const sortedItems = [...mediaItems].sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());

  return (
    <div className="animate-fade-in">
      <header className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-700 transition-colors">
          <BackIcon className="w-8 h-8 text-cyan-400" />
        </button>
        <h2 className="text-3xl font-bold text-center flex-grow text-cyan-400 pr-10">آخر الإضافات</h2>
      </header>
      <div className="space-y-4">
        {sortedItems.map(item => <MediaListItem key={item.id} item={item} />)}
      </div>
    </div>
  );
};

export default LatestAdditionsScreen;
