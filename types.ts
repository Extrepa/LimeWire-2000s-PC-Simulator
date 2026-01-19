export enum Tab {
  SEARCH = 'SEARCH',
  MONITOR = 'MONITOR',
  LIBRARY = 'LIBRARY',
  CHAT = 'CHAT',
  CONNECTIONS = 'CONNECTIONS',
}

export type LimeWireSkin = 'lime' | 'cobalt' | 'stealth';

export interface SearchResult {
  id: string;
  filename: string;
  size: string;
  type: string;
  bitrate: string;
  speed: string; // T1, T3, Cable
  artist: string;
  album: string;
  quality: number; // 1-5 stars
  isPro?: boolean;
}

export enum DownloadStatus {
  PENDING = 'Pending',
  CONNECTING = 'Connecting...',
  DOWNLOADING = 'Downloading',
  COMPLETE = 'Complete',
  FAILED = 'Failed'
}

export interface DownloadItem {
  id: string;
  file: SearchResult;
  progress: number; // 0-100
  status: DownloadStatus;
  speed: string; // e.g. "45 KB/s"
  timeLeft: string;
}

export interface LibraryItem extends SearchResult {
  dateAdded: number;
  audioUrl?: string;
}

export interface ChatMessage {
  id: string;
  user: string;
  text: string;
  timestamp: number;
  isSystem?: boolean;
}

export interface ConnectionItem {
  host: string;
  status: string;
  uptime: string;
  agent: string;
  isUltrapeer: boolean;
}