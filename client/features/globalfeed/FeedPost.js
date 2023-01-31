import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGlobalFeed, selectGlobalFeed } from './globalfeedslice';
import { Box, Container, Stack, Avatar, Button, ButtonGroup, TextField } from '@mui/material';
import { sizing } from '@mui/system';
import Comments from './Comments';
import PostLikes from './PostLikes';
import { asyncCreateLike, asyncDeleteLike, asyncFetchPostLikes, selectPostLikes } from './postlikesslice';
import { createSerializableStateInvariantMiddleware } from '@reduxjs/toolkit';

/**
 * COMPONENT
 */
const FeedPost = ({feedItem}) => {

const [likeButton, setLikeButton] = useState('')

  
  const username = useSelector((state) => state.auth.me.username);
  const user = useSelector((state) => state.auth.me);
  const dispatch = useDispatch()
  const postLikes = useSelector(selectPostLikes)
  const postLikeCheck = postLikes && postLikes.length ? postLikes.filter(postLike => postLike.userId === user.id && postLike.postId === feedItem.id) : null



  
   



  useEffect(() => {
    dispatch(asyncFetchPostLikes())
    if (postLikeCheck && postLikeCheck.length) {
      setLikeButton('Unlike')   
    } else {
      setLikeButton('Like')
    }
    },[dispatch])

  
  const handlePostLike = (userId, postId) => {

  
    if (postLikeCheck && postLikeCheck.length) {
      let id = postLikeCheck[0].id;
      dispatch(asyncDeleteLike(id));
      setLikeButton('Like')

      
    } else {
      const like = {
        userId: userId,
        postId: postId,
      }
      dispatch(asyncCreateLike(like))
      setLikeButton('Unlike')
    }

    
  }

  

  
  return (
    <div>
            <Box className='border'>
              <div className='flex flex-row'> 
                <Avatar src={feedItem.user.img_url} />
                {feedItem.project && feedItem.project.project_name ? <div>{feedItem.user.first_name} {feedItem.user.last_name} {feedItem.project.project_name}</div> : <div>{feedItem.user.first_name} {feedItem.user.last_name} </div> }
                
                
              </div>
             
              <div>{feedItem.title}</div>
              <div>{feedItem.url}</div>
              <div>{feedItem.description}</div>
              <PostLikes feedItem={feedItem} />
              <ButtonGroup variant='outlined' aria-label='outlined button group' sx={{ width: 1 }}>
              
                  <Button onClick={(e) => handlePostLike(user.id, feedItem.id)} sx={{ width: 1/3 }}>{likeButton}</Button>
                  <Button sx={{ width: 1/3 }}>Comment</Button>
                  <Button sx={{ width: 1/3 }}>Share</Button>
                </ButtonGroup>
            </Box>
            <Comments feedItem={feedItem}/> 
            <TextField
            sx={{ width: 1 }}
          id="outlined-multiline-static"
          placeholder='Comment'
          multiline
          rows={2}
        />
        
    </div>
  );
};

export default FeedPost;
