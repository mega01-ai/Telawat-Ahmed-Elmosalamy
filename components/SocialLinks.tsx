
import React from 'react';
import { FacebookIcon, TikTokIcon, InstagramIcon, TelegramIcon, XIcon } from './icons';

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/ahmedelmosalamy10',
    icon: (props: any) => <FacebookIcon {...props} />,
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@a.elmosalamy',
    icon: (props: any) => <TikTokIcon {...props} />,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/a_elmosalamy',
    icon: (props: any) => <InstagramIcon {...props} />,
  },
  {
    name: 'X',
    href: 'https://x.com/a_elmosalamy',
    icon: (props: any) => <XIcon {...props} />,
  },
  {
    name: 'Telegram',
    href: 'https://t.me/telawatelmosalamy',
    icon: (props: any) => <TelegramIcon {...props} />,
  },
];

interface SocialLinksProps {
    isPlayerActive: boolean;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ isPlayerActive }) => {
  const containerClasses = `
    flex justify-center items-center gap-6 
    bg-slate-800/70 backdrop-blur-sm 
    border-t border-slate-700/50 
    transition-all duration-300 ease-in-out
    ${isPlayerActive ? 'p-2' : 'p-3'}
  `;
  
  const iconClasses = `
    transition-all duration-300 ease-in-out
    ${isPlayerActive ? 'w-6 h-6' : 'w-7 h-7'}
  `;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 animate-fade-in">
        <div className={containerClasses}>
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <item.icon className={iconClasses} />
            </a>
          ))}
        </div>
    </footer>
  );
};

export default SocialLinks;
