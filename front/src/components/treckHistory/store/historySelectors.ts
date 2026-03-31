import type { RootState } from "../../../app/store";

export const selectTrecksHistory = (state: RootState) => state.trecksHistory.history;
export const selectTrecksHistoryAlbums = (state: RootState) =>
  state.trecksHistory.albums;

export const selectIsTrecksHistoryLoading = (state: RootState) =>
  state.trecksHistory.isLoading;
export const selectIsTrecksHistoryError = (state: RootState) =>
  state.trecksHistory.error;