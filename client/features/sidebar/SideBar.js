import React, { useState } from "react";
import { Stack, Typography, Button, Divider, Tab } from "@mui/material";
import { ChatBubble } from "@mui/icons-material";
import { TabList, TabContext } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAsync, selectUser } from "../single_user/singleUserSlice";
import { fetchChat } from "../messages/messagesslice";
import Chatbox from "../messages/Chatbox";

const SideBar = ({receiverId, setReceiverId}) => {
  const [view, setView] = useState("1");

  const loggedInUserId = useSelector((state) => state.auth.me.id);
  const user = useSelector(selectUser)
  const friends = user.friends

  const dispatch = useDispatch()

  const handleGetChat = (friendId) => {

    const chatters = {
      userId: loggedInUserId,
      otherId: friendId
    }
    setReceiverId(friendId)
    dispatch(fetchChat(chatters))

  }

  useState(() => {
    dispatch(fetchUserAsync(loggedInUserId))
  }, [dispatch])

  const chatform = () => {
    return (
      <div>
        <Chatbox />
      </div>
    )
  }


  return (
    <div>
      <Stack direction="column" padding="1rem">
        <Stack direction="row" justifyContent="space-evenly" width="100%">
          <Typography variant="h6">Add Friend</Typography>
          <Button variant="contained" color="primary" size="small">
            <ChatBubble />
          </Button>
        </Stack>
        <Divider />
        {/* We can use the TabContext to control the state of the tabs, and the Tablist to display the tabs, we need to put our tabs in a stack to control the width of the tabs */}
        <TabContext value={view}>
          <TabList
            onChange={(e, value) => setView(value)}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
          >
            <Tab label="Friends" value="1" />
            <Tab label="Requests" value="2" />
            <Tab label="Blocked" value="3" />
          </TabList>
        </TabContext>
        {/* we will use dummy data for friends only */}
        <Stack direction="column" padding="1rem">
          {friends && friends.length ?
            friends.map((friend) =>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">{friend.first_name} {friend.last_name}</Typography>
                <Button variant="contained" color="primary" size="small" onClick={() => handleGetChat(friend.id)}>
                  {/*if chatButton is clicked, we will change the view to the chatbox */}
                  <ChatBubble />
                  
                </Button>
              </Stack>
            )
            :
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">No Friends Available</Typography>
            </Stack>}

        </Stack>

      </Stack>

    </div>
  );
};

export default SideBar;
