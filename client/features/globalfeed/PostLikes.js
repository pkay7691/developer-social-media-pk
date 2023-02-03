import React, { Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGlobalFeed, selectGlobalFeed } from './globalfeedslice';
import {Link} from 'react-router-dom'
import { Box, Container, Stack, Avatar, Button, ButtonGroup, TextField } from '@mui/material';
import { sizing } from '@mui/system';
import { asyncFetchComments, selectComments } from './commentslice';
import postlikesslice, { asyncFetchPostLikes, selectPostLikes } from './postlikesslice';



/**
 * COMPONENT
 */
const PostLikes = ({feedItem}) => {




  const username = useSelector((state) => state.auth.me.username);
  const dispatch = useDispatch()

  const allPostLikes = useSelector(selectPostLikes);
  const allPostComments = useSelector(selectComments)

  // filters to see if post like exists in database to determine Like or Unlike button status
  const postLikes = allPostLikes && allPostLikes.length ? allPostLikes.filter(postLike => feedItem.id === postLike.postId) : null


  useEffect(() => {
    dispatch(asyncFetchPostLikes())
  
  },[allPostLikes.length])

  




  
  return (
    <div>
      
      {postLikes && postLikes.length == 1 && postLikes[0].user ? 
      <div> Liked by <Link to={`/users/${postLikes[0].user.id}`}>{postLikes[0].user.first_name} {postLikes[0].user.last_name}</Link></div> 
      : postLikes && postLikes.length == 2 && postLikes[0].user && postLikes[1].user ?
      <div> Liked by <Link to={`/users/${postLikes[0].user.id}`}>{postLikes[0].user.first_name} {postLikes[0].user.last_name}</Link> and <Link to={`/users/${postLikes[1].user.id}`}>{postLikes[1].user.first_name} {postLikes[1].user.last_name}</Link></div> 
      : postLikes && postLikes.length > 2 ?
      <div> Liked by <Link to={`/users/${postLikes[0].user.id}`}>{postLikes[0].user.first_name} {postLikes[0].user.last_name}</Link> and {postLikes.length  -1} others</div> 
:
       null}
     
    
   
    </div>
  );
};

export default PostLikes;
