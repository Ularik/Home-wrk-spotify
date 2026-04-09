import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../../axiosApi";
import type { GlobalError, Treck, TreckMutation, ValidationError } from "../../../types";
import { isAxiosError } from "axios";

export const fetchTrecks = createAsyncThunk<Treck[], string>(
  "trecks/fetchTrecks",
  async (id) => {
    const res = await axiosApi.get<Treck[]>(`/trecks/?id=${id}`);
    return res.data;
  },
);

export const createTrecks = createAsyncThunk<
  Treck,
  TreckMutation,
  { rejectValue: ValidationError }
>("trecks/createTrecks", async (treckMutation, { rejectWithValue }) => {
  try {
    const res = await axiosApi.post<Treck>(`/trecks/`, treckMutation);
    return res.data;
  } catch (err) {
    if (isAxiosError(err) && err.response && err.response.status === 400) {
      return rejectWithValue(err.response.data);
    }
    throw err;
  }
});

export const publicateTreck = createAsyncThunk<
  Treck,
  string,
  { rejectValue: GlobalError }
>("trecks/publicateTreck", async (treck_id, { rejectWithValue }) => {
  try {
    const res = await axiosApi.patch<Treck>(`/trecks/${treck_id}`);
    return res.data;
  } catch (err) {
    if (isAxiosError(err) && err.response && err.response.status === 400) {
      return rejectWithValue(err.response.data);
    }
    throw err;
  }
});


export const deleteTrecks = createAsyncThunk<void, string, { rejectValue: GlobalError }>(
  "trecks/deleteTrecks",
  async (id, { rejectWithValue}) => {
    try {
       await axiosApi.delete(`/trecks/${id}`);
    } catch(err) {
    if (isAxiosError(err) && err.response && err.response.status === 400) {
      return rejectWithValue(err.response.data);
    }
    throw err;
    }
  },
);