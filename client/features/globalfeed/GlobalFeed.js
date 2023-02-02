import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGlobalFeed, selectGlobalFeed } from './globalfeedslice';
import { asyncFetchComments, selectComments } from './commentslice';
import { asyncFetchPostLikes, selectPostLikes } from './postlikesslice';
import { Box, Container, Stack, Avatar } from '@mui/material';
import FeedPost from './FeedPost';
import FeedProject from './FeedProject';
import { asyncFetchCommentLikes } from './commentlikeslice';


/**
 * COMPONENT
 */
const GlobalFeed = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const dispatch = useDispatch()
  const allPostLikes = useSelector(selectPostLikes)
  const globalFeed  = useSelector(selectGlobalFeed)
  const comments = useSelector(selectComments)

  useEffect(() => {
    dispatch(fetchGlobalFeed())
    dispatch(asyncFetchComments())
    dispatch(asyncFetchPostLikes())
    dispatch(asyncFetchCommentLikes())
  },[dispatch])



  
  return (
    <div>
      <Container maxWidth="sm">
        <Stack spacing={3}>
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
