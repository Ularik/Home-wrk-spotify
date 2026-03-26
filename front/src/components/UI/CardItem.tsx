import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ImageNotFound from "../../assets/imageNotFound.jpeg";
import { apiURL } from "../../constants";

interface Props {
  title: string;
  image: string | null;
  year_manufacture?: number;
  count?: number;
}

const CardItem: React.FC<Props> = ({
  title,
  image,
  year_manufacture,
  count,
}) => {

  const imageCard = image ? apiURL + '/' + image : ImageNotFound;
  return (
    <Card
      sx={{
        maxWidth: 345,
        position: "relative",
        width: "300px",
        height: "250px",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          position: "absolute",
          height: "100%",
          weight: "100%",
          objectFit: "cover",
          zIndex: 1,
        }}
        image={imageCard}
        alt="image"
      />
      <CardContent
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          zIndex: 2,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        {year_manufacture && (
          <Typography gutterBottom variant="h5" marginBlock={1} component="div">
            {year_manufacture}
          </Typography>
        )}
        {count && (
          <Typography gutterBottom variant="h5" marginBlock={1} component="div">
            {count}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CardItem;
