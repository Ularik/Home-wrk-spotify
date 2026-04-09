import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import type { TreckMutation } from "../../types";
import { fetchArtists } from "../artists/store/artistsThunks";
import { createTrecks } from "./store/trecksThunks";
import { fetchAlbums } from "../albums/store/albumsThunks";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAlbums } from "../albums/store/albumsSelectors";
import {
  selectCreateTreckError,
  selectCreateTreckLoading,
} from "./store/trecksSelectors";
import Spinner from "../UI/Spinner";
import { useNavigate } from "react-router";
import { selectArtists } from "../artists/store/artistsSelectors";
import { useSelector } from "react-redux";

const TrecksForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const artistsList = useSelector(selectArtists);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const albumsList = useAppSelector(selectAlbums);
  const isLoading = useAppSelector(selectCreateTreckLoading);
  const error = useAppSelector(selectCreateTreckError);

  const [state, setState] = useState<TreckMutation>({
    title: "",
    album: "",
    number_in_album: "",
    duration: "",
  });

  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(createTrecks({ ...state })).unwrap();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (artistsList.length === 0) dispatch(fetchArtists());
    if (selectedArtist !== null) dispatch(fetchAlbums(selectedArtist));
  }, [dispatch, fetchArtists, artistsList.length, selectedArtist]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={4}
      alignItems={"center"}
      position={"relative"}
    >
      {isLoading && <Spinner />}
      <Typography fontSize={28} fontWeight={700}>
        Add new Album
      </Typography>
      <Box component={"form"} onSubmit={submitForm}>
        <Grid container gap={3} direction={"column"}>
          <Grid size={8}>
            <TextField
              variant="outlined"
              name="title"
              label="title"
              onChange={changeForm}
              error={Boolean(getFieldError("title"))}
              helperText={getFieldError("title")}
            />
          </Grid>
          <Grid size={8}>
            <TextField
              fullWidth
              select
              id="artist"
              label="artist"
              value={selectedArtist || ""}
              onChange={(e) => setSelectedArtist(e.target.value)}
              name="artist"
              required
            >
              <MenuItem value="" disabled>
                Please select a artist
              </MenuItem>

              {artistsList.map((artist) => (
                <MenuItem key={artist._id} value={artist._id}>
                  {artist.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={8}>
            <TextField
              fullWidth
              select
              id="album"
              label="album"
              value={state.album}
              onChange={changeForm}
              name="album"
              required
            >
              <MenuItem value="" disabled>
                Please select a album
              </MenuItem>

              {albumsList.map((album) => (
                <MenuItem key={album._id} value={album._id}>
                  {album.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={8}>
            <TextField
              name="number_in_album"
              onChange={changeForm}
              type="number"
              variant="outlined"
              label="number_in_album"
              error={Boolean(getFieldError("number_in_album"))}
              helperText={getFieldError("number_in_album")}
            />
          </Grid>
          <Grid size={8}>
            <TextField
              name="duration"
              onChange={changeForm}
              type="text"
              variant="outlined"
              label="duration"
              error={Boolean(getFieldError("duration"))}
              helperText={getFieldError("duration")}
            />
          </Grid>
          <Grid>
            <Button variant="contained" type="submit">
              submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default TrecksForm;
