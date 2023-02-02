import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GlobalFeed from '../globalfeed/GlobalFeed';
import { fetchGlobalFeed } from '../globalfeed/globalfeedslice';
import { asyncFetchComments } from '../globalfeed/commentslice';
import { asyncFetchPostLikes } from '../globalfeed/postlikesslice';
import { asyncFetchCommentLikes } from '../globalfeed/commentlikeslice';


/**
 * COMPONENT
 */

const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchGlobalFeed())
    dispatch(asyncFetchComments())
    dispatch(asyncFetchPostLikes())
    dispatch(asyncFetchCommentLikes())
  },[dispatch])


  return (
    <div>
      <h3>Welcome, {username}</h3>
      <GlobalFeed />
    </div>
  );
};

export default Home;
