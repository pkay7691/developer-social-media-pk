import React from 'react'
import { useState } from 'react'

function notifications() {
  const [notifications, setNotifications]= useState({
[
  {
    "id": "1",
    "author":{
      "name": "Amy",
      "img": "./images/Amy.jpg",
      "href": "#",
    },
    "text": "reacted to your recent post",
    "link": {
      "text": "Started my first full-stack coding project today",
      "href": "#"
    },
    "time": "1 minute ago",
  }
]
  })

  
  return (

    <div>notifications</div>
  )
}

export default notifications
