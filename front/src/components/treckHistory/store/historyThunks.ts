import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../../axiosApi";
import type {
  Artist,
  TreckHistory,
  TrecksHistoryResponse,
} from "../../../types";


export const playTreck = createAsyncThunk<TreckHistory, any>(
  "trecks/playTreck",
  async ({ treckId, userToken }) => {
    const res = await axiosApi.post<TreckHistory>(
      "/trecks_history/",
      { treckId },
      {
        headers: {
          Authorization: userToken,
          "Content-Type": "application/json",
        },
      },
    );
    return res.data;
  },
);


export const fetchTrecksHistory = createAsyncThunk<TrecksHistoryResponse>(
  "trecksHistory/fetchTrecksHistory",
  async () => {
    const res = await axiosApi.get<TrecksHistoryResponse>(
      `/trecks_history/`);
    return res.data;
  },
);

