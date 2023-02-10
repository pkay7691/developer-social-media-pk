import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useLocation} from 'react-router-dom'
import GlobalFeed from '../globalfeed/GlobalFeed';
import { fetchGlobalFeed } from '../globalfeed/globalfeedslice';
import { asyncFetchComments } from '../globalfeed/commentslice';
import { asyncFetchPostLikes } from '../globalfeed/postlikesslice';
import { asyncFetchCommentLikes } from '../globalfeed/commentlikeslice';
import { FormControl, TextField, Button, Autocomplete, Box } from '@mui/material';
import { fetchUserAsync } from '../single_user/singleUserSlice';
import { asyncCreatePost, asyncFetchPosts } from '../globalfeed/postslice';



/**
 * COMPONENT
 */

const Home = (props) => {
  const router = useLocation();
  const userId = useSelector((state) => state.auth.me.id);
  const userProjects = useSelector((state) => state.user.projects)
  const feed = useSelector((state) => state.globalfeed)
  const nullProject = [{ project_name: 'You have no projects' }]
  const dispatch = useDispatch()

  const options = userProjects && userProjects.length ? userProjects : nullProject


  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')



useEffect(() => {
  if(router.search.token){
    const TOKEN = 'token'
    window.localStorage.setItem(TOKEN, router.search.token)
    dispatch(me())
  }
  dispatch(fetchUserAsync(userId))
  dispatch(asyncFetchPostLikes())
  dispatch(asyncFetchComments())
  dispatch(asyncFetchPosts())

},[])





  return (
    <div>
      <GlobalFeed />
    </div>
  );
};

export default Home;
