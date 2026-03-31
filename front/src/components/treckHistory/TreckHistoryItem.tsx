import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import type { TreckHistory } from "../../types";

interface Props {
  history: TreckHistory;
}


const TreckHistoryItem: React.FC<Props> = ({ history }) => {
  return (
    <>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <>
            <Typography>{"2026-03-31"}</Typography>
          </>
        }
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>

        <ListItemText
          primary={"Perfect"}
          secondary={
            <Typography
              component="span"
              variant="body2"
              sx={{ color: "text.primary", display: "inline" }}
            >
              {"Ed Sheeran"}
            </Typography>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default TreckHistoryItem;