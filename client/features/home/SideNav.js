import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useLocation} from 'react-router-dom'
import GlobalFeed from '../globalfeed/GlobalFeed';
import { fetchGlobalFeed } from '../globalfeed/globalfeedslice';
import { asyncFetchComments } from '../globalfeed/commentslice';
import { asyncFetchPostLikes } from '../globalfeed/postlikesslice';
import { asyncFetchCommentLikes } from '../globalfeed/commentlikeslice';
import { FormControl, TextField,  Autocomplete, Box, List, ListItem, Divider, Paper, Button, ButtonGroup, Avatar } from '@mui/material';
import { fetchUserAsync } from '../single_user/singleUserSlice';
import { asyncCreatePost, asyncFetchPosts } from '../globalfeed/postslice';
import SourceIcon from '@mui/icons-material/Source';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';

/**
 * COMPONENT
 */

const SideNav = (props) => {
  // const router = useLocation();
  // const userId = useSelector((state) => state.auth.me.id);
    const user = useSelector((state) => state.auth.me);
  // const userProjects = useSelector((state) => state.user.projects)
  // const feed = useSelector((state) => state.globalfeed)
  // const nullProject = [{ project_name: 'You have no projects' }]
  // const dispatch = useDispatch()

  // const options = userProjects && userProjects.length ? userProjects : nullProject


  // const [value, setValue] = useState('');
  // const [inputValue, setInputValue] = useState('');
  // const [url, setUrl] = useState('')
  // const [title, setTitle] = useState('')
  // const [description, setDescription] = useState('')



useEffect(() => {


},[])





  return (
    <div>
      
          <ButtonGroup sx={{width: 3/4}} orientation="vertical" aria-label='vertical outlined button group'>
            <Button  href={`/users/${user.id}`} sx={{justifyContent: 'flex-start'}} ><Avatar sx={{width: 32, height: 32}} src={user.img_url} />   {user.first_name} {user.last_name}</Button>

            <Button href={`/project`} sx={{justifyContent: 'flex-start'}} ><SourceIcon sx={{width: 32, height: 32}}/>Projects</Button>
            <Button sx={{justifyContent: 'flex-start'}} ><PeopleIcon sx={{width: 32, height: 32}} />Friends</Button>
            <Button href={`/chat`} sx={{justifyContent: 'flex-start'}} ><ChatIcon sx={{width: 32, height: 32}}/>Chat</Button>

          </ButtonGroup>


    </div>
  );
};

export default SideNav;
