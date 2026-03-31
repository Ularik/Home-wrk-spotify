import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Divider from "@mui/material/Divider";
import type { Treck } from "../../types";
import { Typography } from "@mui/material";
import { playTreck } from "../treckHistory/store/historyThunks";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectUser } from "../users/store/usersSelectors";


interface Props {
    treck: Treck;
}

const TreckItem: React.FC<Props> = ({ treck }) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const sendTreckToHistory = async (treckId: string) => {
    if (user) dispatch(playTreck({ treckId: treckId, userToken: user.token }));
  };


  return (
    <>
      <ListItem
        key={treck.number_in_album}
        disableGutters
        secondaryAction={
          <>
            <ListItemButton onClick={() => sendTreckToHistory(treck._id)}>
              <ListItemIcon>
                <PlayCircleIcon />
              </ListItemIcon>
              <Typography>{treck.duration}</Typography>
            </ListItemButton>
          </>
        }
      >
        <ListItemText
          primary={`№ ${treck.number_in_album}.  ${treck.title}`}
          primaryTypographyProps={{
            sx: {
              width: "20ch",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              display: "block", // Обязательно, чтобы ширина применилась корректно
            },
          }}
        />
      </ListItem>
      <Divider component="li" />
    </>
  );
};

export default TreckItem;
