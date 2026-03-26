import { Typography } from "@mui/material";
import { fetchTrecks } from "../components/trecks/store/trecksThunks";
import { selectOneArtist } from "../components/artists/store/artistsSelectors";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect, useCallback } from "react";
import { useSearchParams } from "react-router";


const Trecks = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const albumId = searchParams[0].get("albumId");
  const artistId = searchParams[0].get("artistId");

  const artist = useAppSelector(selectOneArtist);
  // const album = 


  const getData = useCallback(async () => {
    if (albumId) dispatch(fetchTrecks(albumId));
    
  }, [albumId, dispatch]);

  useEffect(() => {
    getData();
  }, [getData, dispatch]);

  return (
    <>
    {artistId && (
      <Typography>{artistId.name}</Typography>
    )}
    </>
  );
};

export default Trecks;
