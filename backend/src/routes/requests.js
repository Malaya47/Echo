const express = require("express");
const requestRouter = express.Router();

const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const { validateRequestData } = require("../utils/validation");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      if (!validateRequestData(req)) {
        return res.status(400).json({ message: "Invalid request data" });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingRequest) {
        return res.status(400).json({
          message: "Connection request already exists",
        });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      await connectionRequest.save();

      res.status(200).json({
        message: `Connection request sent successfully to ${toUser.firstName} ${toUser.lastName}`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error sending connection request",
        error: error.message,
      });
    }
  }
);

module.exports = requestRouter;
