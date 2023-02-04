import { AppBar, Stack, Avatar, Button, Tooltip, IconButton, Menu, MenuItem, Divider, ListItemIcon, Grid, Box, TableBody, TableRow, TableCell } from "@mui/material";
import { Flag, Settings, Logout } from '@mui/icons-material'
import { IoMdSearch } from 'react-icons/io';
import React from 'react';
import { Container } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { logout } from "../../app/store";


const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isBanned = useSelector((state) => state.auth.me.is_banned);
  const profilePic = useSelector((state) => state.auth.me.img_url);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.me.id);
  
  
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  
  return (
    <div>
      <nav>
        {isBanned ? (
          <>
            <div>
              <Link to="/contactUs">Contact Us</Link>
            </div>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </>
        ) : isLoggedIn ? (
          <div>
            <AppBar position="static">
              <Container maxWidth="xl">
                <Grid item xs={12} container>
                  <Grid item xs={.5} />
                  <Link to="/home">Home</Link>
                  <Grid item xs={.5} />
                  <Link to="/chat">Chat</Link>
                  <Grid item xs={.5} />
                  <Link to="/contactUs">Contact Us</Link>
                  <Grid item xs={8.5} />
                  
                  <Tooltip title='Account Settings'>
                    <IconButton
                      onClick={handleClick}
                      size='small'
                      sx={{ ml: 2 }}
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup='true'
                      aria-expanded={open ? 'true' : undefined}
                    >
                      <Avatar
                        src={profilePic}
                        alt="profile pic"
                        style={{ width: "30px", height: "30px" }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >

                    <Link to={`/users/${user}`}>
                      <MenuItem>
                        <Avatar /> Profile
                      </MenuItem>
                    </Link>

                    <MenuItem onClick={handleClose}>
                      <Avatar /> My account
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </MenuItem>
                    <Link to='/support'>
                      <MenuItem>
                        <ListItemIcon>
                          <Flag fontSize="small" />
                        </ListItemIcon>
                        Support
                      </MenuItem>
                    </Link>
                    <MenuItem onClick={logoutAndRedirectHome}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>

                </Grid>
              </Container>
            </AppBar>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <AppBar position="static">
              <Container maxWidth="xl">
                <Grid item xs={12} container>
                  <Grid item xs={.5} />
                  <Link to="/login">Login</Link>
                  <Grid item xs={.5} />
                  <Link to="/signup">Sign Up</Link>
                  <Grid item xs={.5} />
                  <Link to='/users'>Users</Link>
                </Grid>
              </Container>
            </AppBar>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
