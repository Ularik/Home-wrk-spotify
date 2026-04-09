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

export const selectDeleteTreckLoading = (state: RootState) =>
  state.trecks.deleteLoading;
export const selectDeleteTreckError = (state: RootState) =>
  state.trecks.deleteError;

export const selectPublicateTreckLoading = (state: RootState) =>
  state.trecks.publicateLoading;
export const selectPublicateTreckError = (state: RootState) =>
  state.trecks.publicateError;