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

export const PlaylistIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

export const BackIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l-8 4 8 4V8z" transform="rotate(180 12 12)"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 4l-5 8 5 8" transform="rotate(180 12 12)" />
    </svg>
);

export const AudioIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.858 5.858a15 15 0 012.828 0m9.9 9.9a15 15 0 01-2.828 0M12 6v12" />
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

export const FacebookIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
);

export const TikTokIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.46-2.9-1.63-1.95-2.28-4.42-2.06-6.83.22-2.4 1.12-4.71 2.59-6.45 1.47-1.74 3.3-2.91 5.3-3.5.04 2.02.01 4.04.01 6.06-.39.29-.72.63-1.02 1.01-.19.24-.39.46-.6.65-.24 1.17-.59 2.3-.96 3.42-1.05-1.01-2.18-1.87-3.21-2.85-.22-2.07-.15-4.15.21-6.22.42-2.41 1.63-4.63 3.5-6.21 1.52-1.28 3.28-2.11 5.1-2.32Z"/>
    </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163m0-2.163C8.74 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.74 24 12 24s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98C23.986 15.667 24 15.26 24 12s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.26 0 12 0Z"/>
        <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324Zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"/>
        <path d="M18.402 4.158a1.44 1.44 0 1 1 2.88 0 1.44 1.44 0 0 1-2.88 0Z"/>
    </svg>
);

export const WhatsAppIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.38 4.91a9.88 9.88 0 0 0-14.2 13.9l.13.22-1.3 4.74 4.86-1.28.2.12a9.88 9.88 0 0 0 15.2-7.14c0-2.7-1.1-5.18-2.88-6.96zM12.02 21.6c-1.8 0-3.56-.5-5.1-1.48l-.36-.21-3.8 1 1.02-3.72-.23-.38a7.92 7.92 0 0 1-1.2-8.24c1.6-2.8 4.6-4.6 7.9-4.6s6.3 1.8 7.88 4.58a7.92 7.92 0 0 1-1.2 8.24 7.9 7.9 0 0 1-6.68 2.82zm4.5-6.5c-.24-.12-1.44-.7-1.67-.78-.22-.08-.38-.12-.54.12-.16.24-.63.78-.77.94-.14.16-.28.18-.52.06-.24-.12-1-.37-1.92-1.18-.7-.64-1.18-1.44-1.32-1.68-.14-.24-.01-.37.1-.48.1-.1.23-.26.34-.38.1-.12.16-.2.23-.34.08-.14.04-.26-.02-.38-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.4-.54-.4h-.5c-.16 0-.42.04-.64.24-.22.2-.85.83-.85 2.03s.87 2.35 1 2.5c.12.16 1.7 2.6 4.13 3.6.58.25 1.04.4 1.4.52.56.17 1.07.15 1.47.1.44-.06 1.44-.6 1.64-1.17.2-.58.2-1.08.14-1.18-.05-.1-.2-.15-.43-.27z"/>
    </svg>
);
