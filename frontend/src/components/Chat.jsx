import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { getSocket } from "../utils/socket";

const Chat = () => {
  const { targetUserId } = useParams();
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    // Dummy initial messages
    { senderId: "dummy1", text: "Hello there!" },
    { senderId: "dummy2", text: "General Kenobi!" },
  ]);

  const loggedInUser = useSelector((state) => state.user);
  const userId = loggedInUser?._id;

  useEffect(() => {
    const socket = getSocket();
    if (socket && socket.connected) {
      socket.emit("joinChat", { userId, targetUserId });

      const handleReceiveMessage = ({ userId: senderId, message: text }) => {
        setChatMessages((prev) => [...prev, { senderId, text }]);
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
