import AlbumsItem from "./AlbumsItem";
import { Box } from "@mui/material";
import type { Album } from "../../types";


interface Props {
  albums: Album[];
  deleteFunc: (id: string) => void;
  publicateFunc: (id: string) => void;
}

const AlbumsList: React.FC<Props> = ({ albums, deleteFunc, publicateFunc }) => {
  
  return (
    <Box sx={{ display: "flex", gap: 3, padding: 5 }}>
      {albums.map((album) => (
        <AlbumsItem
          key={album._id}
          deleteFunc={deleteFunc}
          publicateFunc={publicateFunc}
          album={album}
        />
      ))}
    </Box>
  );
};

export default AlbumsList;