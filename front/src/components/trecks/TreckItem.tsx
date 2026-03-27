import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import type { Treck } from "../../types";
import { Typography } from "@mui/material";

interface Props {
    treck: Treck;
}

const TreckItem: React.FC<Props> = ({ treck }) => {
  return (
    <>
      <ListItem
        key={treck.number_in_album}
        disableGutters
        secondaryAction={
            <Typography>{treck.duration}</Typography>
        }
      >
        <ListItemText primary={`№ ${treck.number_in_album}.  ${treck.title}`} />
      </ListItem>
      <Divider component="li" />
    </>
  );
};

export default TreckItem;
