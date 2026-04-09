import { createSlice } from "@reduxjs/toolkit";
import type { Album, AlbumWithArtist, GlobalError, ValidationError } from "../../../types";
import { fetchAlbums, fetchAlbumWithArtist, createAlbum, publicateAlbum } from "./albumsThunks";

interface AlbumsState {
  albums: Album[];
  albumWithArtist: AlbumWithArtist | null;
  fetchLoading: boolean;
  fetchError: GlobalError | null;
  createLoading: boolean;
  createError: ValidationError | null;
  publicateLoading: boolean;
  publicateError: GlobalError | null;
}

const initialState: AlbumsState = {
  albums: [],
  albumWithArtist: null,
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  publicateLoading: false,
  publicateError: null
};

export const albumsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.pending, (state) => {
      state.fetchLoading = true;
      state.fetchError = null;
    });
    builder.addCase(fetchAlbums.fulfilled, (state, { payload: artists }) => {
      state.albums = artists;
      state.fetchLoading = false;
    });
    builder.addCase(fetchAlbums.rejected, (state, { payload: error }) => {
      state.fetchLoading = false;
      state.fetchError = error || null;
    });

    
    builder.addCase(fetchAlbumWithArtist.pending, (state) => {
      state.fetchLoading = true;
      state.fetchError = null;
    });
    builder.addCase(
      fetchAlbumWithArtist.fulfilled,
      (state, { payload: album }) => {
        state.albumWithArtist = album;
        state.fetchLoading = false;
      },
    );
    builder.addCase(
      fetchAlbumWithArtist.rejected,
      (state, { payload: error }) => {
        state.fetchLoading = false;
        state.fetchError = error || null;
      },
    );

    builder.addCase(createAlbum.pending, (state) => {
      state.createLoading = true;
      state.createError = null;
    });
    builder.addCase(createAlbum.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createAlbum.rejected, (state, {payload: error}) => {
      state.createLoading = false;
      state.createError = error || null;
    });


    builder.addCase(publicateAlbum.pending, (state) => {
      state.publicateLoading = true;
      state.publicateError = null;
    });
    builder.addCase(publicateAlbum.fulfilled, (state) => {
      state.publicateLoading = false;
    });
    builder.addCase(publicateAlbum.rejected, (state, { payload: error }) => {
      state.publicateLoading = false;
      state.publicateError = error || null;
    });
  },
});

const albumsReducer = albumsSlice.reducer;
export default albumsReducer;
