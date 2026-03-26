import { createSlice } from "@reduxjs/toolkit";
import type { Artist, ValidationError } from "../../../types";
import { fetchArtists } from "./artistsThunks";


interface ArtistsState {
  artists: Artist[];
  isLoading: boolean;
  error: boolean;
}

const initialState: ArtistsState = {
  artists: [],
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
  }
});

const artistsReducer = artistsSlice.reducer;
export default artistsReducer;
