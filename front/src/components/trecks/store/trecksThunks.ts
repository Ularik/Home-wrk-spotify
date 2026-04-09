import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../../axiosApi";
import type { Treck, TreckMutation, ValidationError } from "../../../types";
import { isAxiosError } from "axios";

export const fetchTrecks = createAsyncThunk<Treck[], string>(
  "trecks/fetchTrecks",
  async (id) => {
    const res = await axiosApi.get<Treck[]>(`/trecks/?id=${id}`);
    return res.data;
  },
);

export const createTrecks = createAsyncThunk<Treck, TreckMutation, { rejectValue: ValidationError }>(
  "trecks/createTrecks",
  async (treckMutation, { rejectWithValue}) => {

    try {
      const res = await axiosApi.post<Treck>(`/trecks/`, treckMutation);
      return res.data;
    } catch(err) {
      if (isAxiosError(err) && err.response && err.response.status === 400) {
        return rejectWithValue(err.response.data);
      }
      throw err;
    }

  },
);