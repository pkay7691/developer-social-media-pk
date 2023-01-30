import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGlobalFeed, selectGlobalFeed } from './globalfeedslice';
import { Box, Container, Stack, Avatar, Button, ButtonGroup, TextField } from '@mui/material';
import { sizing } from '@mui/system';
import { asyncFetchComments, selectComments } from './commentslice';



/**
 * COMPONENT
 */
const Comments = ({feedItem}) => {


  const username = useSelector((state) => state.auth.me.username);
  const dispatch = useDispatch()
  console.log('feeditem', feedItem)
  const allComments = useSelector(selectComments);
  const postComments = allComments.filter(comment => feedItem.id === comment.postId )
  console.log(postComments)
  
  useEffect(() => {
    dispatch(asyncFetchComments())
  },[dispatch])




  


  
  return (
    <div>
      {postComments && postComments.length ? 
      postComments.map((comment) => (
        <Box>
          <div>{comment.user.first_name} {comment.user.last_name}</div>
          <div>{comment.text_field}</div>

        </Box> 
        
      )) :
      <Box>
        

      </Box>
      }
    </div>
  );
};

export default Comments;
