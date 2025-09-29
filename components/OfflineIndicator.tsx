import React from 'react';
import { CloudOffIcon, DownloadCloudIcon } from './icons';

interface OfflineIndicatorProps {
  isOnline: boolean;
  hasDownloads: boolean;
}

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ isOnline, hasDownloads }) => {
  if (isOnline) {
    return null;
  }

  const message = hasDownloads 
    ? "تلاواتك المحملة متاحة"
    : "أنت غير متصل";

  const icon = hasDownloads 
    ? <DownloadCloudIcon className="w-5 h-5" /> 
    : <CloudOffIcon className="w-5 h-5" />;
  
  const bgColor = hasDownloads ? 'bg-cyan-500/90' : 'bg-yellow-500/90';
  const textColor = hasDownloads ? 'text-white' : 'text-slate-900';

  return (
    <div 
      className={`fixed top-4 right-4 z-50 flex items-center gap-2 ${bgColor} ${textColor} font-bold px-4 py-2 rounded-full shadow-lg animate-fade-in`}
      role="status"
      aria-live="polite"
    >
      {icon}
      <span>{message}</span>
    </div>
  );
};

export default OfflineIndicator;