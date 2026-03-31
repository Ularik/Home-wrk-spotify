import { createSlice } from "@reduxjs/toolkit";
import type { TreckHistory } from "../../../types";
import { fetchTrecksHistory, playTreck } from "./historyThunks";

interface TrecksHistoryState {
  history: TreckHistory[];
  isLoading: boolean;
  error: boolean;
}

const initialState: TrecksHistoryState = {
  history: [],
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
      (state, { payload: history }) => {
        state.history = history;
        state.isLoading = false;
      },
    );
    builder.addCase(fetchTrecksHistory.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(playTreck.pending, (state) => {
        state.isLoading = true;
        state.error = false;
    });
    builder.addCase(playTreck.fulfilled, (state) => {
        state.isLoading = false;
    });
    builder.addCase(playTreck.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
    });
  },
});

const trecksHistoryReducer = trecksHistorySlice.reducer;
export default trecksHistoryReducer;
