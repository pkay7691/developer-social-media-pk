import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchUserAsync, selectUser } from "../single_user/singleUserSlice";
import { Box, Grid, Typography, Table, AppBar, Toolbar, Button, Avatar } from "@mui/material";
import { styled } from '@mui/material/styles';
import { banUserAsync } from "../single_user/singleUserSlice";
import Paper from '@mui/material/Paper';
import { fetchUserFeedById } from "../globalfeed/globalfeedslice";
import GlobalFeed from "../globalfeed/GlobalFeed";
import { asyncFetchComments } from "../globalfeed/commentslice";
import { asyncFetchPostLikes } from "../globalfeed/postlikesslice";
import { sendFriendRequest } from "../friends/friendshipSlice";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100px'
}));

const SingleUser = () => {
    const loggedInUserId = useSelector((state) => state.auth.me.id);
    const navigate = useNavigate();
    const isAdmin = useSelector((state) => state.auth.me.is_admin)
    const banStatus = ['good_standing', 'banned']
    const [bannedType, setBannedType] = useState(banStatus[0])
    const [banned, setBanned] = useState(false)
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(selectUser)
    const friends = user.friends;
    const projects = user.projects


    const handleCreateFriendRequest = (e) => {
        console.log('friend request creation')
        const friendship = {
            userId: loggedInUserId,
            friendId: userId,
            friendName: `${user.first_name} ${user.last_name}`
        }
        dispatch(sendFriendRequest(friendship))
    }

    useEffect(() => {
        dispatch(fetchUserAsync(userId))
        dispatch(fetchUserFeedById(userId))
        dispatch(asyncFetchComments())
        dispatch(asyncFetchPostLikes())
    }, [dispatch, userId])


    //!FIXME: this button is working but it is not updating the user's ban status on first click.
    const handleBan = (e) => {
        e.preventDefault();
        const banUpdate = {
            id: userId,
            is_banned: !banned,
            ban_status: bannedType
        }
        if(bannedType === banStatus[0]) {
            setBannedType(banStatus[1])
        } else {
            setBannedType(banStatus[0])
        }
        console.log('banUpdate', banUpdate)
        dispatch(banUserAsync(banUpdate))
        navigate(`/users/${userId}`)
    }






    return (
        <div>
            <Box sx={{ flexGrow: 1 }} marginTop='50px'>
                <Grid container spacing={1}>
                    <Grid item xs={12} container>
                        <Grid item xs={2} />
                        <Grid item xs={2}><Avatar
                            srcSet={user.img_url}
                            sx={{ width: 140, height: 140 }}
                            variant= "dot"/>
                            </Grid>
                        <Grid item xs={3.5} />
                        {/* show the user's ban status only for admin view*/}
                        {isAdmin ? <Grid item xs={1}><Typography variant='h6'>Account Standing</Typography>
                            <Typography>{user.ban_status}</Typography>
                        </Grid> : null}
                        {/*created a ban button that only admins can see*/}
                        {isAdmin ? <Grid item xs={1}><Button variant='contained' onClick={handleBan}>Ban</Button></Grid> : null}
                        <Grid item xs={1}><Link to={`/users/${userId}/reportUser`}><Button variant='contained'>Report</Button></Link></Grid>
                        <Grid item xs={1}><Button variant='contained'>Block</Button></Grid>
                        <Grid item xs={1}><Button onClick={handleCreateFriendRequest} variant='contained'>Add Friend</Button></Grid>
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
                                {friends && friends.length ? friends.map((friend) =>
                                    <Typography key={`friend-${friend.id}`}>{friend.first_name} {friend.last_name}</Typography>
                                )
                                    :
                                    null}                    
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} container direction='column'>
                        <Grid item xs={8}/>
                        <Typography>Projects</Typography>
                        
                            {projects && projects.length ? projects.map((project) => 
                           <Link key={`project-link-${project.id}`} to={`/project/${project.id}`}><Typography>{project.project_name}</Typography></Link> 
                            )
                        :
                        null}
                       
                    </Grid>
                </Grid>
            </Box>
            <GlobalFeed profileId={userId} />
        </div>
    )
}

export default SingleUser;
