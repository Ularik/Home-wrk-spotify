import type { RootState } from "../../../app/store";

export const selectTrecks = (state: RootState) => state.trecks.trecks;
export const selectIsTrecksLoading = (state: RootState) => state.trecks.isLoading;
export const selectIsTrecksError = (state: RootState) => state.trecks.error;