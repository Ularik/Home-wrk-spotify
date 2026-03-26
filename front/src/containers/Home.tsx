import ArtistsList from "../components/artists/ArtistsList";
import { fetchArtists } from "../components/artists/store/artistsThunks";
import {
  selectArtists,
  selectIsError,
  selectIsLoading,
} from "../components/artists/store/artistsSelectors";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";


const Home = () => {
    const dispatch = useAppDispatch();
    const artistsList = useAppSelector(selectArtists);
    const isLoading = useAppSelector(selectIsLoading);
    const isError = useAppSelector(selectIsError);

    useEffect(() => {
      try {
        dispatch(fetchArtists());
      } catch (err) {}
    }, [fetchArtists]);

    return (
        <>
        <ArtistsList artistsList={artistsList} isLoading={isLoading}/>
        </>
    )
};

export default Home;