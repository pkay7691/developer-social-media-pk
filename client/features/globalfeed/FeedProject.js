import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGlobalFeed, selectGlobalFeed } from './globalfeedslice';
import { Box, Container, Stack, Avatar } from '@mui/material';


/**
 * COMPONENT
 */
const FeedProject = ({feedItem}) => {


  const username = useSelector((state) => state.auth.me.username);
  const dispatch = useDispatch()





  


  
  return (
    <div>
            <Box className='border'>
       
       <div>New Project: {feedItem.project_name}</div>
       <div>{feedItem.project_type}</div>
       <div>Status: {feedItem.status}</div>
       <div>Tecnhologies: {feedItem.technologies}</div>
     </Box>
    </div>
  );
};

export default FeedProject;
