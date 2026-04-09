import AlbumsList from "../components/albums/AlbumsList";
import { selectOneArtist } from "../components/artists/store/artistsSelectors";
import { useAppSelector } from "../app/hooks";
import { Typography } from "@mui/material";


const Albums = () => {
  const artist = useAppSelector(selectOneArtist);

  return (
    <>
      {artist ? (
        <Typography
          component={"h3"}
          fontSize={26}
          fontWeight={700}
          textAlign={"center"}
        >
          {artist.name}
        </Typography>
      ) : null}
      <AlbumsList />
    </>
  );
};

export default Albums;
