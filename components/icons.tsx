import React from 'react';

interface IconProps {
  className?: string;
}

export const ClockIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const HeartIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
  </svg>
);

export const HeartIconSolid: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);

export const PlaylistIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

export const BackIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

export const AudioIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
    </svg>
);

export const VideoIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

export const PlayIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
  </svg>
);

export const PauseIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h1a1 1 0 001-1V8a1 1 0 00-1-1H8zm3 0a1 1 0 00-1 1v4a1 1 0 001 1h1a1 1 0 001-1V8a1 1 0 00-1-1h-1z" clipRule="evenodd" />
  </svg>
);

export const PreviousIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
     <path d="M8.445 14.832A1 1 0 0010 14V6a1 1 0 00-1.555-.832l-3 4a1 1 0 000 1.664l3 4z" />
     <path d="M13.445 14.832A1 1 0 0015 14V6a1 1 0 00-1.555-.832l-3 4a1 1 0 000 1.664l3 4z" />
  </svg>
);

export const NextIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
     <path d="M11.555 5.168A1 1 0 0010 6v8a1 1 0 001.555.832l3-4a1 1 0 000-1.664l-3-4z" />
     <path d="M6.555 5.168A1 1 0 005 6v8a1 1 0 001.555.832l3-4a1 1 0 000-1.664l-3-4z" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const DownloadIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

export const DownloadCloudIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
    </svg>
);

export const CloudOffIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3"/>
        <line x1="1" x2="23" y1="1" y2="23"/>
    </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

export const ShareIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
);

export const AndroidIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8H8a2 2 0 0 0-2 2v5h2v-3h6v3h2v-5a2 2 0 0 0-2-2m-3 1.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m2 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M8.3 4.5l-.6 1.2-1.2.6.6 1.2 1.2.6-.6-1.2-1.2-.6m8 0l-1.2.6.6 1.2 1.2.6-.6-1.2-1.2-.6.6-1.2 1.2-.6M19 17v-1a1 1 0 0 0-1-1h-2v4h2a1 1 0 0 0 1-1v-1h-1v-1zm-1-2h-1v2h1zM8 17H5v-4h3v1H6v2h2v1H6v-1h2zM3 15h1v4H3z" />
    </svg>
);

export const AppleIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.1 17.5c-.3 1.2-1 2.4-2.2 3.3-1.2 1-2.6.9-3.3.9s-1.8-.4-3.1-1.3c-1.3-.9-2.3-2.5-2.8-4.2H12c1.3 0 1.9-.8 1.9-1.9s-.6-1.9-1.9-1.9h-4c1.1-2.4 2.8-3.9 5-3.9 1.1 0 2.2.5 3.1 1.4.3.3.6.3.9 0l1.2-1.2c.3-.3.3-.6 0-.9C19.1 6.5 17.3 5 15 5c-2.9 0-5.2 2.2-6.3 5.3h-.1c-1.4 0-2.8 1-3.3 2.5s.1 3.2 1.3 4.2c1.2 1 2.5 1.4 3.6 1.4s1.7-.3 2.9-1.1c1.2-.8 2-2.1 2.2-3.3h-4.3c-1.3 0-1.9-.8-1.9-1.9s.6-1.9 1.9-1.9h7.4c-1.3 0-1.9.8-1.9 1.9s.6 1.9 1.9 1.9h.1zm-7.6-13c.9-.9 1.6-2.5 1.5-3.5-.8 0-2 .7-2.9 1.6s-1.6 2.5-1.5 3.5c.9 0 2-.6 2.9-1.6z" />
    </svg>
);

export const FacebookIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
);

export const TikTokIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/>
    </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2.25c-2.43 0-2.73.01-3.7.05-1.4.06-2.38.31-3.23.65-.88.35-1.58.8-2.24 1.45-.66.66-1.1 1.36-1.45 2.24-.34.85-.59 1.83-.65 3.23-.04.97-.05 1.27-.05 3.7s.01 2.73.05 3.7c.06 1.4.31 2.38.65 3.23.35.88.8 1.58 1.45 2.24.66.66 1.36 1.1 2.24 1.45.85.34 1.83.59 3.23.65.97.04 1.27.05 3.7.05s2.73-.01 3.7-.05c1.4-.06 2.38-.31 3.23-.65.88-.35 1.58-.8 2.24-1.45.66-.66 1.1-1.36 1.45-2.24.34-.85.59-1.83.65-3.23.04-.97.05-1.27.05-3.7s-.01-2.73-.05-3.7c-.06-1.4-.31-2.38-.65-3.23-.35-.88-.8-1.58-1.45-2.24-.66-.66-1.36-1.1-2.24-1.45-.85-.34-1.83-.59-3.23-.65C14.73 2.26 14.43 2.25 12 2.25zm0 1.5c2.4 0 2.68.01 3.63.05.85.04 1.45.2 1.86.36.48.2.85.45 1.22.82.37.37.62.74.82 1.22.17.41.32 1.01.36 1.86.04.95.05 1.23.05 3.63s-.01 2.68-.05 3.63c-.04.85-.2 1.45-.36 1.86-.2.48-.45.85-.82 1.22-.37.37-.74.62-1.22.82-.41.17-1.01.32-1.86.36-.95.04-1.23.05-3.63.05s-2.68-.01-3.63-.05c-.85-.04-1.45-.2-1.86-.36-.48-.2-.85-.45-1.22-.82-.37-.37-.62-.74-.82-1.22-.17-.41-.32-1.01-.36-1.86-.04-.95-.05-1.23-.05-3.63s.01-2.68.05-3.63c.04-.85.2-1.45.36-1.86.2-.48.45.85.82-1.22.37-.37.74-.62 1.22-.82.41-.17-1.01-.32-1.86-.36.95-.04 1.23-.05 3.63-.05zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8.25a3.25 3.25 0 110-6.5 3.25 3.25 0 010 6.5zm4.88-8.22a1.12 1.12 0 100-2.24 1.12 1.12 0 000 2.24z" clipRule="evenodd" /></svg>
);

export const TelegramIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="m9.417 15.181-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931L23.456 6.35c.272-1.21-.434-1.745-1.227-1.464L1.319 9.388c-1.21.464-1.21 1.173 0 1.543l5.073 1.588 11.794-7.451c.568-.355.931-.162.537.162l-9.662 8.619Z"/></svg>
);

export const XIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.602.75zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633z"/></svg>
);