import type { RootState } from "../../../app/store";

export const selectArtists = (state: RootState) => state.artists.artists;
export const selectOneArtist = (state: RootState) => state.artists.artist;
export const selectIsLoading = (state: RootState) => state.artists.isLoading;
export const selectIsError = (state: RootState) => state.artists.error;
export const selectCreateLoading = (state: RootState) =>
  state.artists.createLoading;
export const selectCreateError = (state: RootState) =>
  state.artists.createError;