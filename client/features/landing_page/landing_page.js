import React, { useEffect, useState } from 'react';
import { createTheme, CssBaseline, ThemeProvider, Typography, Container, Collapse, IconButton, Grid, Card, CardContent, CardMedia, CardActionArea, Stack } from '@mui/material'


const LandingPage = () => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(true);
    }, [])

    return (
        <div>
            <Container maxWidth='large' minHeight='100vh' >
                <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})} collapsedHeight={100} align='center'>
                    <Typography variant='h2' color='textPrimary'>Landing Page</Typography>
                </Collapse>
                {/* <div> */}
                <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})} collapsedHeight={100} align='center'>
                    <Stack sx={{ pt: '56.25' }} direction='row' spacing={10} justifyContent='center' marginTop={10}>
                        <Card sx={{ maxWidth: 600 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="100"
                                    image=""
                                    alt=""
                                />
                                <CardContent >
                                    <Typography gutterBottom variant="h5" component="div" align='center'>
                                        About Us
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna eget est lorem ipsum dolor sit amet consectetur. Lobortis mattis aliquam faucibus purus. Morbi blandit cursus risus at ultrices. Accumsan tortor posuere ac ut consequat semper viverra nam libero. In aliquam sem fringilla ut. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Tempus imperdiet nulla malesuada pellentesque elit eget. Scelerisque felis imperdiet proin fermentum leo vel orci. Tempus iaculis urna id volutpat lacus. Porttitor lacus luctus accumsan tortor posuere ac. Porta non pulvinar neque laoreet. Velit sed ullamcorper morbi tincidunt ornare massa eget.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card sx={{ maxWidth: 600 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="100"
                                    image=""
                                    alt=""
                                />
                                <CardContent >
                                    <Typography gutterBottom variant="h5" component="div" align='center'>
                                        Objective
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna eget est lorem ipsum dolor sit amet consectetur. Lobortis mattis aliquam faucibus purus. Morbi blandit cursus risus at ultrices. Accumsan tortor posuere ac ut consequat semper viverra nam libero. In aliquam sem fringilla ut. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Tempus imperdiet nulla malesuada pellentesque elit eget. Scelerisque felis imperdiet proin fermentum leo vel orci. Tempus iaculis urna id volutpat lacus. Porttitor lacus luctus accumsan tortor posuere ac. Porta non pulvinar neque laoreet. Velit sed ullamcorper morbi tincidunt ornare massa eget.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Stack>
                </Collapse>
            </Container>
        </div>
    )
}

export default LandingPage;
