import { MediaItem, Playlist } from '../types';
import { splashImage } from './images';

export const mediaItems: MediaItem[] = [
  {
    id: 10,
    title: 'من سورة الروم -عشاء',
    reciter: 'احمد المسلمي',
    type: 'audio',
    url: 'https://archive.org/download/interview-recording-62-1/Interview%20recording%2062_1.mp3',
    isFavorite: false,
    addedDate: new Date().toISOString(),
    duration: '05:29'
  },
  {
    id: 9,
    title: 'تلاوة من سورة الروم',
    reciter: 'احمد المسلمي',
    type: 'audio',
    url: 'https://archive.org/download/interview-recording-14-1/Interview%20recording%2014_1.mp3',
    isFavorite: false,
    addedDate: '2024-05-20T18:00:00.000Z',
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
];