import { createSlice } from "@reduxjs/toolkit";
import type { Treck } from "../../../types";
import { fetchTrecks, playTreck } from "./trecksThunks";


interface TrecksState {
  trecks: Treck[];
  isLoading: boolean;
  error: boolean;
}

const initialState: TrecksState = {
  trecks: [],
  isLoading: false,
  error: false,
};

export const trecksSlice = createSlice({
  name: "trecks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTrecks.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(fetchTrecks.fulfilled, (state, { payload: trecks }) => {
      state.trecks = trecks;
      state.isLoading = false;
    });
    builder.addCase(fetchTrecks.rejected, (state) => {
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

const trecksReducer = trecksSlice.reducer;
export default trecksReducer;
