import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGlobalFeed, selectGlobalFeed } from './globalfeedslice';
import { Box, Container, Stack, Avatar } from '@mui/material';
import FeedPost from './FeedPost';
import FeedProject from './FeedProject';


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
          feedItem.modelType === 'post' ? 
          <FeedPost feedItem={feedItem}/>
          :  feedItem.modelType === 'project' ? 
         <FeedProject feedItem={feedItem} />

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
