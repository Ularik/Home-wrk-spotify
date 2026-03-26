import { createSlice } from "@reduxjs/toolkit";
import type { Artist, ValidationError } from "../../../types";
import { fetchArtists, fetchArtistById } from "./artistsThunks";


interface ArtistsState {
  artists: Artist[];
  artist: Artist | null;
  isLoading: boolean;
  error: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  artist: null,
  isLoading: false,
  error: false
};

export const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(fetchArtists.fulfilled, (state, { payload: artists }) => {
      state.artists = artists;
      state.isLoading = false;
    });
    builder.addCase(
      fetchArtists.rejected,
      (state) => {
        state.isLoading = false;
        state.error = true;
      },
    );
    builder.addCase(fetchArtistById.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(
      fetchArtistById.fulfilled,
      (state, { payload: artist }) => {
        state.artist = artist;
        state.isLoading = false;
      },
    );
    builder.addCase(fetchArtistById.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  }
});

const artistsReducer = artistsSlice.reducer;
export default artistsReducer;
