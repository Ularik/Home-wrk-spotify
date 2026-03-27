import type { RootState } from "../../../app/store";

export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectAlbumWithArtist = (state: RootState) => state.albums.albumWithArtist;
export const selectIsAlbumLoading = (state: RootState) => state.artists.isLoading;
export const selectIsAlbumError = (state: RootState) => state.artists.error;