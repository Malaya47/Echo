import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { getSocket } from "../utils/socket";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const loggedInUser = useSelector((state) => state.user);
  const userId = loggedInUser?._id;

  const fetchChatMessages = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/chats/${targetUserId}`, {
        withCredentials: true,
      });

      const messages = response.data.data.messages.map((msg) => ({
        senderId: msg.senderId._id,
        text: msg.text,
        firstName: msg.senderId.firstName,
      }));

      setChatMessages(messages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  window.scrollTo(0, document.body.scrollHeight);

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    const socket = getSocket();
    if (socket && socket.connected) {
      socket.emit("joinChat", { userId, targetUserId });

      const handleReceiveMessage = ({
        userId: senderId,
        message: text,
        firstName,
      }) => {
        setChatMessages((prev) => [...prev, { senderId, text, firstName }]);
      };

      socket.on("receiveMessage", handleReceiveMessage);

      return () => {
        socket.off("receiveMessage", handleReceiveMessage);
      };
    }
  }, [userId, targetUserId]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const socket = getSocket();
    socket?.emit("sendMessage", {
      userId,
      targetUserId,
      message,
      firstName: loggedInUser.firstName,
    });

    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-base-200 p-4">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`chat ${
              msg.senderId === userId ? "chat-start" : "chat-end"
            }`}
          >
            <span className="text-sm">{msg.firstName}</span>
            <div className="chat-bubble chat-bubble-primary">{msg.text}</div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="flex items-center gap-2 mt-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="input input-bordered w-full"
        />
        <button onClick={handleSendMessage} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
