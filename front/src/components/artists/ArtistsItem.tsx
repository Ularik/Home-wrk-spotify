import type { Artist } from "../../types";
import CardItem from "../UI/CardItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

interface Props {
    artist: Artist
}

const ArtistsItem: React.FC<Props> = ({ artist }) => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(`/albums?artistId=${artist._id}`)}>
      <CardItem title={artist.name} isPublished={artist.isPublished} image={artist.image} />
    </Button>
  );
};

export default ArtistsItem;