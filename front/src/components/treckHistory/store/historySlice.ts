import { createSlice } from "@reduxjs/toolkit";
import type { AlbumWithArtist, TreckHistory } from "../../../types";
import { fetchTrecksHistory, playTreck } from "./historyThunks";

interface TrecksHistoryState {
  history: TreckHistory[];
  albums: AlbumWithArtist[];
  currentPlayingId: string | null;
  isLoading: boolean;
  error: boolean;
}

const initialState: TrecksHistoryState = {
  history: [],
  albums: [],
  currentPlayingId: null,
  isLoading: false,
  error: false,
};

export const trecksHistorySlice = createSlice({
  name: "trecksHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTrecksHistory.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(
      fetchTrecksHistory.fulfilled,
      (state, { payload: data }) => {
        state.history = data.trecks_history;
        state.albums = data.albums
        state.isLoading = false;
      },
    );
    builder.addCase(fetchTrecksHistory.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(playTreck.pending, (state, action) => {
        state.isLoading = true;
        state.error = false;
        state.currentPlayingId = action.meta.arg.treckId;
    });
    builder.addCase(playTreck.fulfilled, (state) => {
        state.isLoading = false;
        state.currentPlayingId = null;
    });
    builder.addCase(playTreck.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
        state.currentPlayingId = null;
    });
  },
});

const trecksHistoryReducer = trecksHistorySlice.reducer;
export default trecksHistoryReducer;
