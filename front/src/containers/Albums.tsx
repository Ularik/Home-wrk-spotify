import AlbumsList from "../components/albums/AlbumsList";
import { selectOneArtist } from "../components/artists/store/artistsSelectors";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Alert, Typography } from "@mui/material";
import Spinner from "../components/UI/Spinner";
import { useSearchParams } from "react-router";
import { selectAlbums, selectDeleteAlbumError, selectDeleteAlbumLoading, selectIsAlbumError, selectIsAlbumLoading } from "../components/albums/store/albumsSelectors";
import { deleteAlbum, fetchAlbums, publicateAlbum } from "../components/albums/store/albumsThunks";
import { useCallback, useEffect } from "react";
import { fetchArtistById } from "../components/artists/store/artistsThunks";


const Albums = () => {
  const artist = useAppSelector(selectOneArtist);

  const searchParams = useSearchParams();
  const artistId = searchParams[0].get("artistId");
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const error = useAppSelector(selectIsAlbumError);
  const isLoading = useAppSelector(selectIsAlbumLoading);

  const publicateFunc = async (album_id: string) => {
    try {
      await dispatch(publicateAlbum(album_id)).unwrap();
      if (artistId) dispatch(fetchAlbums(artistId));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteLoading = useAppSelector(selectDeleteAlbumLoading);
  const deleteError = useAppSelector(selectDeleteAlbumError);
  const deleteFunc = async (id: string) => {
    try {
      await dispatch(deleteAlbum(id)).unwrap();
      if (artistId) dispatch(fetchAlbums(artistId));
    } catch (err) {
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
    <>
      {(isLoading || deleteLoading) && <Spinner />}
      {error && <Alert severity="error">{error.error}</Alert>}
      {deleteError && <Alert severity="error">{deleteError.error}</Alert>}

      {artist ? (
        <>
          <Typography
            component={"h3"}
            fontSize={26}
            fontWeight={700}
            textAlign={"center"}
          >
            {artist.name}
          </Typography>
          <AlbumsList
            albums={albums}
            deleteFunc={deleteFunc}
            publicateFunc={publicateFunc}
          />
        </>
      ) : null}
    </>
  );
};

export default Albums;
