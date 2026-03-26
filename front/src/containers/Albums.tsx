import AlbumsList from "../components/albums/AlbumsList";
import { fetchAlbums } from "../components/albums/store/albumsThunks";
import { fetchArtistById } from "../components/artists/store/artistsThunks";
import { selectOneArtist } from "../components/artists/store/artistsSelectors";
import { selectAlbums, selectIsAlbumLoading, selectIsAlbumError } from "../components/albums/store/albumsSelectors";
import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useSearchParams } from "react-router";
import { Typography } from "@mui/material";


const Albums = () => {
  const searchParamas = useSearchParams();
  const artistId = searchParamas[0].get("artistId");
  const dispatch = useAppDispatch()

  const artist = useAppSelector(selectOneArtist);
  const albums = useAppSelector(selectAlbums);
  const isError = useAppSelector(selectIsAlbumError);
  const isLoading = useAppSelector(selectIsAlbumLoading);

  const getData = useCallback(async () => {
    if (artistId) {
      dispatch(fetchAlbums(artistId));
      dispatch(fetchArtistById(artistId));
    }
  }, [artistId, dispatch]);

  useEffect(() => {
    getData();
  }, [fetchAlbums])

  return (
    <>
      {artist ? (
        <Typography
          component={"h3"}
          fontSize={26}
          fontWeight={700}
          textAlign={"center"}
        >
          {artist.name}
        </Typography>
      ) : null}
      <AlbumsList albums={albums} isError={isError} isLoading={isLoading} />
    </>
  );
};

export default Albums;
