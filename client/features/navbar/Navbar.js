
import { AppBar, Stack, Avatar, Button, Tooltip, IconButton, Menu, MenuItem, Divider, ListItemIcon, Grid, Box } from "@mui/material";
import { Settings, Logout } from '@mui/icons-material'


import React from 'react';
import jwt_decode from 'jwt-decode'

import { Container } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { logout } from "../../app/store";


const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isBanned = useSelector((state) => state.auth.me.is_banned);
  const profilePic = useSelector((state) => state.auth.me.img_url);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const profile = () => {
    dispatch()
  }

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
            <Link to="/home">Home</Link>
            <Link to="/chat">Chat</Link>
            <Link to="/contactUs">Contact Us</Link>
            <Link to="/updateProfile">
              <img
                src={profilePic}
                alt="profile pic"
                style={{ width: "50px", height: "50px" }}
              />
            </Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <div className="card-action">
              <a href="/auth/google/callback">
                  Google+
              </a>
            </div>
            <AppBar position="static">
              <Container maxWidth="xl">
                <Grid item xs={12} container>
                <Grid item xs={.5}/>
                  <Link to="/login">Login</Link>
                  <Grid item xs={.5}/>
                  <Link to="/signup">Sign Up</Link>
                  <Grid item xs={.5}/>
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
