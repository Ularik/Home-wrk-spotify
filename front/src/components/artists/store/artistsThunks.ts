import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../../axiosApi";
import type { Artist } from "../../../types";

export const fetchArtists = createAsyncThunk<Artist[]>(
  "artists/fetchArtists",
  async () => {
    const res = await axiosApi.get<Artist[]>("/artists/");
    return res.data;
  },
);

export const fetchArtistById = createAsyncThunk<Artist, string>(
  "artists/fetchArtistById",
  async (id) => {
    const res = await axiosApi.get<Artist>(`/artists/${id}`);
    return res.data;
  },
);