export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  thumbnail: string;
  musicUrl: string;
  album?: string;
  year?: number;
} 