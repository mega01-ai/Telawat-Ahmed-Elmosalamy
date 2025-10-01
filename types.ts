
export type MediaType = 'audio' | 'video';

export interface MediaItem {
  id: number;
  title: string;
  reciter: string;
  type: MediaType;
  url: string; // Placeholder for file URL
  isFavorite: boolean;
  addedDate: string; // ISO date string
  duration: string; // e.g., "05:30"
  isDownloaded?: boolean;
}

export interface Playlist {
  id: number;
  name: string;
  itemCount: number;
  coverImageUrl: string;
}

export type View = 'MAIN' | 'LATEST' | 'FAVORITES' | 'PLAYLISTS' | 'SETTINGS' | 'DOWNLOADS' | 'PLAYLIST_DETAILS';
