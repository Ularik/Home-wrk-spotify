import {AppBar, Toolbar, Typography} from "@mui/material";
import styled from "@emotion/styled";
import { NavLink } from "react-router";
import { Grid } from "@mui/material";
import { Container, Button } from "@mui/material";
import UserMenu  from "./UserMenu";
import AnonymousMenu from "./Anonymous";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../users/store/usersSelectors";


const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit',
    }
});

const Header = () => {
  const user = useAppSelector(selectUser);

    return (
      <AppBar position="sticky" sx={{ mb: 2 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Grid
              container
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/">CompStore</Link>
              </Typography>

              {user ? (
                <UserMenu user={user}/>
              ): (
                <AnonymousMenu/>
              )}
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    );
};

export default Header;