import { Alert, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectAlbumWithArtist } from "../components/albums/store/albumsSelectors";
import type { AlbumWithArtist } from "../types";
import TrecksList from "../components/trecks/TrecksList";
import { useSearchParams } from "react-router";
import { selectDeleteTreckError, selectDeleteTreckLoading, selectIsTrecksError, selectIsTrecksLoading, selectPublicateTreckError, selectPublicateTreckLoading, selectTrecks } from "../components/trecks/store/trecksSelectors";
import { deleteTrecks, fetchTrecks, publicateTreck } from "../components/trecks/store/trecksThunks";
import { fetchTrecksHistory } from "../components/treckHistory/store/historyThunks";
import { useCallback, useEffect } from "react";
import { fetchAlbumWithArtist } from "../components/albums/store/albumsThunks";
import Spinner from "../components/UI/Spinner";


const Trecks = () => {
  const album: AlbumWithArtist | null = useAppSelector(selectAlbumWithArtist);
    const searchParams = useSearchParams();
    const albumId = searchParams[0].get("albumId");

    const trecks = useAppSelector(selectTrecks);
    const isLoading = useAppSelector(selectIsTrecksLoading);
    const isError = useAppSelector(selectIsTrecksError);

    const deleteError = useAppSelector(selectDeleteTreckError);
    const isDeleteLoading = useAppSelector(selectDeleteTreckLoading);
    const publicateError = useAppSelector(selectPublicateTreckError);
    const publicateLoading = useAppSelector(selectPublicateTreckLoading);
    
    const dispatch = useAppDispatch();

    const deleteFunc = async (id: string) => {
      try {
        await dispatch(deleteTrecks(id)).unwrap();
        if (albumId) dispatch(fetchTrecks(albumId));
        dispatch(fetchTrecksHistory());
      } catch (err) {
        console.log(err);
      }
    };

    const publicateFunc = async (id: string) => {
      try {
        await dispatch(publicateTreck(id)).unwrap();
        if (albumId) dispatch(fetchTrecks(albumId));
      } catch (err) {
        console.log(err);
      }
    };

    const getData = useCallback(async () => {
      try {
        if (albumId) {
          dispatch(fetchAlbumWithArtist(albumId));
          dispatch(fetchTrecks(albumId));
        }
      } catch (err) {}
    }, [albumId, dispatch]);

    useEffect(() => {
      getData();
    }, [getData, dispatch]);


  return (
    <>
      {album ? (
        <>
          {isLoading && isDeleteLoading && publicateLoading && <Spinner />}
          {publicateError && (
            <Alert severity="error">{publicateError.error}</Alert>
          )}
          {isError && <Alert severity="error">Ошибка при загрузке</Alert>}
          {deleteError && <Alert severity="error">{deleteError.error}</Alert>}
          <Typography component={"h1"} fontSize={24}>
            {album.artist.name}
          </Typography>
          <Typography component={"h3"} fontSize={22}>
            {album.title}
          </Typography>
          <TrecksList trecks={trecks} deleteFunc={deleteFunc} publicateFunc={publicateFunc} />
        </>
      ) : (
        <Alert severity="info">This Page Not Exist</Alert>
      )}
    </>
  );
};

export default Trecks;
