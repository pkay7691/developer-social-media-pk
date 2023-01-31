import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGlobalFeed, selectGlobalFeed } from './globalfeedslice';
import { Box, Container, Stack, Avatar, Button, ButtonGroup, TextField } from '@mui/material';
import { sizing } from '@mui/system';
import { asyncFetchComments, selectComments } from './commentslice';
import { asyncFetchPostLikes, selectPostLikes } from './postlikesslice';



/**
 * COMPONENT
 */
const PostLikes = ({feedItem}) => {


  const username = useSelector((state) => state.auth.me.username);
  const dispatch = useDispatch()
  console.log('feeditem', feedItem)
  const allPostLikes = useSelector(selectPostLikes);
  const postLikes = allPostLikes.filter(postLike => feedItem.id === postLike.postId )
  console.log(postLikes, "Post LIkes")
  



  


  
  return (
    <div>

      {postLikes && postLikes.length === 1 ? 
      <div> Liked by {postLikes[0].user.first_name} {postLikes[0].user.last_name}</div> 
      : postLikes && postLikes.length === 2 ?
      <div> Liked by {postLikes[0].user.first_name} {postLikes[0].user.last_name} and {postLikes[1].user.first_name} {postLikes[1].user.last_name}</div> 
      : postLikes && postLikes.length > 2 ?
      <div> Liked by {postLikes[0].user.first_name} and {postLikes.length  -1} others</div> 
:
       null}
    
   
    </div>
  );
};

export default PostLikes;
