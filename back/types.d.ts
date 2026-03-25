export interface Artist {
  _id: string;
  name: string;
  image: string | null;
  description: string | null;
}

export interface ArtistMutatiion {
  name: string;
  image: string | null;
  description: string | null;
}

export interface Album {
  _id: string;
  title: string;
  artist: Artist;
  image: string | null;
  year_manufacture: Number;
}

export interface AlbumMutation {
  title: string;
  artist: string;
  image: string | null;
  year_manufacture: Number;
}

export interface Track {
  _id: string;
  title: string;
  album: Album;
  duration: string;
}

export interface TrackMutation {
  title: string;
  album: string;
  duration: string;
}