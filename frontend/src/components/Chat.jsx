import React, { useEffect } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";

const Chat = () => {
  const { toUserId } = useParams();

  useEffect(() => {
    const socket = createSocketConnection();

    socket.emit("join", { toUserId });
  }, []);

  return (
    <div className="flex flex-col h-screen bg-base-200 p-4">
      {/* Chat bubbles area */}
      <div className="flex-1 overflow-y-auto space-y-2">
        <div className="chat chat-start">
          <div className="chat-bubble chat-bubble-primary">
            What kind of nonsense is this
          </div>
        </div>
        <div className="chat chat-start">
          <div className="chat-bubble chat-bubble-secondary">
            Put me on the Council and not make me a Master!??
          </div>
        </div>
        <div className="chat chat-start">
          <div className="chat-bubble chat-bubble-accent">
            That's never been done in the history of the Jedi.
          </div>
        </div>
        <div className="chat chat-start">
          <div className="chat-bubble chat-bubble-neutral">It's insulting!</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble chat-bubble-info">Calm down, Anakin.</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble chat-bubble-success">
            You have been given a great honor.
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble chat-bubble-warning">
            To be on the Council at your age.
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble chat-bubble-error">
            It's never happened before.
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="flex items-center gap-2 mt-4">
        <input
          type="text"
          // value={message}
          // onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="input input-bordered w-full"
        />
        <button className="btn btn-primary">Send</button>
      </div>
    </div>
  );
};

export default Chat;
