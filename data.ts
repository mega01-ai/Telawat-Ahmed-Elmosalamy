
import { MediaItem, Playlist } from './types';

export const mediaItems: MediaItem[] = [
  {
    id: 1,
    title: 'سورة البقرة',
    reciter: 'احمد المسلمي',
    type: 'audio',
    url: '#',
    isFavorite: true,
    addedDate: '2024-07-21T10:00:00Z',
    duration: '1:45:20'
  },
  {
    id: 2,
    title: 'سورة الكهف',
    reciter: 'احمد المسلمي',
    type: 'video',
    url: '#',
    isFavorite: false,
    addedDate: '2024-07-22T11:30:00Z',
    duration: '25:10'
  },
  {
    id: 3,
    title: 'سورة الرحمن',
    reciter: 'احمد المسلمي',
    type: 'audio',
    url: '#',
    isFavorite: true,
    addedDate: '2024-07-20T09:00:00Z',
    duration: '15:45'
  },
  {
    id: 4,
    title: 'سورة يوسف',
    reciter: 'احمد المسلمي',
    type: 'audio',
    url: '#',
    isFavorite: false,
    addedDate: '2024-07-19T18:00:00Z',
    duration: '45:05'
  },
  {
    id: 5,
    title: 'سورة الملك',
    reciter: 'احمد المسلمي',
    type: 'video',
    url: '#',
    isFavorite: true,
    addedDate: '2024-07-22T15:00:00Z',
    duration: '08:55'
  },
  {
    id: 6,
    title: 'آيات السكينة',
    reciter: 'احمد المسلمي',
    type: 'audio',
    url: '#',
    isFavorite: false,
    addedDate: '2024-07-18T12:00:00Z',
    duration: '12:30'
  },
];

export const playlists: Playlist[] = [
    {
        id: 1,
        name: 'تلاوات خاشعة',
        itemCount: 5,
        coverImageUrl: 'https://picsum.photos/seed/playlist1/400/400',
    },
    {
        id: 2,
        name: 'القرآن الكريم كاملاً',
        itemCount: 114,
        coverImageUrl: 'https://picsum.photos/seed/playlist2/400/400',
    },
    {
        id: 3,
        name: 'تلاوات صباحية',
        itemCount: 8,
        coverImageUrl: 'https://picsum.photos/seed/playlist3/400/400',
    },
    {
        id: 4,
        name: 'تلاوات مسائية',
        itemCount: 12,
        coverImageUrl: 'https://picsum.photos/seed/playlist4/400/400',
    }
];
