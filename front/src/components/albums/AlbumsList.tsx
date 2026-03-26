import AlbumsItem from "./AlbumsItem";
import { useAppSelector } from "../../app/hooks";
import { selectAlbums, selectIsAlbumError, selectIsAlbumLoading } from "./store/albumsSelectors";
import { Box } from "@mui/material";
import Spinner from "../UI/Spinner";


const AlbumsList = () => {
    const albums = useAppSelector(selectAlbums);
    const isError = useAppSelector(selectIsAlbumError);
    const isLoading = useAppSelector(selectIsAlbumLoading);

    return (
        <Box sx={{ display: "flex", gap: 3, padding: 5 }}>
            {isLoading && <Spinner/>}
            {albums.map(album => (
                <AlbumsItem album={album} />
            ))}
        </Box>
    )
};

export default AlbumsList;