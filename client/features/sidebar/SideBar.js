import React, {useState} from "react";
import { Stack, Typography, Button, Divider, Tab } from "@mui/material";
import { ChatBubble } from "@mui/icons-material";
import { TabList, TabContext } from "@mui/lab";

const SideBar = () => {
    const [view, setView] = useState("1");
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
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Friend 1</Typography>
                <Button variant="contained" color="primary" size="small">
                    <ChatBubble />
                </Button>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Friend 2</Typography>
                <Button variant="contained" color="primary" size="small">
                    <ChatBubble />
                </Button>
                </Stack>
                </Stack>

        </Stack>
    </div>
  );
};

export default SideBar;