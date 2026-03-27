import { createSlice } from "@reduxjs/toolkit";
import type { Album, AlbumWithArtist } from "../../../types";
import { fetchAlbums, fetchAlbumWithArtist } from "./albumsThunks";

interface AlbumsState {
  albums: Album[];
  albumWithArtist: AlbumWithArtist | null;
  isLoading: boolean;
  error: boolean;
}

const initialState: AlbumsState = {
  albums: [],
  albumWithArtist: null,
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
    builder.addCase(fetchAlbumWithArtist.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(
      fetchAlbumWithArtist.fulfilled,
      (state, { payload: album }) => {
        state.albumWithArtist = album;
        state.isLoading = false;
      },
    );
    builder.addCase(fetchAlbumWithArtist.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

const albumsReducer = albumsSlice.reducer;
export default albumsReducer;
