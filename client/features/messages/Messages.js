import React, {useEffect, useState} from "react";
import { Grid, Box, Typography, Tabs } from "@mui/material";
import SideBar from "../sidebar/SideBar";
import { useDispatch } from "react-redux";
import { fetchChat } from "./messagesslice";
import Chatbox from "./Chatbox";

const Messages = () => {
    const [receiverId, setReceiverId ] = useState(null)

    const dispatch = useDispatch()
    const chatter  = {
        userId: 1,
        otherId: 2
    }


    useEffect(() => {
        dispatch(fetchChat(chatter))
    },[])



    
    return (
        <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4">Messages</Typography>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={10} value={Tabs}>
                {/*the first column uses 30% of the screen */}
                <Grid item xs={3}>
                    <Box sx={{ bgcolor: "grey.300", height: "100vh" }}>
                        <SideBar receiverId={receiverId} setReceiverId={setReceiverId}/>
                        {/*the second column uses 70% of the screen */}
                    </Box>
                </Grid>
                <Grid item xs={7}>
                    {/*the chatbox stays in the middle of the screen */}
                    <Box sx={{ bgcolor: "grey.300", height: "100vh" }}>
                        <Chatbox receiverId={receiverId}/>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </Box>
    );
};

export default Messages;
