import { createSlice } from "@reduxjs/toolkit";
import type { Album, AlbumWithArtist, ValidationError } from "../../../types";
import { fetchAlbums, fetchAlbumWithArtist, createAlbum } from "./albumsThunks";

interface AlbumsState {
  albums: Album[];
  albumWithArtist: AlbumWithArtist | null;
  fetchLoading: boolean;
  fetchError: boolean;
  createLoading: boolean;
  createError: ValidationError | null
}

const initialState: AlbumsState = {
  albums: [],
  albumWithArtist: null,
  fetchLoading: false,
  fetchError: false,
  createLoading: false,
  createError: null
};

export const albumsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.pending, (state) => {
      state.fetchLoading = true;
      state.fetchLoading = false;
    });
    builder.addCase(fetchAlbums.fulfilled, (state, { payload: artists }) => {
      state.albums = artists;
      state.fetchLoading = false;
    });
    builder.addCase(fetchAlbums.rejected, (state) => {
      state.fetchLoading = false;
      state.fetchError = true;
    });
    builder.addCase(fetchAlbumWithArtist.pending, (state) => {
      state.fetchLoading = true;
      state.fetchError = false;
    });
    builder.addCase(
      fetchAlbumWithArtist.fulfilled,
      (state, { payload: album }) => {
        state.albumWithArtist = album;
        state.fetchLoading = false;
      },
    );
    builder.addCase(fetchAlbumWithArtist.rejected, (state) => {
      state.fetchLoading = false;
      state.fetchError = true;
    });

    builder.addCase(createAlbum.pending, (state) => {
      state.createLoading = true;
      state.fetchError = false;
    });
    builder.addCase(createAlbum.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createAlbum.rejected, (state, {payload: error}) => {
      state.createLoading = false;
      state.createError = error || null;
    });
  },
});

const albumsReducer = albumsSlice.reducer;
export default albumsReducer;
