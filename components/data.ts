import { MediaItem, Playlist } from '../types';
import { splashImage } from './images';

export const mediaItems: MediaItem[] = [
  {
    id: 9,
    title: 'تلاوة من سورة الروم',
    reciter: 'احمد المسلمي',
    type: 'audio',
    url: 'https://archive.org/download/interview-recording-14-1/Interview%20recording%2014_1.mp3',
    isFavorite: false,
    addedDate: new Date().toISOString(),
    duration: '01:03'
  },
];

export const playlists: Playlist[] = [
    {
        id: 1,
        name: 'تلاوات خاشعة',
        itemCount: 0,
        coverImageUrl: splashImage,
    },
    {
        id: 2,
        name: 'القرآن الكريم كاملاً',
        itemCount: 0,
        coverImageUrl: splashImage,
    },
    {
        id: 3,
        name: 'تلاوات صباحية',
        itemCount: 0,
        coverImageUrl: splashImage,
    },
    {
        id: 4,
        name: 'تلاوات مسائية',
        itemCount: 0,
        coverImageUrl: splashImage,
    }
];
