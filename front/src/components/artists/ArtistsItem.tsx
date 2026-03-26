import type { Album, Artist } from "../../types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ImageNotFound from "../../assets/imageNotFound.jpeg";
import CardItem from "../UI/CardItem";


interface Props {
    artist: Artist
}

const ArtistsItem: React.FC<Props> = ({ artist }) => {

  return <CardItem title={artist.name} image={artist.image} />;
};

export default ArtistsItem;