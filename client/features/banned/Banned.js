import React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Banned = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <h1>You have been banned from the site</h1>

        <p>Due to the violations of terms and services, your account has been banned from the platform.  Please refer to the F.A.Q for further action of your account</p>
      </Box>
        <Button variant="contained" component={Link} to="/contactUs">
            Contact Us
        </Button>
    </>
  );
};

export default Banned;
