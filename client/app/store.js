import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import allUsersSlice from '../features/all_users/allUsersSlice';
import authReducer from '../features/auth/authSlice';
import singleUserSlice from '../features/single_user/singleUserSlice';
import singleReportInboxSlice from '../features/single_report_inbox/singleReportInboxSlice';
import reportUserSlice from '../features/reportUser/reportUserSlice';
import reportInboxSlice from '../features/all_report_inbox/reportInboxSlice';
import globalFeedReducer from '../features/globalfeed/globalfeedslice';
import commentsReducer from '../features/globalfeed/commentslice'
import postLikesReducer from '../features/globalfeed/postlikesslice';
import commentlikesReducer from '../features/globalfeed/commentlikeslice';
import allSupportSlice from '../features/all_support/allSupportSlice';
import singleSupportSlice from '../features/single_support/singleSupportSlice';
import projectSlice from '../features/project_page/projectSlice';


const store = configureStore({
  reducer: { 
    auth: authReducer,
    globalfeed: globalFeedReducer,
    comments: commentsReducer,
    postlikes: postLikesReducer,
    users: allUsersSlice,
    user: singleUserSlice,
    commentlikes: commentlikesReducer,
    reportUser: reportUserSlice,
    reportInbox: reportInboxSlice,
    singleReport: singleReportInboxSlice,
    allSupport: allSupportSlice,
    singleSupport: singleSupportSlice,
    project: projectSlice,
   },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
