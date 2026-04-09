export interface AuthResponse {
  user: User;
  message: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface GlobalError {
  error: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface Artist {
  _id: string;
  name: string;
  image: File | null;
  description: string | null;
}


export interface ArtistOnlyName {
  _id: string;
  name: string;
}

export interface ArtistMutatiion {
  name: string;
  image: File | null;
  description: string | null;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface Album {
  _id: string;
  title: string;
  artist: string;
  trecksCount: number;
  image: string | null;
  year_manufacture: number;
}

export interface AlbumWithArtist {
  _id: string;
  title: string;
  artist: ArtistOnlyName;
}

export interface AlbumMutation {
  title: string;
  artist: string;
  image: File | null;
  year_manufacture: number;
}

export interface Treck {
  _id: string;
  title: string;
  album: Album;
  number_in_album: number;
  duration: string;
}

export interface TreckLite {
  _id: string;
  title: string;
  album: string;
  duration: string;
}

export interface TreckMutation {
  title: string;
  album: string;
  number_in_album: number;
  duration: string;
}

export interface TreckHistory {
  _id: string;
  user_id: string;
  treck_id: TreckLite;
  datetime: string;
}

export interface TrecksHistoryResponse {
  trecks_history: TreckHistory[];
  albums: AlbumWithArtist[];
}