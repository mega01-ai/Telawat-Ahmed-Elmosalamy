import React, { useState, useEffect, useRef } from 'react';
import { MediaItem } from '../types';
import { AudioIcon, VideoIcon, HeartIcon, HeartIconSolid, PlayIcon, DownloadIcon, CheckCircleIcon, ShareIcon } from './icons';
import { formatFullDate } from '../utils';

interface MediaListItemProps {
    item: MediaItem;
    onPlay: () => void;
    onToggleFavorite: (id: number) => void;
    onDownload: (id: number) => Promise<void>;
    onShare: (id: number) => void;
    scrollToItem?: { id: number; key: number } | null;
    onScrolled?: () => void;
}

const MediaListItem: React.FC<MediaListItemProps> = ({ item, onPlay, onToggleFavorite, onDownload, onShare, scrollToItem, onScrolled }) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollToItem?.id === item.id && itemRef.current) {
            const element = itemRef.current;
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Ensure the animation can be re-triggered by removing and re-adding the class
            element.classList.remove('highlight-animation');
            // Force a reflow to apply the class removal before re-adding it
            void element.offsetWidth;
            element.classList.add('highlight-animation');
            
            const timer = setTimeout(() => {
                element.classList.remove('highlight-animation');
            }, 2500);

            onScrolled?.();

            return () => clearTimeout(timer);
        }
    }, [scrollToItem, item.id, onScrolled]);


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
        const buttonClasses = "w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full transition-colors";
        
        if (item.type !== 'audio') {
            return <div className="w-9 h-9 flex-shrink-0" />; // Keep layout consistent
        }

        if (item.isDownloaded) {
            return (
                <div className={`${buttonClasses} text-green-400`} aria-label="تم التحميل">
                    <CheckCircleIcon className="w-5 h-5" />
                </div>
            );
        }

        if (isDownloading) {
            return (
                <div className={buttonClasses} aria-label="جاري التحميل">
                    <svg className="animate-spin h-5 w-5 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                className={`${buttonClasses} hover:bg-slate-700/70 focus:outline-none focus:ring-2 focus:ring-cyan-400`}
            >
                <DownloadIcon className="w-5 h-5 text-slate-400 group-hover:text-white" />
            </button>
        );
    };

    return (
        <div 
            ref={itemRef}
            onClick={onPlay}
            className="group flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors duration-200 cursor-pointer"
        >
            <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="text-cyan-400 flex-shrink-0">
                    {item.type === 'audio' ? <AudioIcon className="w-6 h-6" /> : <VideoIcon className="w-6 h-6" />}
                </div>
                <div className="min-w-0">
                    <h3 className="text-base font-semibold text-slate-100 truncate">{item.title}</h3>
                    <div className="flex items-baseline space-x-2 rtl:space-x-reverse text-slate-400">
                        <p className="text-xs truncate">{formatFullDate(item.addedDate)}</p>
                        <p className="text-sm font-mono">{item.duration}</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-0 flex-shrink-0 ml-2">
                <button
                    onClick={handleShareClick}
                    aria-label="مشاركة"
                    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-700/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors"
                >
                    <ShareIcon className="w-5 h-5 text-slate-400 group-hover:text-white" />
                </button>
                {renderDownloadButton()}
                <button
                    onClick={(e) => { e.stopPropagation(); onToggleFavorite(item.id); }}
                    aria-label={item.isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
                    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-700/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors"
                >
                    {item.isFavorite
                        ? <HeartIconSolid className="w-5 h-5 text-pink-500" />
                        : <HeartIcon className="w-5 h-5 text-slate-400 group-hover:text-white" />
                    }
                </button>
                <div aria-label={`تشغيل ${item.title}`} className="w-10 h-10 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 transition-colors">
                    <PlayIcon className="w-8 h-8" />
                </div>
            </div>
        </div>
    );
};

export default MediaListItem;