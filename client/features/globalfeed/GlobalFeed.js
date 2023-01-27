import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGlobalFeed, selectGlobalFeed } from './globalfeedslice';

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
      <h3>Global Feed</h3>
    </div>
  );
};

export default GlobalFeed;
