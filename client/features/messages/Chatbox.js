import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFriendshipById,
  selectFriendRequests,
} from "../friends/friendshipSlice";
import { fetchUserAsync, selectUser } from "../single_user/singleUserSlice";
import { selectChat, fetchChat, sendMessage } from "./messagesslice";
import { useParams, useNavigate } from "react-router-dom";

const Chatbox = ({receiverId}) => {
  const dispatch = useDispatch();
  //pulls the logged in user's id from the redux store
  const userId = useSelector((state) => state.auth.me.id);
  //pulls the user's friends from the redux store
  const user = useSelector(selectUser);
  const chat = useSelector(selectChat);
  console.log(chat, "chat")
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
//   const friendId =
//     chat && chat.length && userId === chat[0].senderId
//       ? chat[0].receiverId
//       : chat && chat.length && userId === chat[0].receiverId
//       ? chat[0].senderId
//       : null;

      console.log(receiverId, "friendId")
  const chats = {
    userId: userId,
    otherId: receiverId,
  };

  useEffect(() => {
    dispatch(fetchChat(chats));
  }, [dispatch]);

  useEffect(() => {
    setMessages(chat);
  }, [chat]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const messageObj = {
      content: message,
      senderId: userId,
      receiverId: receiverId,
    };
    console.log(messageObj, "messageObj");
    dispatch(sendMessage(messageObj)).then(() => {
      dispatch(fetchChat(chats));
    });
  };

  return (
    <div className="container truncate overflow-hidden">
      <div style={{ overflow: "hidden" }}>
        {messages.map((message) =>
          message.senderId === userId ? (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "1rem",
                  margin: "1rem",
                  borderRadius: "1rem",
                }}
              >
                {message.content}
                <br />
                <small className="bg-gray-500 text-xs italic underline">
                  {message.createdAt}
                </small>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div
                style={{
                  backgroundColor: "green",
                  color: "white",
                  padding: "1rem",
                  margin: "1rem",
                  borderRadius: "1rem",
                }}
              >
                {message.content}
                <br />
                <small className="bg-gray-500 text-xs italic underline">
                  {message.createdAt}
                </small>
              </div>
            </div>
          )
        )}
      </div>
      {/*sticky footer*/}
      <div style={{ position: "absolute", bottom: "0rem", right: "10px" }}>
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chatbox;
