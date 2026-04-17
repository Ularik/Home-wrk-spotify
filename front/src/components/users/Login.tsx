import React, { useState } from "react";
import { Link as RouterLink } from "react-router";
import type { LoginMutation } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { googleLogin, login } from "./store/usersThunks";
import { useNavigate } from "react-router";
import { selectLoginError, selectLoginLoading } from "./store/usersSelectors";
import Alert from "@mui/material/Alert";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import LockOpenIcon from "@mui/icons-material/LockOpen";
import { GoogleLogin } from "@react-oauth/google";


const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<LoginMutation>({
    username: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(login(state)).unwrap();
    navigate("/");
  };

  const googleSubmit = async (credentials: string) => {
    try {
      await dispatch(googleLogin(credentials)).unwrap();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        style={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOpenIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mt: 3, width: "100%" }}>
            {error.error}
          </Alert>
        )}

        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                fullWidth
                label="username"
                name="username"
                autoComplete="current-username"
                value={state.username}
                onChange={inputChangeHandler}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={state.password}
                onChange={inputChangeHandler}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Box sx={{ pt: 2 }}>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (credentialResponse.credential) {
                  googleSubmit(credentialResponse.credential);
                }
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </Box>

          <Grid container justifyContent="flex-end">
            <Grid>
              <Link component={RouterLink} to="/register" variant="body2">
                Or sign up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
