import TreckItem from "./TreckItem";
import List from "@mui/material/List";
import {
  selectDeleteTreckError,
  selectDeleteTreckLoading,
  selectTrecks,
  selectIsTrecksLoading,
  selectIsTrecksError,
  selectPublicateTreckError,
  selectPublicateTreckLoading
} from "./store/trecksSelectors";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Alert } from "@mui/material";
import { deleteTrecks, fetchTrecks, publicateTreck } from "./store/trecksThunks";
import { useSearchParams } from "react-router";
import Spinner from "../UI/Spinner";
import { useEffect, useCallback } from "react";
import { fetchAlbumWithArtist } from "../albums/store/albumsThunks";



const TrecksList = () => {
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
    } catch(err) {

    }
    
  }, [albumId, dispatch]);

  useEffect(() => {
    getData();
  }, [getData, dispatch]);
    return (
      <List sx={{ width: "100%", maxWidth: 520, bgcolor: "background.paper" }}>
        {isLoading && isDeleteLoading && publicateLoading && <Spinner />}
        {publicateError && <Alert severity="error">{publicateError.error}</Alert>}
        {isError && <Alert severity="error">Ошибка при загрузке</Alert>}
        {deleteError && <Alert severity="error">{deleteError.error}</Alert>}

        {trecks.map((treck) => (
          <TreckItem
            key={treck._id}
            deleteFunc={deleteFunc}
            publicateFunc={publicateFunc}
            treck={treck}
          />
        ))}
      </List>
    );
};


export default TrecksList;