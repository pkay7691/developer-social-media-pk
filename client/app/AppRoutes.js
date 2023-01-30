import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
// import AuthForm from '../features/auth/AuthForm';
import GlobalFeed from '../features/globalfeed/GlobalFeed';
import Home from '../features/home/Home';
import LandingPage from '../features/landing_page/landing_page';
import { me } from './store';
import Login from '../features/auth/Login';
import SignUp from '../features/auth/SignUp';
import Messages from '../features/messages/Messages';

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} />
          <Route path="/chat" element={<Messages />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/login"
            element={<Login name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<SignUp name="signup" displayName="Sign Up" />}
          />
          <Route
            path="/globalfeed"
            element={<GlobalFeed name="globalfeed" displayName="GlobalFeed" />}
          />
          <Route path='/*' element={<LandingPage/>}/>
        </Routes>
        

      )}
    </div>
  );
};

export default AppRoutes;
