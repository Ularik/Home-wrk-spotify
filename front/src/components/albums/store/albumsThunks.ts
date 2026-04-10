import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../../axiosApi";
import type {
  Album,
  AlbumMutation,
  AlbumWithArtist,
  GlobalError,
  ValidationError,
} from "../../../types";
import { isAxiosError } from "axios";

export const fetchAlbums = createAsyncThunk<
  Album[],
  string,
  { rejectValue: GlobalError }
>("albums/fetchAlbums", async (artist_id, { rejectWithValue }) => {
  try {
    const res = await axiosApi.get<Album[]>(`/albums/?id=${artist_id}`);
    return res.data;
  } catch (err) {
    if (isAxiosError(err) && err.response && err.response.status === 400) {
      return rejectWithValue(err.response.data);
    }
    throw err;
  }
});

export const fetchAlbumWithArtist = createAsyncThunk<
  AlbumWithArtist,
  string,
  { rejectValue: GlobalError }
>("albums/fetchAlbumWithArtist", async (albumId, { rejectWithValue }) => {
  try {
    const res = await axiosApi.get<AlbumWithArtist>(`/albums/${albumId}`);
    return res.data;
  } catch (err) {
    if (isAxiosError(err) && err.response && err.response.status === 400) {
      return rejectWithValue(err.response.data);
    }
    throw err;
  }
});

export const createAlbum = createAsyncThunk<
  Album,
  AlbumMutation,
  { rejectValue: ValidationError }
>("albums/createAlbum", async (albumMutation, { rejectWithValue }) => {
  const formData = new FormData();
  const keys = Object.keys(albumMutation) as (keyof AlbumMutation)[];
  keys.forEach((key) => {
    const value = albumMutation[key];
    if (value !== null) formData.append(key, value);
  });

  try {
    const res = await axiosApi.post<Album>(`/albums/`, formData);
    return res.data;
  } catch (err) {
    if (isAxiosError(err) && err.response && err.response.status === 400) {
      return rejectWithValue(err.response.data);
    }
    throw err;
  }
});

export const publicateAlbum = createAsyncThunk<
  Album,
  string,
  { rejectValue: GlobalError }
>("albums/publicateAlbum", async (album_id, { rejectWithValue }) => {
  try {
    const res = await axiosApi.patch<Album>(
      `/albums/${album_id}/togglePublished`,
    );
    return res.data;
  } catch (err) {
    if (isAxiosError(err) && err.response && err.response.status === 400) {
      return rejectWithValue(err.response.data);
    }
    throw err;
  }
});

export const deleteAlbum = createAsyncThunk<
  void,
  string,
  { rejectValue: GlobalError }
>("albums/deleteAlbum", async (albumId, { rejectWithValue }) => {
  try {
    await axiosApi.delete(`/albums/${albumId}`);
  } catch (err) {
    if (isAxiosError(err) && err.response && err.response.status === 400) {
      return rejectWithValue(err.response.data);
    }
    throw err;
  }
});