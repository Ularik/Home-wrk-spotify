import React, { useState } from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import type { User } from "../../types";
import { NavLink } from "react-router";
import { logout } from "../users/store/usersThunks";
import { useAppDispatch } from "../../app/hooks";
import { apiURL } from "../../constants";


interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutClick = async (e: React.MouseEvent) => {
    await dispatch(logout());
    window.location.reload();
  }

  return (
    <Box display={"flex"} justifyContent={"space-between"} gap={3}>
      <Button
        variant="text"
        component={NavLink}
        to="/add-artist"
        color="inherit"
      >
        Add Artist
      </Button>
      <Button variant="text" component={NavLink} to="add-album" color="inherit">
        Add Album
      </Button>
      <Button variant="text" component={NavLink} to="/add-treck" color="inherit">
        Add Treck
      </Button>
      <Button onClick={handleClick} color="inherit">
        {user.avatar && <img style={{width: '50px', height: 'auto', borderRadius: '50%', display: 'block'}} src={`${apiURL + '/' + user.avatar}`} />}
        Hello, {user.displayName}
      </Button>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Button component={NavLink} to="/history" color="inherit">
            listening history
          </Button>
        </MenuItem>
        <MenuItem onClick={logoutClick}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
