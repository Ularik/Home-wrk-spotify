import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../../axiosApi";
import type { Artist, ArtistMutatiion, GlobalError } from "../../../types";
import type { RootState } from "../../../app/store";
import type { ValidationError } from "../../../types";
import { isAxiosError } from "axios";

export const fetchArtists = createAsyncThunk<
  Artist[],
  void,
  { rejectValue: GlobalError }
>("artists/fetchArtists", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosApi.get<Artist[]>("/artists/");
    return res.data;
  } catch (err) {
    if (isAxiosError(err) && err.response && err.response.status === 400) {
      return rejectWithValue(err.response.data);
    }
    throw err;
  }
});

export const fetchArtistById = createAsyncThunk<
  Artist,
  string,
  { rejectValue: GlobalError }
>("artists/fetchArtistById", async (id, { rejectWithValue }) => {
  try {
    const res = await axiosApi.get<Artist>(`/artists/${id}`);
    return res.data;
  } catch (err) {
    if (isAxiosError(err) && err.response && err.response.status === 400) {
      return rejectWithValue(err.response.data);
    }
    throw err;
  }
});

export const createArtist = createAsyncThunk<
  Artist,
  ArtistMutatiion,
  { rejectValue: ValidationError }
>("artists/createArtist", async (artistForm, { rejectWithValue }) => {
  const formData = new FormData();
  const keys = Object.keys(artistForm) as (keyof ArtistMutatiion)[];
  keys.forEach((key) => {
    const value = artistForm[key];
    if (value !== null) {
      formData.append(key, value);
    }
  });

  try {
    const res = await axiosApi.post<Artist>(`/artists/`, formData);
    return res.data;
  } catch (err) {
    if (isAxiosError(err) && err.response && err.response.status === 400) {
      return rejectWithValue(err.response.data);
    }
    throw err;
  }
});

export const publicateArtist = createAsyncThunk<
  Artist,
  string,
  { rejectValue: GlobalError }
>("artists/publicateArtist", 
  async (artistId, { rejectWithValue }) => {
  try {
    const res = await axiosApi.patch<Artist>(
      `/artists/${artistId}/togglePublished`,
    );
    return res.data;
  } catch (err) {
    if (isAxiosError(err) && err.response && err.response.status === 400) {
      return rejectWithValue(err.response.data);
    }
    throw err;
  }
});