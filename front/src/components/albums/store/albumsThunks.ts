import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../../axiosApi";
import type { Album } from "../../../types";

export const fetchAlbums = createAsyncThunk<Album[], string>(
  "albums/fetchAlbums", 
  async (artist_id) => {
  const res = await axiosApi.get<Album[]>(`/albums/?id=${artist_id}`);
  return res.data;
});
