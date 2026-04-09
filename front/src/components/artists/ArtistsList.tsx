import { Alert, Box } from "@mui/material";
import ArtistsItem from "./ArtistsItem";
import Spinner from "../UI/Spinner";
import { publicateArtist } from "./store/artistsThunks";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectPublicateAlbumLoading, selectPublicateAlbumError } from "../albums/store/albumsSelectors";
import { selectArtists, selectIsLoading, selectIsError } from "./store/artistsSelectors";
import { useEffect } from "react";
import { fetchArtists } from "./store/artistsThunks";


const ArtistsList = () => {
  const dispatch = useAppDispatch();
  const publicateError = useAppSelector(selectPublicateAlbumError);
  const isPublicateLoading = useAppSelector(selectPublicateAlbumLoading);

  const publicateAlbumFunc = async (id: string) => {
    await dispatch(publicateArtist(id));
    dispatch(fetchArtists());
  }

  const artistsList = useAppSelector(selectArtists);
  const isFetchLoading = useAppSelector(selectIsLoading);
  const fetchError = useAppSelector(selectIsError);

  useEffect(() => {
    try {
      dispatch(fetchArtists());
    } catch (err) {}
  }, [fetchArtists]);

  return (
    <Box sx={{ display: "flex", gap: 3, padding: 5 }}>

      {(isFetchLoading || isPublicateLoading) && <Spinner />}

      {publicateError && <Alert severity="error">{publicateError.error}</Alert>}
      {fetchError && <Alert severity="error">{fetchError.error}</Alert>}

      {artistsList.map((artist) => (
        <ArtistsItem
          key={artist._id}
          publicateAlbumFunc={publicateAlbumFunc}
          artist={artist}
        />
      ))}
    </Box>
  );
};

export default ArtistsList