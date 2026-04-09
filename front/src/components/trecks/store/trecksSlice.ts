import { createSlice } from "@reduxjs/toolkit";
import type { Treck, ValidationError } from "../../../types";
import { fetchTrecks, createTrecks } from "./trecksThunks";


interface TrecksState {
  trecks: Treck[];
  fetchLoading: boolean;
  fetchError: boolean;
  createLoading: boolean;
  createError: ValidationError | null
}

const initialState: TrecksState = {
  trecks: [],
  fetchLoading: false,
  fetchError: false,
  createLoading: false,
  createError: null
};

export const trecksSlice = createSlice({
  name: "trecks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTrecks.pending, (state) => {
      state.fetchLoading = true;
      state.fetchError = false;
    });
    builder.addCase(fetchTrecks.fulfilled, (state, { payload: trecks }) => {
      state.trecks = trecks;
      state.fetchLoading = false;
    });
    builder.addCase(fetchTrecks.rejected, (state) => {
      state.fetchLoading = false;
      state.fetchError = true;
    });

    builder.addCase(createTrecks.pending, (state) => {
      state.createLoading = true;
      state.createError = null;
    });
    builder.addCase(createTrecks.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createTrecks.rejected, (state, { payload: error }) => {
      state.createLoading = false;
      state.createError = error || null;
    });
  },
});

const trecksReducer = trecksSlice.reducer;
export default trecksReducer;
