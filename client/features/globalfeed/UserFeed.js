import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearFeed, fetchGlobalFeed, selectGlobalFeed } from './globalfeedslice';
import { asyncFetchComments, selectComments } from './commentslice';
import { asyncFetchPostLikes, selectPostLikes } from './postlikesslice';
import { Box, Container, Stack, Avatar } from '@mui/material';
import FeedPost from './FeedPost';
import FeedProject from './FeedProject';
import { asyncFetchCommentLikes, selectCommentLikes } from './commentlikeslice';
import { BookSharp, ConstructionOutlined } from '@mui/icons-material';
import { restartUserFeed, fetchUserFeedById, selectUserFeed, resetUserFeed } from './userfeedslice'
import { useParams } from 'react-router-dom';




/**
 * COMPONENT
 */
const UserFeed = ({profileId}) => {
  const username = useSelector((state) => state.auth.me.username);
  const dispatch = useDispatch()
  const allPostLikes = useSelector(selectPostLikes)
  const feed = useSelector(selectUserFeed)
  console.log('this is feed', feed)
 
  const [pageNumber, setPageNumber] = useState(1)
  const { userId } = useParams();

  

useEffect(() => {
  dispatch(resetUserFeed())
},[userId])

  useEffect(() => {
      const params = {
        page: pageNumber,
        limit: 10,
        id: profileId
      } 
      dispatch(fetchUserFeedById(params))
  
  },[pageNumber])

  const observer = useRef()


  const lastFeedItemref = useCallback(node => {
    if (observer.current) observer.current.disconnect()
  
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting) {
       
        console.log('visible')
        setPageNumber(pageNumber + 1)
        console.log(pageNumber,'pageNumber')
      }

    }) 
    if (node) observer.current.observe(node)
    if (feed.length % 10 !== 0) {
      observer.current.disconnect()
    }
    console.log(node)
  })


 
  
  return (
    <div>
      <button onClick={(e)=> setPageNumber(pageNumber + 1)}>Hi</button>
      <Container maxWidth="sm">
        <Stack spacing={3}>
      {feed && feed.length ? (
        feed.map((feedItem, index) => (
          feedItem.modelType === 'post' && (feed.length === index + 1) ? 
          <div ref={lastFeedItemref} > 
          <FeedPost
          
          key={Math.floor(Math.random() * 10000)} 
          feedItem={feedItem} 
          profileId={profileId}
          />
          </div>
          : 
          
          feedItem.modelType === 'project' && (feed.length === index + 1) ? 
          <div ref={lastFeedItemref}>
          <FeedProject ref={lastFeedItemref} key={Math.floor(Math.random() * 10000)} feedItem={feedItem} />
          </div>
 
            : 
          feedItem.modelType === 'post' ? 
          <FeedPost
          
          key={Math.floor(Math.random() * 10000)} 
          feedItem={feedItem} 
          profileId={profileId}
          />
          :
          feedItem.modelType === 'project' ? 
         <FeedProject key={Math.floor(Math.random() * 10000)} feedItem={feedItem} />

           : 
           
           <div key='notloaded'>hello</div>

        ))
      ) : null}
      </Stack>
      </Container>
    </div>
  );
};

export default UserFeed;
