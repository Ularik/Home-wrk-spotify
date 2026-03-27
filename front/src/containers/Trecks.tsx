import { Typography } from "@mui/material";
import { fetchTrecks } from "../components/trecks/store/trecksThunks";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectAlbumWithArtist } from "../components/albums/store/albumsSelectors";
import { fetchAlbumWithArtist } from "../components/albums/store/albumsThunks";
import { useEffect, useCallback } from "react";
import { useSearchParams } from "react-router";
import type { AlbumWithArtist } from "../types";
import { selectTrecks, selectIsTrecksError, selectIsTrecksLoading } from "../components/trecks/store/trecksSelectors";
import TrecksList from "../components/trecks/TrecksList";


const Trecks = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const albumId = searchParams[0].get("albumId");

  const album: AlbumWithArtist | null = useAppSelector(selectAlbumWithArtist);
  const trecks = useAppSelector(selectTrecks);
  const isLoading = useAppSelector(selectIsTrecksLoading);
  const isError = useAppSelector(selectIsTrecksError);

  const getData = useCallback(async () => {
    try {
      if (albumId) {
        dispatch(fetchAlbumWithArtist(albumId));
        dispatch(fetchTrecks(albumId));
      }
    } catch(err) {

    }
    
  }, [albumId, dispatch]);

  useEffect(() => {
    getData();
  }, [getData, dispatch]);

  return (
    <>
      {album && (
        <>
          <Typography component={'h1'} fontSize={24}>{album.artist.name}</Typography>
          <Typography component={'h3'} fontSize={22}>{album.title}</Typography>
        </>
      )}

      <TrecksList trecks={trecks} isError={isError} isLoading={isLoading} />
    </>
  );
};

export default Trecks;
