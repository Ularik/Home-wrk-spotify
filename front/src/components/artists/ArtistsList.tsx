import { Box } from "@mui/material";
import ArtistsItem from "./ArtistsItem";
import { fetchArtists } from "./store/artistsThunks";
import { selectArtists, selectIsError, selectIsLoading } from "./store/artistsSelectors";
import Spinner from "../UI/Spinner";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";


const ArtistsList = () => {
    const dispatch = useAppDispatch();
    const artistsList = useAppSelector(selectArtists);
    const isLoading = useAppSelector(selectIsLoading);
    const isError = useAppSelector(selectIsError);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [fetchArtists]);

    return (
      <Box sx={{ display: "flex", gap: 3, padding: 5 }}>
        {isLoading && <Spinner/>}
        {artistsList.map((artist) => (
          <ArtistsItem artist={artist} />
        ))}
      </Box>
    );
};

export default ArtistsList