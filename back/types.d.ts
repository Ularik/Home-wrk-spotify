export interface Artist {
  _id: string;
  name: string;
  image: string | null;
  descrition: string | null;
}

export interface ArtistMutatiion {
  name: string;
  image: string | null;
  descrition: string | null;
}

export interface Album {
    _id: string;
  title: string;
  artist: Artist;
  image: string | null;
}

export interface AlbumMutation {
  title: string;
  artist: string;
  image: string | null;
}