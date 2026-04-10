import AlbumsItem from "./AlbumsItem";
import { Alert, Box } from "@mui/material";
import Spinner from "../UI/Spinner";
import { fetchAlbums } from "./store/albumsThunks";
import { fetchArtistById } from "../artists/store/artistsThunks";
import {
  selectAlbums,
  selectIsAlbumLoading,
  selectIsAlbumError,
  selectDeleteAlbumError,
  selectDeleteAlbumLoading
} from "./store/albumsSelectors";
import { publicateAlbum, deleteAlbum } from "./store/albumsThunks";
import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectOneArtist } from "../artists/store/artistsSelectors";
import { useSearchParams } from "react-router";


const AlbumsList = () => {
  const searchParams = useSearchParams();
  const artistId = searchParams[0].get('artistId');
  const artist = useAppSelector(selectOneArtist);
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbums);
    const error = useAppSelector(selectIsAlbumError);
    const isLoading = useAppSelector(selectIsAlbumLoading);

    const publicateFunc = async (album_id: string) => {
      try {
        await dispatch(publicateAlbum(album_id)).unwrap();
        if (artistId) dispatch(fetchAlbums(artistId));
      } catch(err) {
        console.log(err);
      }
    };

    const deleteLoading = useAppSelector(selectDeleteAlbumLoading);
    const deleteError = useAppSelector(selectDeleteAlbumError);
    const deleteFunc = async (id: string) => {
      try {
        await dispatch(deleteAlbum(id)).unwrap();
        if (artistId) dispatch(fetchAlbums(artistId));
      } catch(err) {
        console.log(err);
      }
    }

    const getData = useCallback(async () => {
      if (artistId) {
        dispatch(fetchAlbums(artistId));
        dispatch(fetchArtistById(artistId));
      }
    }, [artist, dispatch]);

    useEffect(() => {
      getData();
    }, [fetchAlbums]);

  return (
    <Box sx={{ display: "flex", gap: 3, padding: 5 }}>
      {(isLoading || deleteLoading) && <Spinner />}

      {error && <Alert severity="error">{error.error}</Alert>}
      {deleteError && <Alert severity="error">{deleteError.error}</Alert>}

      {albums.map((album) => (
        <AlbumsItem
          key={album._id}
          deleteFunc={deleteFunc}
          publicateFunc={publicateFunc}
          album={album}
        />
      ))}
    </Box>
  );
};

export default AlbumsList;