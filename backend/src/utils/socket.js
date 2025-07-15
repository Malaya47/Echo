const socket = require("socket.io");
const User = require("../models/user");
const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ userId, targetUserId }) => {
      const room = [userId, targetUserId].sort().join("_");
      console.log("room is", room);
      socket.join(room);
    });

    socket.on("sendMessage", ({ userId, targetUserId, message }) => {
      const room = [userId, targetUserId].sort().join("_");
      io.to(room).emit("receiveMessage", { userId, targetUserId, message });
    });

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
