import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../../axiosApi";
import type { Treck, TreckHistory } from "../../../types";


export const fetchTrecks = createAsyncThunk<Treck[], string>(
  "trecks/fetchTrecks",
  async (id) => {
    const res = await axiosApi.get<Treck[]>(`/trecks/?id=${id}`);
    return res.data;
  },
);


export const playTreck = createAsyncThunk<TreckHistory, any>(
  "trecks/playTreck",
  async ({ treckId, userToken }) => {
    console.log(treckId, userToken)
    const res = await axiosApi.post<TreckHistory>("/trecks_history/", {treckId}, {
      headers: {
        Authorization: userToken,
        'Content-Type': 'application/json'
      },
    });
    return res.data;
  },
);
