import React from 'react'
import { useState } from 'react'

function notifications() {
  const [notifications, setNotifications]= useState(
[
  {
    "id": "1",
    "author": {
      "name": "Amy",
      "img": "./images/Amy.jpg",
      "href": "#"
    },
    "text": "reacted to your recent post",
    "link": {
      "text": "Started my first full-stack coding project today",
      "href": "#"
    },
    "time": "1m ago",
    "hasBeenRead": false,
  },
  {
    "id": "2",
    "author": {
      "name": "Bernedette",
      "img": "./images/Bernedette.jpg",
      "href": "#"
    },
    "text": "followed you",
    "time": "6m ago",
    "hasBeenRead": false,
  },
  {
    "id": "3",
    "author": {
      "name": "Dwight",
      "img": "./images/Dwight.jpg",
      "href": "#"
    },
    "text": "Wants to be your friend",
    "time": "10m ago",
    "hasBeenRead": false,
  },
  {
    "id": "4",
    "author": {
      "name": "Jim",
      "img": "./images/Jim.jpg",
      "href": "#"
    },
    "text": "has joined your group",
    "time": "7m ago",
    "hasBeenRead": false,
  },
  {
    "id": "5",
    "author": {
      "name": "Michael",
      "img": "./images/Michael.jpg",
      "href": "#"
    },
    "text": "Wants to you to join paper Fan club",
    "time": "1 week ago",
    "hasBeenRead": false,
  }
]
  );


  return (

    <div>notifications</div>
  )
}

export default notifications
