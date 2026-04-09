import { createSlice } from "@reduxjs/toolkit";
import type { GlobalError, Treck, ValidationError } from "../../../types";
import { fetchTrecks, createTrecks, deleteTrecks, publicateTreck } from "./trecksThunks";


interface TrecksState {
  trecks: Treck[];
  fetchLoading: boolean;
  fetchError: boolean;
  createLoading: boolean;
  createError: ValidationError | null;
  deleteLoading: boolean;
  deleteError: GlobalError | null;
  publicateLoading: boolean;
  publicateError: GlobalError | null;
}

const initialState: TrecksState = {
  trecks: [],
  fetchLoading: false,
  fetchError: false,
  createLoading: false,
  createError: null,
  deleteLoading: false,
  deleteError: null,
  publicateLoading: false,
  publicateError: null
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

    builder.addCase(deleteTrecks.pending, (state) => {
      state.deleteLoading = true;
      state.deleteError = null;
    });
    builder.addCase(deleteTrecks.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteTrecks.rejected, (state, { payload: error }) => {
      state.deleteLoading = false;
      state.deleteError = error || null;
    });

    builder.addCase(publicateTreck.pending, (state) => {
      state.publicateLoading = true;
      state.publicateError = null;
    });
    builder.addCase(publicateTreck.fulfilled, (state) => {
      state.publicateLoading = false;
    });
    builder.addCase(publicateTreck.rejected, (state, { payload: error }) => {
      state.publicateLoading = false;
      state.publicateError = error || null;
    });
  },
});

const trecksReducer = trecksSlice.reducer;
export default trecksReducer;
