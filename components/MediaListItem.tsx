import React from 'react';
import { MediaItem } from '../types';
import { AudioIcon, VideoIcon, HeartIcon, HeartIconSolid, PlayIcon } from './icons';

interface MediaListItemProps {
    item: MediaItem;
    onPlay: () => void;
    onToggleFavorite: (id: number) => void;
}

const MediaListItem: React.FC<MediaListItemProps> = ({ item, onPlay, onToggleFavorite }) => {
    return (
        <div className="group flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors duration-200">
            <div className="flex items-center gap-4 min-w-0">
                <div className="text-cyan-400 flex-shrink-0">
                    {item.type === 'audio' ? <AudioIcon className="w-6 h-6"/> : <VideoIcon className="w-6 h-6"/>}
                </div>
                <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-slate-100 truncate">{item.title}</h3>
                    <p className="text-sm text-slate-400">{item.duration}</p>
                </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                <button 
                    onClick={(e) => { e.stopPropagation(); onToggleFavorite(item.id); }} 
                    aria-label={item.isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"} 
                    className="p-2 rounded-full hover:bg-slate-700/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors"
                >
                    {item.isFavorite 
                        ? <HeartIconSolid className="w-6 h-6 text-pink-500"/> 
                        : <HeartIcon className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors"/>
                    }
                </button>
                <button onClick={onPlay} aria-label={`تشغيل ${item.title}`} className="text-slate-300 hover:text-cyan-400 transition-colors">
                    <PlayIcon className="w-10 h-10"/>
                </button>
            </div>
        </div>
    );
};

export default MediaListItem;