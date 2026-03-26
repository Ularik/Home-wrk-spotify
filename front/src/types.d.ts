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
  image: string | null;
  year_manufacture: Number;
}

export interface AlbumMutation {
  title: string;
  artist: string;
  image: string | null;
  year_manufacture: Number;
}

export interface Treck {
  _id: string;
  title: string;
  album: Album;
  number_in_album: Number;
  duration: string;
}

export interface TreckMutation {
  title: string;
  album: string;
  number_in_album: Number;
  duration: string;
}
