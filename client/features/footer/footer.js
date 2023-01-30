import { Box, Container, Grid, Icon, IconButton, Typography, BottomNavigationraphy, CssBaseline, Stack } from "@mui/material";
import React from "react";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


const Footer = () => {

    return (

        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }} >
            <Container maxWidth='lg'>
                <Stack justifyContent='center' direction='row' spacing={2} position='relative'>
                <IconButton href="https://twitter.com"> <TwitterIcon /> </IconButton>
                <IconButton href="https://instagram.com"> <InstagramIcon /> </IconButton>
                <IconButton href="https://facebook.com"> <FacebookIcon /> </IconButton>
                <IconButton href="https://linkedin.com"> <LinkedInIcon /> </IconButton>
                <Typography>&copy;{new Date().getFullYear()} | All Rights Reserved | Terms of Service | Privacy</Typography>
                </Stack>
            </Container>
        </Box>

    )
}

export default Footer;