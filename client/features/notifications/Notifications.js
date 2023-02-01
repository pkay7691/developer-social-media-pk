import React from "react";
import { useState } from "react";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
  Container,
  Collapse,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Stack,
} from "@mui/material";

function Notifications() {
  // this is just dummy data for the notifications page
  const [notifications, setNotifications] = useState(
    [
    {
      id: "1",
      author: {
        name: "Amy",
        src: "./images/Amy.jpg",
        href: "#",
      },
      text: "reacted to your recent post",
      link: {
        text: "Started my first full-stack coding project today",
        href: "#",
      },
      time: "1m ago",
      isUnRead: false,
    },
    {
      id: "2",
      author: {
        name: "Bernedette",
        src: "./images/Bernedette.jpg",
        href: "#",
      },
      text: "followed you",
      time: "6m ago",
      isUnRead: false,
    },
    {
      id: "3",
      author: {
        name: "Dwight",
        src: "./images/Dwight.jpg",
        href: "#",
      },
      text: "Wants to be your friend",
      time: "10m ago",
      isUnRead: false,
    },
    {
      id: "4",
      author: {
        name: "Jim",
        src: "./images/Jim.jpg",
        href: "#",
      },
      text: "has joined your group",
      time: "7m ago",
      isUnRead: false,
    },
    {
      id: "5",
      author: {
        name: "Michael",
        src: "./images/Michael.jpg",
        href: "#",
      },
      text: "Wants to you to join Paper Fan club",
      time: "1 week ago",
      isUnRead: false,
    },
  ]);

function markAllRead(){
  setNotifications((prev) =>prev.map(n =>({...
    n, isUnRead: false})))
}

function handleNotificationClick(id){
  setNotifications((prev)=>prev.map(n =>(
    n.id === id
    ?{...n, isUnRead: false}
    :n
  )))
}

  return <div>

<div className="container">
  {/*  this is the header and I am looping through all of the objects that are unread */}
    <header>
       <h1>Notifications</h1>
      <span className="isRead">{notifications.filter(n=>n.isUnRead).length}</span>
      <button className="read" onClick={markAllRead}>Mark all as read</button>
    </header>
    {/* looping this the notifications them selves to load them on the screen with the text, image and links */}
    {notifications && notifications.map
    ((n) => (
    <div key={n.id} onClick={()=> handleNotificationClick(n.id)}>
      <img src={n.src} alt={n.author.name} />
      <div>
        <div className="post-text">
          <a href={n.author.href}>
          {n.author.name}
        </a>
        <p>{n.text}</p>
        {n.link && (
          <a href={ n.link.href}></a>
        )}
        <span class={n.unread && "isUnRead"}></span>
        </div>
        <p className="time">{n.time}</p>
      </div>
      {n.image && (<a href={n.image.href}>
      <img src={n.image.src} alt={n.image.alt} /> </a>)}
    </div>
    ))}
</div>
    </div>;
}

export default notifications;
