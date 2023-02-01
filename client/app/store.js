import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import allUsersSlice from '../features/all_users/allUsersSlice';
import authReducer from '../features/auth/authSlice';
import singleUserSlice from '../features/single_user/singleUserSlice';

import globalFeedReducer from '../features/globalfeed/globalfeedslice';
import commentsReducer from '../features/globalfeed/commentslice'
import postLikesReducer from '../features/globalfeed/postlikesslice';
import commentlikesReducer from '../features/globalfeed/commentlikeslice';

const store = configureStore({
  reducer: { 
    auth: authReducer,
    globalfeed: globalFeedReducer,
    comments: commentsReducer,
    postlikes: postLikesReducer,
    users: allUsersSlice,
    user: singleUserSlice,
    commentlikes: commentlikesReducer,
   },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
