import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGlobalFeed, selectGlobalFeed } from './globalfeedslice';
import { Box, Container, Stack, Avatar } from '@mui/material';


/**
 * COMPONENT
 */
const GlobalFeed = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const dispatch = useDispatch()

  const globalFeed  = useSelector(selectGlobalFeed)

  useEffect(() => {
    dispatch(fetchGlobalFeed())
  },[dispatch])
  


  
  return (
    <div>
      <Container maxWidth="sm">
        <Stack spacing={1}>
      {globalFeed && globalFeed.length ? (
        globalFeed.map((feedItem) => (
          feedItem.modelType === 'post' && feedItem.projectId ? 
            <Box className='border'>
              <div className='flex flex-row'> 
                <Avatar src={feedItem.user.img_url} />
                <div>{feedItem.user.first_name} {feedItem.user.last_name} {feedItem.project.project_name}</div>
              </div>
             
              <div>{feedItem.title}</div>
              <div>{feedItem.url}</div>
              <div>{feedItem.description}</div>
            </Box>
          : feedItem.modelType === 'post' ? 
          <Box className='border'>
              <div className='flex flex-row'> 
                <Avatar src={feedItem.user.img_url} />
                <div>{feedItem.user.first_name} {feedItem.user.last_name} </div>
              </div>
              <div>{feedItem.title}</div>
              <div>{feedItem.url}</div>
              <div>{feedItem.description}</div>
            </Box>
          :  feedItem.modelType === 'project' ? 
          <Box className='border'>
       
            <div>New Project: {feedItem.project_name}</div>
            <div>{feedItem.project_type}</div>
            <div>Status: {feedItem.status}</div>
            <div>Tecnhologies: {feedItem.technologies}</div>
          </Box>

           : feedItem.modelType === 'comment' ?
           <div>
            <div>{feedItem.user.first_name} {feedItem.user.last_name}</div>
              <div>{feedItem.title}</div>
              <div>{feedItem.url}</div>
              <div>{feedItem.description}</div>
           </div>
           :
           
           <div>hello</div>

        ))
      ) : <div></div>}
      </Stack>
      </Container>
    </div>
  );
};

export default GlobalFeed;
