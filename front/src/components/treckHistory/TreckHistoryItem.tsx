import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import type { AlbumWithArtist, TreckHistory } from "../../types";
import { selectTrecksHistoryAlbums } from "./store/historySelectors";
import { useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";


interface Props {
  history: TreckHistory;
}


const TreckHistoryItem: React.FC<Props> = ({ history }) => {
  const newDate = history.datetime.split("T")[0];
  const albums = useAppSelector(selectTrecksHistoryAlbums);
  const [current_album, setCurrentAlbum] = useState<AlbumWithArtist | undefined>(undefined);

  useEffect(() => {
    const album_ids = albums.map(album => album._id);
    album_ids.forEach(album_id => {
      if (album_id === history.treck_id.album) {
        const foundAlbum = albums.find(album => album._id === album_id);
        setCurrentAlbum(foundAlbum);
      }
    }) 
  }, [albums, history.treck_id.album])

  return (
    <>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <>
            <Typography>{newDate}</Typography>
          </>
        }
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>

        <ListItemText
          primary={history.treck_id?.title}
          secondary={
            <Typography
              component="span"
              variant="body2"
              sx={{ color: "text.primary", display: "inline" }}
            >
              {current_album !== undefined ? current_album.artist.name : null}
            </Typography>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default TreckHistoryItem;