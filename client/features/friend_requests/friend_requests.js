import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import { fetchFriendshipsById, selectFriendRequests } from "../friends/friendshipSlice";

const FriendRequests = () => {

  const loggedInUserId = useSelector((state) => state.auth.me.id);
  const friendRequests = useSelector(selectFriendRequests)
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchFriendshipsById(loggedInUserId))
    },[])



    //this will return a table of all users
    return (
        <div>
          {friendRequests && friendRequests.length ? friendRequests.map((request) => 
          <div>
            <div></div>
          </div> )
          :  
          <div></div>}

        </div>
    );

}

export default FriendRequests;
