import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGlobalFeed, selectGlobalFeed } from './globalfeedslice';
import { Box, Container, Stack, Avatar, Button, ButtonGroup, TextField } from '@mui/material';
import { sizing } from '@mui/system';
import Comments from './Comments';


/**
 * COMPONENT
 */
const FeedPost = ({feedItem}) => {


  const username = useSelector((state) => state.auth.me.username);
  const dispatch = useDispatch()
  console.log('feeditem', feedItem)




  


  
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
              <ButtonGroup variant='outlined' aria-label='outlined button group' sx={{ width: 1 }}>
              
                  <Button sx={{ width: 1/3 }}>Like</Button>
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
