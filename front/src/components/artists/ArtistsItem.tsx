import type { Artist } from "../../types";
import CardItem from "../UI/CardItem";
import { useNavigate } from "react-router";

interface Props {
  artist: Artist;
  deleteArtistFunc: (id: string) => void;
  publicateAlbumFunc: (id: string) => void;
}

const ArtistsItem: React.FC<Props> = ({ artist, deleteArtistFunc, publicateAlbumFunc }) => {
  const navigate = useNavigate();

  const navGate = () => {
    navigate(`/albums?artistId=${artist._id}`);
  };

  return (
    <>
      <CardItem
        id={artist._id}
        title={artist.name}
        deleteFunc={deleteArtistFunc}
        publicateFunc={publicateAlbumFunc}
        navGate={navGate}
        isPublished={artist.isPublished}
        image={artist.image}
      />
    </>
  );
};

export default ArtistsItem;