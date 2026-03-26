import {AppBar, Toolbar, Typography} from "@mui/material";
import styled from "@emotion/styled";
import { NavLink } from "react-router";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";

const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit',
    }
});

const Header = () => {
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
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    );
};

export default Header;