import React from "react";
import { Grid, Box, Typography, Tabs } from "@mui/material";
import SideBar from "../sidebar/SideBar";

const Messages = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4">Messages</Typography>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={10} value={Tabs}>
                {/*the first column uses 30% of the screen */}
                <Grid item xs={3}>
                    <Box sx={{ bgcolor: "grey.300", height: "100vh" }}>
                        <SideBar />
                        {/*the second column uses 70% of the screen */}
                    </Box>
                </Grid>
                <Grid item xs={7}>
                    <Box sx={{ bgcolor: "grey.300", height: "100vh" }}>
                        {/*the second column uses 70% of the screen */}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </Box>
    );
};

export default Messages;