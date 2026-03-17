export interface Artist {
    _id: string;
    name: string;
    image: string | null;
    descrition: string | null
};

export interface ArtistMutatiion {
    name: string;
    image: string | null;
    descrition: string | null
};