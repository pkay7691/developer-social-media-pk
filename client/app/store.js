import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import allUsersSlice from '../features/all_users/allUsersSlice';
import authReducer from '../features/auth/authSlice';
import singleUserSlice from '../features/single_user/singleUserSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: allUsersSlice,
    user: singleUserSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
