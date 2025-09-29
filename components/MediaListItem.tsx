import React, { useState } from 'react';
import { MediaItem } from '../types';
import { AudioIcon, VideoIcon, HeartIcon, HeartIconSolid, PlayIcon, DownloadIcon, CheckCircleIcon, ShareIcon } from './icons';

interface MediaListItemProps {
    item: MediaItem;
    onPlay: () => void;
    onToggleFavorite: (id: number) => void;
    onDownload: (id: number) => Promise<void>;
    onShare: (id: number) => void;
}

const MediaListItem: React.FC<MediaListItemProps> = ({ item, onPlay, onToggleFavorite, onDownload, onShare }) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isDownloading || item.isDownloaded) return;

        setIsDownloading(true);
        try {
            await onDownload(item.id);
            // The isDownloaded prop will update on success, no need to set isDownloading to false here
        } catch (error) {
            console.error("Download failed in component", error);
            setIsDownloading(false); // Reset on failure
        }
    };

    const handleShareClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onShare(item.id);
    };

    const renderDownloadButton = () => {
        if (item.type !== 'audio') {
            return <div className="w-10 h-10 flex-shrink-0" />; // Keep layout consistent
        }

        if (item.isDownloaded) {
            return (
                <div className="p-2 flex items-center gap-1 text-green-400" aria-label="تم التحميل">
                    <CheckCircleIcon className="w-6 h-6" />
                </div>
            );
        }

        if (isDownloading) {
            return (
                <div className="p-2" aria-label="جاري التحميل">
                    <svg className="animate-spin h-6 w-6 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            );
        }

        return (
            <button
                onClick={handleDownloadClick}
                aria-label="تحميل"
                className="p-2 rounded-full hover:bg-slate-700/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors"
            >
                <DownloadIcon className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
            </button>
        );
    };

    return (
        <div className="group flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors duration-200">
            <div className="flex items-center gap-4 min-w-0">
                <div className="text-cyan-400 flex-shrink-0">
                    {item.type === 'audio' ? <AudioIcon className="w-6 h-6" /> : <VideoIcon className="w-6 h-6" />}
                </div>
                <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-slate-100 truncate">{item.title}</h3>
                    <p className="text-sm text-slate-400">{item.duration}</p>
                </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <button
                    onClick={handleShareClick}
                    aria-label="مشاركة"
                    className="p-2 rounded-full hover:bg-slate-700/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors"
                >
                    <ShareIcon className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
                </button>
                {renderDownloadButton()}
                <button
                    onClick={(e) => { e.stopPropagation(); onToggleFavorite(item.id); }}
                    aria-label={item.isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
                    className="p-2 rounded-full hover:bg-slate-700/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors"
                >
                    {item.isFavorite
                        ? <HeartIconSolid className="w-6 h-6 text-pink-500" />
                        : <HeartIcon className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
                    }
                </button>
                <button onClick={onPlay} aria-label={`تشغيل ${item.title}`} className="text-slate-300 hover:text-cyan-400 transition-colors">
                    <PlayIcon className="w-10 h-10" />
                </button>
            </div>
        </div>
    );
};

export default MediaListItem;