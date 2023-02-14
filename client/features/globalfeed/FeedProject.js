import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGlobalFeed, selectGlobalFeed } from './globalfeedslice';
import { Box, Container, Stack, Avatar, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';


/**
 * COMPONENT
 */
const FeedProject = ({feedItem}) => {


  const username = useSelector((state) => state.auth.me.username);
  const dispatch = useDispatch()





  


  
  return (
    <div>
            <Box sx={{padding: '18px', textAlign: 'center'}}className='border'>
       
       <Typography variant='h6'>New Project:</Typography>
       <Typography sx={{marginBottom: '10px'}} variant='h4'>{feedItem.project_name}</Typography>
      <a href={feedItem.github_url}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <GitHubIcon sx={{marginRight: '5px'}}/> 
      <Typography>{feedItem.github_url}</Typography>
      </div> 
      </a>
      
       <Typography>Type: {feedItem.project_type}</Typography>
       <Typography>Status: {feedItem.status}</Typography>
       <Typography>Tecnhologies: {feedItem.technologies}</Typography>
     </Box>
    </div>
  );
};

export default FeedProject;
