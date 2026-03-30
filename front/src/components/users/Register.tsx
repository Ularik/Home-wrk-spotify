import { useState } from "react";
import type { RegisterMutation } from "../../types";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectRegisterError } from "./store/usersSelectors";
import { register } from "./store/usersThunks";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Register = () => {
  const [state, setState] = useState<RegisterMutation>({
    username: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  console.log(error);
  const navigate = useNavigate();

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await dispatch(register(state)).unwrap();
      navigate("/");
      toast.success(`${response.message}`);
    } catch (e) {}
  };

  const theme = createTheme();
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={submitFormHandler}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid size={12}>
                  <TextField
                    autoComplete="given-name"
                    name="username"
                    required
                    fullWidth
                    id="name"
                    label="name"
                    onChange={inputChangeHandler}
                    autoFocus
                    error={Boolean(getFieldError("username"))}
                    helperText={getFieldError("username")}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    onChange={inputChangeHandler}
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={Boolean(getFieldError("password"))}
                    helperText={getFieldError("password")}
                  />
                </Grid>
                <Grid size={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Register;
