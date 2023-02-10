import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import { acceptFriendRequest, createFriendship, fetchFriendshipsById, selectFriendRequests, updateFriendship ,deleteFriendship } from "../friends/friendshipSlice";

const FriendRequests = () => {

  const loggedInUserId = useSelector((state) => state.auth.me.id);
  const friendRequests = useSelector(selectFriendRequests)
    const dispatch = useDispatch();
    const [renderFriendRequests, setRenderFriendRequests] = useState(false)

    useEffect(() => {
      dispatch(fetchFriendshipsById(loggedInUserId))
    },[dispatch, renderFriendRequests])

    const handleAcceptFriendRequest = (friendship) => {

      const updatedFriendship = {
        id: friendship.id,
        userId: friendship.userId,
        friendId: friendship.friendId,
        friendName: friendship.friendName,
        userName: friendship.userName,
        status: 'isFriend',
        compositeId: `${friendship.userId}&${friendship.friendId} `
      }
      const newFriendship = {
        userId: friendship.friendId,
        friendId: friendship.userId,
        friendName: friendship.userName,
        userName: friendship.friendName,
        status: 'isFriend',
        compositeId: `${friendship.friendId}&${friendship.userId} `
      }
      dispatch(updateFriendship(updatedFriendship))
      dispatch(createFriendship(newFriendship))
      setRenderFriendRequests(!renderFriendRequests)
    }

    const handleRejectFriendRequest = (friendship) => {
      console.log("hello")
      dispatch(deleteFriendship(friendship.id))
      console.log(renderFriendRequests)
      setRenderFriendRequests(!renderFriendRequests)
      console.log(renderFriendRequests)
    }

// TODO: Inconsistent rendering of requests

    //this will return a table of all users
    return (
        <div>
          {friendRequests && friendRequests.length ? friendRequests.map((request) => <div key={`request-${request.id}`}>
          <Link to={`/user/${request.friendId}`}>{request.friendName}</Link>
            <button  onClick={(e) => handleAcceptFriendRequest(request)}>Accept</button>
            <button  onClick={(e) => handleRejectFriendRequest(request)}>Reject</button>
          </div>
         ) : null}
  
   

        </div>
    )

}

export default FriendRequests;
