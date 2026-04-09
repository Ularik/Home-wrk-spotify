import { createSlice } from "@reduxjs/toolkit";
import type { Artist, GlobalError, ValidationError } from "../../../types";
import { fetchArtists, fetchArtistById, createArtist } from "./artistsThunks";

interface ArtistsState {
  artists: Artist[];
  artist: Artist | null;
  isLoading: boolean;
  error: GlobalError | null;
  createLoading: boolean;
  createError: ValidationError | null;
}

const initialState: ArtistsState = {
  artists: [],
  artist: null,
  isLoading: false,
  error: null,
  createLoading: false,
  createError: null,
};

export const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchArtists.fulfilled, (state, { payload: artists }) => {
      state.artists = artists;
      state.isLoading = false;
    });
    builder.addCase(fetchArtists.rejected, (state, { payload: error }) => {
      state.isLoading = false;
      state.error = error || null;
    });
    builder.addCase(fetchArtistById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchArtistById.fulfilled, (state, { payload: artist }) => {
      state.artist = artist;
      state.isLoading = false;
    });
    builder.addCase(fetchArtistById.rejected, (state, { payload: error }) => {
      state.isLoading = false;
      state.error = error || null;
    });

    builder.addCase(createArtist.pending, (state) => {
      state.createLoading = true;
      state.createError = null;
    });
    builder.addCase(createArtist.fulfilled, (state, { payload: artist }) => {
      state.artist = artist;
      state.createLoading = false;
    });
    builder.addCase(createArtist.rejected, (state, { payload: error }) => {
      state.createLoading = false;
      state.createError = error || null;
    });
  },
});

const artistsReducer = artistsSlice.reducer;
export default artistsReducer;
