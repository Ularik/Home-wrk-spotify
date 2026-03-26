import AlbumsItem from "./AlbumsItem";
import type { Album } from "../../types";
import { Box } from "@mui/material";
import Spinner from "../UI/Spinner";

interface Props {
    albums: Album[];
    isError: boolean;
    isLoading: boolean
}

const AlbumsList: React.FC<Props> = ({ albums, isError, isLoading }) => {
  return (
    <Box sx={{ display: "flex", gap: 3, padding: 5 }}>
      {isLoading && <Spinner />}
      {albums.map((album) => (
        <AlbumsItem key={album._id} album={album} />
      ))}
    </Box>
  );
};

export default AlbumsList;