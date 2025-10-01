
import React from 'react';
import { CloseIcon, DownloadIcon } from './icons';
import { splashImage } from './images';

interface InstallPromptProps {
    onInstall: () => void;
    onDismiss: () => void;
    bottomOffset: number;
}

const InstallPrompt: React.FC<InstallPromptProps> = ({ onInstall, onDismiss, bottomOffset }) => {
    return (
        <div 
            className="fixed left-1/2 -translate-x-1/2 w-11/12 max-w-md z-30 animate-slide-up-fade-in transition-transform duration-400 ease-out"
            style={{ bottom: `${bottomOffset + 8}px` }} // +8px for margin above the player/social links
            role="dialog"
            aria-labelledby="install-heading"
            aria-describedby="install-description"
        >
            <div className="bg-slate-700/80 backdrop-blur-md text-white rounded-xl shadow-2xl p-4 flex items-center gap-4 border border-slate-600">
                <div className="flex-shrink-0">
                    <img src={splashImage} alt="App Icon" className="w-14 h-14 rounded-lg object-cover" style={{objectPosition: '50% 15%'}} />
                </div>
                <div className="flex-grow">
                    <h4 id="install-heading" className="font-bold">ثبّت التطبيق</h4>
                    <p id="install-description" className="text-sm text-slate-300">أضف التطبيق لشاشتك الرئيسية للوصول السريع.</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                    <button 
                        onClick={onInstall}
                        className="bg-cyan-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-cyan-400 transition-colors text-sm flex items-center gap-2"
                        aria-label="تثبيت التطبيق"
                    >
                        <DownloadIcon className="w-5 h-5" />
                        <span>تثبيت</span>
                    </button>
                    <button
                        onClick={onDismiss}
                        aria-label="رفض التثبيت"
                        className="p-2 text-slate-400 hover:text-white"
                    >
                        <CloseIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InstallPrompt;