import type { Album } from "../../types";
import CardItem from "../UI/CardItem";
import { Box } from "@mui/material";
import { useNavigate } from "react-router";

interface Props {
  album: Album;
}

const AlbumsItem: React.FC<Props> = ({ album }) => {
  const navigate = useNavigate();

  return (
    <Box onClick={() => navigate(`/trecks?albumId=${album._id}`)}>
      <CardItem
        title={album.title}
        image={album.image}
        year_manufacture={album.year_manufacture}
        count={album.trecksCount}
      />
    </Box>
  );
};

export default AlbumsItem;
