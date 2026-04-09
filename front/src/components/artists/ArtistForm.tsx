import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState, type FormEvent } from "react";
import type { ArtistMutatiion } from "../../types";
import FileInput from "../UI/FileInput/FileInput";
import { createArtist } from "./store/artistsThunks";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCreateError, selectCreateLoading } from "./store/artistsSelectors";
import Spinner from "../UI/Spinner";
import { useNavigate } from "react-router";


const ArtistForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectCreateLoading);
  const error = useAppSelector(selectCreateError);

  const [state, setState] = useState<ArtistMutatiion>({
    name: "",
    image: null,
    description: "",
  });

    const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prevState => ({...prevState, [name]: value}));
        console.log(state)
    }

    const fileInputChangeHandler = (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
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
          await dispatch(createArtist({ ...state })).unwrap();
          navigate('/');
        } catch(err) {
          console.log(err);
        }
    }

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
          Add new Artist
        </Typography>
        <Box component={"form"} onSubmit={submitForm}>
          <Grid container gap={3} direction={"column"}>
            <Grid size={8}>
              <TextField
                variant="outlined"
                name="name"
                label="name"
                onChange={changeForm}
                error={Boolean(getFieldError("name"))}
                helperText={getFieldError("name")}
              />
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
                name="description"
                onChange={changeForm}
                variant="outlined"
                label="description"
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


export default ArtistForm;