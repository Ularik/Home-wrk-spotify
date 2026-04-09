import AlbumsItem from "./AlbumsItem";
import { Alert, Box } from "@mui/material";
import Spinner from "../UI/Spinner";
import { fetchAlbums } from "./store/albumsThunks";
import { fetchArtistById } from "../artists/store/artistsThunks";
import {
  selectAlbums,
  selectIsAlbumLoading,
  selectIsAlbumError,
} from "./store/albumsSelectors";
import { publicateAlbum } from "./store/albumsThunks";
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
      {isLoading && <Spinner />}
      {error && <Alert severity="error">{error.error}</Alert>}
      {albums.map((album) => (
        <AlbumsItem
          key={album._id}
          publicateFunc={publicateFunc}
          album={album}
        />
      ))}
    </Box>
  );
};

export default AlbumsList;