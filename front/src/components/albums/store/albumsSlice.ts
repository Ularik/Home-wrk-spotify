import { createSlice } from "@reduxjs/toolkit";
import type { Album } from "../../../types";
import { fetchAlbums } from "./albumsThunks";

interface AlbumsState {
  albums: Album[];
  isLoading: boolean;
  error: boolean;
}

const initialState: AlbumsState = {
  albums: [],
  isLoading: false,
  error: false,
};

export const albumsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(fetchAlbums.fulfilled, (state, { payload: artists }) => {
      state.albums = artists;
      state.isLoading = false;
    });
    builder.addCase(fetchAlbums.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

const albumsReducer = albumsSlice.reducer;
export default albumsReducer;
