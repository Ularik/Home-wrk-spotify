import AlbumsList from "../components/albums/AlbumsList";
import ArtistsItem from "../components/artists/ArtistsItem";
import { fetchAlbums } from "../components/albums/store/albumsThunks";
import { selectAlbums, selectIsAlbumLoading } from "../components/albums/store/albumsSelectors";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useSearchParams } from "react-router";


const Albums = () => {
  const searchParamas = useSearchParams();
  const dispatch = useAppDispatch()

  useEffect(() => {

  }, [fetchAlbums])

  return (
    <>
      <AlbumsList/>
    </>
  );
};

export default Albums;
