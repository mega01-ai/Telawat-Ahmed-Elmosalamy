
import React from 'react';
import { MediaItem } from '../types';
import { AudioIcon, VideoIcon, HeartIcon, PlayIcon } from './icons';

interface MediaListItemProps {
    item: MediaItem;
    onPlay: () => void;
}

const MediaListItem: React.FC<MediaListItemProps> = ({ item, onPlay }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors duration-200">
            <div className="flex items-center gap-4 min-w-0">
                <div className="text-cyan-400 flex-shrink-0">
                    {item.type === 'audio' ? <AudioIcon className="w-6 h-6"/> : <VideoIcon className="w-6 h-6"/>}
                </div>
                <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-slate-100 truncate">{item.title}</h3>
                    <p className="text-sm text-slate-400">{item.duration}</p>
                </div>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
                {item.isFavorite && <HeartIcon className="w-5 h-5 text-pink-500" />}
                <button onClick={onPlay} aria-label={`Play ${item.title}`} className="text-slate-300 hover:text-cyan-400 transition-colors">
                    <PlayIcon className="w-10 h-10"/>
                </button>
            </div>
        </div>
    );
};

export default MediaListItem;
