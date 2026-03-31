import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../../axiosApi";
import type { Treck } from "../../../types";


export const fetchTrecks = createAsyncThunk<Treck[], string>(
  "trecks/fetchTrecks",
  async (id) => {
    const res = await axiosApi.get<Treck[]>(`/trecks/?id=${id}`);
    return res.data;
  },
);

