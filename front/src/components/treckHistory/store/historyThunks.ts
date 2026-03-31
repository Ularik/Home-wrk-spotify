import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../../axiosApi";
import type { TreckHistory } from "../../../types";


export const playTreck = createAsyncThunk<TreckHistory, any>(
  "trecks/playTreck",
  async ({ treckId, userToken }) => {
    console.log(treckId, userToken);
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


export const fetchTrecksHistory = createAsyncThunk<TreckHistory[], string>(
  "trecksHistory/fetchTrecksHistory",
  async (userToken) => {
    const res = await axiosApi.get<TreckHistory[]>(`/trecks_history/`, {
      headers: {
        Authorization: userToken,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  },
);


