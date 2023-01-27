import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGlobalFeed } from './globalfeedslice';

/**
 * COMPONENT
 */
const GlobalFeed = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const dispatch = useDispatch()

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
