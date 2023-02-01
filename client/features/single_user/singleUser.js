import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUserAsync, selectUser } from "../single_user/singleUserSlice";
import { Box, Grid, Typography, Table, AppBar, Toolbar } from "@mui/material";


const SingleUser = () => {
     const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(selectUser)
    

    useEffect(() => {
        dispatch(fetchUserAsync(userId))
    },[dispatch])


    return (
        <div>
        <Box sx={{ width: 300, height: 300, p: 8, border: '1px solid black', marginLeft: 10, marginTop: 50, }}>
            <Grid alignItems='center'>
                <Typography>{user.username}</Typography>
                <Typography>{user.first_name} {user.last_name}</Typography>
                <Typography>{user.email}</Typography>
            </Grid>
        </Box>
        </div>
    )
}

export default SingleUser;