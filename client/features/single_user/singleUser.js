import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchUserAsync, selectUser } from "../single_user/singleUserSlice";
import { Box, Grid, Typography, Table, AppBar, Toolbar, Button, Avatar } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100px'
}));

const SingleUser = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(selectUser)
    const friends = user.friends;
    const projects = user.projects

    useEffect(() => {
        dispatch(fetchUserAsync(userId))
    }, [dispatch])





    return (
        <div>
            <Box sx={{ flexGrow: 1 }} marginTop='50px'>
                <Grid container spacing={1}>
                    <Grid item xs={12} container>
                        <Grid item xs={2} />
                        <Grid item xs={2}><Avatar
                            alt={user.username}
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 140, height: 140 }}
                            variant= "dot"/>
                            </Grid>
                        <Grid item xs={3.5} />
                        <Grid item xs={1}><Button variant='contained'>Report</Button></Grid>
                        <Grid item xs={1}><Button variant='contained'>Block</Button></Grid>
                        <Grid item xs={1}><Button variant='contained'>Add Friend</Button></Grid>
                    </Grid>
                    <Grid item xs={12} container />
                    <Grid item xs={12} container />
                    <Grid item xs={12} container />
                </Grid>
                <Grid container spacing={2} direction='column'>
                    <Grid item xs={12} container>
                        <Grid item xs={2} />
                        <Grid item xs={2}><Typography variant='h2'>Profile</Typography>
                            <Typography> Username: {user.username}</Typography>
                            <Typography> Name: {user.first_name} {user.last_name}</Typography>
                            <Typography> Email: {user.email}</Typography>
                        </Grid>
                        <Grid item xs={4} />
                        <Grid item xs={2}><Typography variant='h2'>Friends</Typography>
                            <Typography>
                                {friends && friends.length ? friends.map((friend) =>
                                    <div>{friend.first_name} {friend.last_name}</div>
                                )
                                    :
                                    null}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} container direction='column'>
                        <Grid item xs={8}/>
                        <Typography>Projects</Typography>
                        <Typography color='red'>
                            {projects && projects.length ? projects.map((project) =>
                           <Link to={`/project/${project.id}`}><div>{project.project_name}</div></Link>
                            )
                        :
                        null}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default SingleUser;
