import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import globalFeedReducer from '../features/globalfeed/globalfeedslice';
import commentsReducer from '../features/globalfeed/commentslice'
import postLikesReducer from '../features/globalfeed/postlikesslice';

const store = configureStore({
  reducer: { 
    auth: authReducer,
    globalfeed: globalFeedReducer,
    comments: commentsReducer,
    postlikes: postLikesReducer,
   },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
