import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import GlobalFeed from "../features/globalfeed/GlobalFeed";
import Home from "../features/home/Home";
import LandingPage from "../features/landing_page/landing_page";
import { me } from "./store";
import Login from "../features/auth/Login";
import SignUp from "../features/auth/SignUp";
import AllReportInbox from "../features/all_report_inbox/reportInbox";
import AllUsers from "../features/all_users/allUsers";
import SingleUser from "../features/single_user/singleUser";
import ReportUser from "../features/reportUser/reportUser";
import Messages from "../features/messages/Messages";
import Banned from "../features/banned/Banned";
import ContactUs from "../features/contactUs/ContactUs";
import SingleReport from "../features/single_report_inbox/singleReportInbox";

import Notifications from "../features/notifications/Notifications";

import {useLocation} from 'react-router-dom'

import EditUser from '../features/update_profile/EditUser';

import RequestSupport from "../features/requestSupport/requestSupport";
import AllSupport from "../features/all_support/AllSupport";
import SingleSupport from "../features/single_support/singleSupport";
import Project from "../features/project_page/project";
import FriendRequests from "../features/friend_requests/friend_requests";
import AllProjects from "../features/all_project/allproject";




/**
 * COMPONENT
 */

const AppRoutes = () => {
  const router = useLocation()
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isBanned = useSelector((state) => state.auth.me.is_banned);
  const dispatch = useDispatch();
  console.log('is logged in ', isLoggedIn)
  console.log('is banned ', isBanned)

  useEffect(() => {
    if(router.search.includes('token')){
      
      const TOKEN = 'token'
      window.localStorage.setItem(TOKEN, router.search.slice(7))
    //getting search property from use location hook from react router dom and slicing the part to get token
    // npm package call query string where you get and value. 
  }
    dispatch(me());
  }, []);

  return (
    <div>
      {isBanned ? (
        <Routes>
          <Route path="/*" element={<Banned />} />
          <Route path="/contactUs" element={<ContactUs />} />
        </Routes>
      ) : isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} />
          <Route path="/chat" element={<Messages />} />

          <Route path='/edituser' element={<EditUser/>}/>

          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/users/:userId/reportUser" element={<ReportUser />} />
          <Route path="/users" element={<AllUsers />} />

          <Route path='/users/:userId' element={<SingleUser/>}/>
          <Route path="/support" element={<RequestSupport />} />
          <Route path="/supportTickets" element={<AllSupport />} />
          <Route path="/support/:id" element={<SingleSupport />} />
          <Route path="/project/:projectId" element={<Project/>}/>
          <Route path='/friendrequests' element={<FriendRequests />} />
          <Route path="/notifications" element={<Notifications/>} />
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

          <Route path='/edituser' element={<EditUser/>}/>
          <Route path="/users/:userId/reportUser" element={<ReportUser />} />
          <Route path="/*" element={<LandingPage />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/users/:userId" element={<SingleUser />} />
          <Route path="/report" element={<AllReportInbox />} />
          <Route path="/report/:reportId" element={<SingleReport />} />
          <Route path="/users/:userId/requestSupport" element={<RequestSupport />} />
          <Route path="/supportTickets" element={<AllSupport />} />
          <Route path="/project/:projectId" element={<Project/>}/>
          <Route path="/notifications" element={<Notifications/>} />
          <Route path="/project" element={<AllProjects/>}/>
        </Routes>

      )}
    </div>
  );
};

export default AppRoutes;
