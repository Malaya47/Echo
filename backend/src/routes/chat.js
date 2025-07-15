const express = require("express");
const { userAuth } = require("../middlewares/auth");
const chatRouter = express.Router();
const Chat = require("../models/chat");

chatRouter.get("/chats/:targetUserId", userAuth, async (req, res) => {
  try {
    const { targetUserId } = req.params;
    const loggedInUserId = req.user._id;

    const chat = await Chat.findOne({
      participants: { $all: [loggedInUserId, targetUserId] },
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    if (!chat.messages.length) {
      return res.status(404).json({ message: "No messages found in the chat" });
    }

    res.status(200).json({
      message: "Chat fetched successfully",
      data: chat,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching chats",
      error: error.message,
    });
  }
});

module.exports = chatRouter;
