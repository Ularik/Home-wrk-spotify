import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ImageNotFound from "../../assets/imageNotFound.jpeg";
import { apiURL } from "../../constants";
import { selectUser } from "../users/store/usersSelectors";
import { useAppSelector } from "../../app/hooks";


interface Props {
  id: string;
  title: string;
  image: string | null;
  deleteFunc: (id: string) => void;
  publicateFunc: (id: string) => void;
  navGate: () => void;
  isPublished: boolean;
  year_manufacture?: number;
  count?: number;
}

const CardItem: React.FC<Props> = ({
  id,
  title,
  image,
  deleteFunc,
  publicateFunc,
  navGate,
  isPublished,
  year_manufacture,
  count,
}) => {
  const imageCard = image ? apiURL + '/' + image : ImageNotFound;

  const user = useAppSelector(selectUser);
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
      {!isPublished && user && user.role === "admin" && (
        <CardContent
          onClick={() => publicateFunc(id)}
          sx={{
            position: "absolute",
            cursor: "pointer",
            top: 0,
            zIndex: 2,
            backgroundColor: "rgba(84, 0, 0, 0.5)",
            color: "white",
          }}
        >
          Неопубликованно
        </CardContent>
      )}
      {user && user.role === "admin" && (
        <CardContent
          onClick={() => deleteFunc(id)}
          sx={{
            position: "absolute",
            cursor: "pointer",
            top: 0,
            right: 0,
            zIndex: 2,
            backgroundColor: "rgba(192, 8, 8, 0.5)",
            color: "white",
          }}
        >
          Удалить
        </CardContent>
      )}
      <CardContent
        onClick={() => navGate()}
        sx={{
          cursor: "pointer",
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
