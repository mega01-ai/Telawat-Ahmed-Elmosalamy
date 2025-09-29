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
  {
    id: 1,
    title: 'سورة البقرة',
    reciter: 'احمد المسلمي',
    type: 'audio',
    url: 'https://server6.mp3quran.net/monshtun/002.mp3', // Example URL
    isFavorite: true,
    addedDate: '2024-07-21T10:00:00Z',
    duration: '1:45:20'
  },
  {
    id: 2,
    title: 'سورة الكهف',
    reciter: 'احمد المسلمي',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=F25h3gJ5L_s', // Example URL
    isFavorite: false,
    addedDate: '2024-07-22T11:30:00Z',
    duration: '25:10'
  },
  {
    id: 3,
    title: 'سورة الرحمن',
    reciter: 'احمد المسلمي',
    type: 'audio',
    url: 'https://server8.mp3quran.net/ahmad_huth/055.mp3', // Example URL
    isFavorite: true,
    addedDate: '2024-07-20T09:00:00Z',
    duration: '15:45'
  },
  {
    id: 4,
    title: 'سورة يوسف',
    reciter: 'احمد المسلمي',
    type: 'audio',
    url: 'https://server11.mp3quran.net/yasser/012.mp3', // Example URL
    isFavorite: false,
    addedDate: '2024-07-19T18:00:00Z',
    duration: '45:05'
  },
  {
    id: 5,
    title: 'سورة الملك',
    reciter: 'احمد المسلمي',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=nC-r4r1a5Yk', // Example URL
    isFavorite: true,
    addedDate: '2024-07-22T15:00:00Z',
    duration: '08:55'
  },
  {
    id: 7,
    title: 'تلاوة عذبة من سورة النور',
    reciter: 'احمد المسلمي',
    type: 'video',
    url: 'https://youtu.be/Ojn1hltOxYk',
    isFavorite: false,
    addedDate: '2024-07-23T10:00:00Z',
    duration: '05:29'
  },
  {
    id: 8,
    title: 'سورة ق',
    reciter: 'احمد المسلمي',
    type: 'audio',
    url: 'https://server10.mp3quran.net/ajm/050.mp3', // Replaced SoundCloud with direct MP3 link
    isFavorite: false,
    addedDate: '2024-07-24T12:00:00Z',
    duration: '04:50'
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