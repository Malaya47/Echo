const socket = require("socket.io");
const User = require("../models/user");
const Chat = require("../models/chat");
const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: ["http://localhost:5173", "https://echo-xi-dusky.vercel.app"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ userId, targetUserId }) => {
      const room = [userId, targetUserId].sort().join("_");
      console.log("room is", room);
      socket.join(room);
    });

    socket.on(
      "sendMessage",
      async ({ userId, targetUserId, message, firstName }) => {
        try {
          const room = [userId, targetUserId].sort().join("_");

          // before emitting save the message to the database

          // first check if the chat already exsists or not
          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          chat.messages.push({ senderId: userId, text: message });

          await chat.save();

          io.to(room).emit("receiveMessage", {
            userId,
            targetUserId,
            message,
            firstName,
          });
        } catch (error) {
          console.error("Error sending message:", error);
        }
      }
    );

    socket.on("status", async ({ status, userId }) => {
      try {
        await User.findByIdAndUpdate(userId, { status });
        console.log(`User ${userId} status set to ${status}`);
      } catch (error) {
        console.error("Error updating user status:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

module.exports = initializeSocket;
