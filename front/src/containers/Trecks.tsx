import { Typography } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { selectAlbumWithArtist } from "../components/albums/store/albumsSelectors";
import type { AlbumWithArtist } from "../types";
import TrecksList from "../components/trecks/TrecksList";


const Trecks = () => {
  const album: AlbumWithArtist | null = useAppSelector(selectAlbumWithArtist);

  return (
    <>
      {album && (
        <>
          <Typography component={'h1'} fontSize={24}>{album.artist.name}</Typography>
          <Typography component={'h3'} fontSize={22}>{album.title}</Typography>
        </>
      )}

      <TrecksList />
    </>
  );
};

export default Trecks;
