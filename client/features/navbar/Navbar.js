import { AppBar, Stack } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isBanned = useSelector((state) => state.auth.me.is_banned);
  const profilePic = useSelector((state) => state.auth.me.img_url);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
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
            <AppBar position="static">
              <Container maxWidth="xl">
                <Stack spacing={2} direction='row'>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to='/users'>Users</Link>
                </Stack>
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
