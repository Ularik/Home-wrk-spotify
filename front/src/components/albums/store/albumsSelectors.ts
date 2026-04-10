import type { RootState } from "../../../app/store";

export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectAlbumWithArtist = (state: RootState) =>
  state.albums.albumWithArtist;
export const selectIsAlbumLoading = (state: RootState) =>
  state.albums.fetchLoading;
export const selectIsAlbumError = (state: RootState) => state.albums.fetchError;

export const selectIsAlbumCreateLoading = (state: RootState) =>
  state.albums.createLoading;
export const selectIsAlbumCreateError = (state: RootState) =>
  state.albums.createError;

export const selectPublicateAlbumLoading = (state: RootState) =>
  state.albums.publicateLoading;
export const selectPublicateAlbumError = (state: RootState) =>
  state.albums.publicateError;

export const selectDeleteAlbumLoading = (state: RootState) =>
  state.albums.deleteLoading;
export const selectDeleteAlbumError = (state: RootState) =>
  state.albums.deleteError;