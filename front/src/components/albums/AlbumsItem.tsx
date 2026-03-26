import type { Album } from "../../types";
import CardItem from "../UI/CardItem";

interface Props {
  album: Album;
}

const AlbumsItem: React.FC<Props> = ({ album }) => {
  return <CardItem title={album.title} image={album.image} year_manufacture={album.year_manufacture} count={2} />;
};

export default AlbumsItem;
