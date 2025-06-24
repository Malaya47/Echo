const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const receivedRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "age",
      "gender",
      "photoUrl",
      "about",
      "skills",
    ]);

    if (!receivedRequests) {
      throw new Error("No requests found");
    }

    res.status(200).json({
      message: "Requests fetched successfully",
      data: receivedRequests,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured while fetching requests",
      error: error.message,
    });
  }
});

module.exports = userRouter;
