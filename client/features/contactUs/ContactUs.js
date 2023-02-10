import { Box, Container } from "@mui/material";
import React from "react";

const ContactUs = () => {
  return (
    <Box
    sx={{
      minheight: '100vh'
    }}
    >
      <Container maxWidth='sm'>
      <div>
        <h1>Contact Us</h1>
        <p>You were banned because:  "Bannable Offense"</p>
        <p>
          For any questions or concerns, please contact us at:{" "}
          <a href="mailto:"></a>
        </p>
      </div>
      </Container>
      </Box>
  );
};

export default ContactUs;
