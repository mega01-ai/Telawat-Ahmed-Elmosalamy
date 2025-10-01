
import React from 'react';
import { CloudOffIcon, DownloadCloudIcon } from './icons';

interface OfflineIndicatorProps {
  isOnline: boolean;
  hasDownloads: boolean;
  onNavigate: () => void;
}

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ isOnline, hasDownloads, onNavigate }) => {
  if (isOnline) {
    return null;
  }

  if (hasDownloads) {
    return (
      <button 
        onClick={onNavigate}
        className={`fixed top-4 right-4 z-50 flex items-center gap-2 bg-cyan-500/90 text-white font-bold px-4 py-2 rounded-full shadow-lg animate-fade-in cursor-pointer hover:bg-cyan-500 transition-colors`}
        role="status"
        aria-live="polite"
        aria-label="أنت غير متصل بالإنترنت. اضغط لعرض التلاوات المحملة."
      >
        <DownloadCloudIcon className="w-5 h-5" /> 
        <span>التلاوات المحملة متاحة</span>
      </button>
    );
  }

  return (
    <div 
      className={`fixed top-4 right-4 z-50 flex items-center gap-2 bg-yellow-500/90 text-slate-900 font-bold px-4 py-2 rounded-full shadow-lg animate-fade-in`}
      role="status"
      aria-live="polite"
    >
      <CloudOffIcon className="w-5 h-5" />
      <span>أنت غير متصل</span>
    </div>
  );
};

export default OfflineIndicator;