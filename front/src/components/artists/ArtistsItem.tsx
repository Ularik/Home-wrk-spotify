import type { Artist } from "../../types";
import CardItem from "../UI/CardItem";
import { Button } from "@mui/material";
import { fetchAlbums } from "../albums/store/albumsThunks";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router";

interface Props {
    artist: Artist
}

const ArtistsItem: React.FC<Props> = ({ artist }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const getAlbums = async (id: string) => {
    try {
      dispatch(fetchAlbums(id)).unwrap();
    } catch(err) {

    }
    navigate('/albums');
  };

  return (
    <Button onClick={() => getAlbums(artist._id)}>
      <CardItem title={artist.name} image={artist.image} />
    </Button>
  );
};

export default ArtistsItem;