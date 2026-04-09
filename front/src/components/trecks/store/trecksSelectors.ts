import type { RootState } from "../../../app/store";

export const selectTrecks = (state: RootState) => state.trecks.trecks;
export const selectIsTrecksLoading = (state: RootState) =>
  state.trecks.fetchLoading;
export const selectIsTrecksError = (state: RootState) =>
  state.trecks.fetchError;

export const selectCreateTreckLoading = (state: RootState) =>
  state.trecks.createLoading;
export const selectCreateTreckError = (state: RootState) =>
  state.trecks.createError;