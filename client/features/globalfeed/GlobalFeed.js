import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGlobalFeed, selectGlobalFeed } from './globalfeedslice';
import { asyncFetchComments } from './commentslice';
import { asyncFetchPostLikes } from './postlikesslice';
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
    dispatch(asyncFetchComments())
    dispatch(asyncFetchPostLikes())
  },[dispatch])
  


  
  return (
    <div>
      <Container maxWidth="sm">
        <Stack spacing={1}>
      {globalFeed && globalFeed.length ? (
        globalFeed.map((feedItem) => (
          feedItem.modelType === 'post' ? 
          <FeedPost key={`global-feed-post-${feedItem.id}`}feedItem={feedItem}/>
          :  feedItem.modelType === 'project' ? 
         <FeedProject key={`global-feed-project-${feedItem.id}`} feedItem={feedItem} />

           : 
           
           <div key='notloaded'>hello</div>

        ))
      ) : null}
      </Stack>
      </Container>
    </div>
  );
};

export default GlobalFeed;
