import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../../axiosApi";
import type { Album, AlbumMutation, AlbumWithArtist, ValidationError } from "../../../types";
import { isAxiosError } from "axios";

export const fetchAlbums = createAsyncThunk<Album[], string>(
  "albums/fetchAlbums",
  async (artist_id) => {
    const res = await axiosApi.get<Album[]>(`/albums/?id=${artist_id}`);
    return res.data;
  },
);

export const fetchAlbumWithArtist = createAsyncThunk<AlbumWithArtist, string>(
  "albums/fetchAlbumWithArtist",
  async (albumId) => {
    const res = await axiosApi.get<AlbumWithArtist>(`/albums/${albumId}`);
    return res.data;
  },
);

export const createAlbum = createAsyncThunk<Album, AlbumMutation, { rejectValue: ValidationError }>(
  "albums/createAlbum",
  async (albumMutation, { rejectWithValue }) => {

    const formData = new FormData();
    const keys = Object.keys(albumMutation) as (keyof AlbumMutation)[];
    keys.forEach(key => {
      const value = albumMutation[key];
      if (value !== null) formData.append(key, value);
    });

    try {
        const res = await axiosApi.post<Album>(`/albums/`, formData);
        return res.data;  
    } catch(err) {
      if (isAxiosError(err) && err.response && err.response.status === 400) {
        return rejectWithValue(err.response.data);
      }
      throw err;
    }
  },
);