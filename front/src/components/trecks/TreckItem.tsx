import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Alert, Box, ListItemButton } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Divider from "@mui/material/Divider";
import type { Treck } from "../../types";
import { Typography } from "@mui/material";
import { playTreck } from "../treckHistory/store/historyThunks";
import {
  selectIsTrecksHistoryCreateError,
  selectIsTrecksHistoryCreateLoading,
  selectCurrentPlayingId,
} from "../treckHistory/store/historySelectors";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectUser } from "../users/store/usersSelectors";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Spinner from "../UI/Spinner";


interface Props {
    treck: Treck;
    deleteFunc: (id: string) => void;
    publicateFunc: (id: string) => void;
}

const TreckItem: React.FC<Props> = ({ treck, deleteFunc, publicateFunc }) => {
  const user = useAppSelector(selectUser);
  const currentPlayingId = useAppSelector(selectCurrentPlayingId);
  const isLoading = useAppSelector(selectIsTrecksHistoryCreateLoading);
  const error = useAppSelector(selectIsTrecksHistoryCreateError);
  const dispatch = useAppDispatch();

  const sendTreckToHistory = async (treckId: string) => {
    if (user) dispatch(playTreck({ treckId: treckId, userToken: user.token }));
  };


  return (
    <>
      <ListItem
        sx={{ position: "relative" }}
        key={treck.number_in_album}
        disableGutters
        secondaryAction={
          <>
            {user ? (
              <Box display={"flex"}>
                <ListItemButton
                  sx={{ position: "relative" }}
                  onClick={() => sendTreckToHistory(treck._id)}
                >
                  {isLoading && treck._id === currentPlayingId && <Spinner />}
                  <ListItemIcon>
                    <PlayCircleIcon />
                  </ListItemIcon>
                  <Typography>{treck.duration}</Typography>
                </ListItemButton>
                {user.role === "admin" && (
                  <Box position={'relative'}>
                    <ListItemButton
                      onClick={() => deleteFunc(treck._id)}
                      sx={{
                        display: "block",
                        width: "40px",
                        position: "relative",
                        paddingInline: 1,
                      }}
                    >
                      <ListItemIcon>
                        <DeleteOutlineOutlinedIcon />
                      </ListItemIcon>
                    </ListItemButton>

                    {!treck.isPublished && <ListItemButton sx={{ position: 'absolute', left: '40px', top: 0 }} onClick={() => publicateFunc(treck._id)}>
                      Опубликовать
                    </ListItemButton>}
                  </Box>
                )}
              </Box>
            ) : (
              <Typography>{treck.duration}</Typography>
            )}
          </>
        }
      >
        {error && treck._id === currentPlayingId && (
          <Alert severity="error">ошибка на сервере</Alert>
        )}
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
