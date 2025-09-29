import { MediaItem, Playlist } from './types';
import { splashImage } from './images';

export const mediaItems: MediaItem[] = [
  {
    id: 9,
    title: 'تلاوة من سورة الروم',
    reciter: 'احمد المسلمي',
    type: 'audio',
    url: 'https://archive.org/download/interview-recording-14-1/Interview%20recording%2014_1.mp3',
    isFavorite: false,
    addedDate: '2024-07-25T10:00:00Z',
    duration: '01:03'
  },
];

export const playlists: Playlist[] = [
    {
        id: 1,
        name: 'تلاوات خاشعة',
        itemCount: 5,
        coverImageUrl: splashImage,
    },
    {
        id: 2,
        name: 'القرآن الكريم كاملاً',
        itemCount: 114,
        coverImageUrl: splashImage,
    },
    {
        id: 3,
        name: 'تلاوات صباحية',
        itemCount: 8,
        coverImageUrl: splashImage,
    },
    {
        id: 4,
        name: 'تلاوات مسائية',
        itemCount: 12,
        coverImageUrl: splashImage,
    }
];