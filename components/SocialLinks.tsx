import React from 'react';
import { FacebookIcon, TikTokIcon, InstagramIcon, WhatsAppIcon, XIcon } from './icons';

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
    name: 'WhatsApp',
    href: 'https://wa.me/', // A specific number can be added after the slash.
    icon: (props: any) => <WhatsAppIcon {...props} />,
  },
];

const SocialLinks: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 animate-fade-in">
        <div className="flex justify-center items-center gap-6 p-3 bg-slate-800/70 backdrop-blur-sm border-t border-slate-700/50">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <item.icon className="w-7 h-7" />
            </a>
          ))}
        </div>
    </footer>
  );
};

export default SocialLinks;