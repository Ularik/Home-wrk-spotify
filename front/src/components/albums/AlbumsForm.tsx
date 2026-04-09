import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import type { AlbumMutation } from "../../types";
import FileInput from "../UI/FileInput/FileInput";
import { fetchArtists } from "../artists/store/artistsThunks";
import { createAlbum } from "./store/albumsThunks";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectIsAlbumCreateError, selectIsAlbumCreateLoading } from "./store/albumsSelectors";
import Spinner from "../UI/Spinner";
import { useNavigate } from "react-router";
import { selectArtists } from "../artists/store/artistsSelectors";


const AlbumsForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const artistsList = useAppSelector(selectArtists);
  const isLoading = useAppSelector(selectIsAlbumCreateLoading);
  const error = useAppSelector(selectIsAlbumCreateError);

  const [state, setState] = useState<AlbumMutation>({
    title: "",
    artist: "",
    image: null,
    year_manufacture: "",
  });

  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({ ...prevState, [name]: files[0] }));
    }
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
      await dispatch(createAlbum({ ...state })).unwrap();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch, fetchArtists]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={4}
      alignItems={"center"}
      position={"relative"}
    >
      <Typography fontSize={28} fontWeight={700}>
        Add new Album
      </Typography>
      <Box component={"form"} onSubmit={submitForm} position={"relative"}>
        {isLoading && <Spinner/>}
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
              value={state.artist}
              onChange={changeForm}
              name="artist"
              error={Boolean(getFieldError("artist"))}
              helperText={getFieldError("artist")}
              required
            >
              <MenuItem value="" disabled>
                Please select a category
              </MenuItem>

              {artistsList.map((artist) => (
                <MenuItem key={artist._id} value={artist._id}>
                  {artist.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid>
            <FileInput
              onChange={fileInputChangeHandler}
              name="image"
              label="image"
            />
          </Grid>
          <Grid size={8}>
            <TextField
              name="year_manufacture"
              onChange={changeForm}
              type="number"
              variant="outlined"
              label="year_manufacture"
              error={Boolean(getFieldError("year_manufacture"))}
              helperText={getFieldError("year_manufacture")}
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

export default AlbumsForm;
