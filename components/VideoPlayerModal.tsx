
import React from 'react';
import { MediaItem } from '../types';
import { CloseIcon } from './icons';

interface VideoPlayerModalProps {
  item: MediaItem;
  onClose: () => void;
}

function getYouTubeEmbedUrl(url: string): string | null {
  let videoId = null;
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      videoId = urlObj.pathname.slice(1);
    } else if (urlObj.hostname.includes('youtube.com')) {
      videoId = urlObj.searchParams.get('v');
    }
  } catch (e) {
    console.error("Invalid URL for YouTube embed:", e);
    return null;
  }

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  }
  return null;
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ item, onClose }) => {
  const embedUrl = getYouTubeEmbedUrl(item.url);

  if (!embedUrl) {
    // Ideally show an error message to the user
    console.error(`Could not generate embed URL for ${item.url}`);
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-player-title"
    >
      <div 
        className="relative bg-slate-900 rounded-lg shadow-2xl w-11/12 max-w-4xl animate-slide-up-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
            <h3 id="video-player-title" className="text-xl font-bold text-cyan-400">{item.title}</h3>
            <button onClick={onClose} aria-label="Close video player" className="text-slate-400 hover:text-white transition-colors">
                <CloseIcon className="w-8 h-8"/>
            </button>
        </div>
        <div className="aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={embedUrl}
            title={item.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerModal;
