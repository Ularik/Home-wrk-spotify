import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../../axiosApi";
import type { Album, AlbumWithArtist } from "../../../types";

export const fetchAlbums = createAsyncThunk<Album[], string>(
  "albums/fetchAlbums", 
  async (artist_id) => {
  const res = await axiosApi.get<Album[]>(`/albums/?id=${artist_id}`);
  return res.data;
});


export const fetchAlbumWithArtist = createAsyncThunk<AlbumWithArtist, string>(
  "albums/fetchAlbumWithArtist",
  async (albumId) => {
    const res = await axiosApi.get<AlbumWithArtist>(`/albums/${albumId}`);
    return res.data;
  },
);
