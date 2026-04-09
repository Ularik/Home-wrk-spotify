import type { Album } from "../../types";
import CardItem from "../UI/CardItem";
import { useNavigate } from "react-router";

interface Props {
  album: Album;
  publicateFunc: (id: string) => void;
}

const AlbumsItem: React.FC<Props> = ({ album, publicateFunc }) => {
  const navigate = useNavigate();

  const navGate = () => {
    navigate(`/trecks?albumId=${album._id}`);
  }

  return (
    <>
      <CardItem
        id={album._id}
        title={album.title}
        image={album.image}
        publicateFunc={publicateFunc}
        navGate={navGate}
        isPublished={album.isPublished}
        year_manufacture={album.year_manufacture}
        count={album.trecksCount}
      />
    </>
  );
};

export default AlbumsItem;
