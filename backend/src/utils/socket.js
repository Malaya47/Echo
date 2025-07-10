const socket = require("socket.io");
const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinChat", ({ userId, targetUserId }) => {
      const room = [userId, targetUserId].sort().join("_");

      socket.join(room);
    });

    socket.on("sendMessage", ({ userId, targetUserId, message }) => {
      const room = [userId, targetUserId].sort().join("_");
      io.to(room).emit("receiveMessage", { userId, targetUserId, message });
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

module.exports = initializeSocket;
