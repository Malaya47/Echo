const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = [
  "firstName",
  "lastName",
  "age",
  "gender",
  "photoUrl",
  "about",
  "skills",
];

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const receivedRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

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

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    // loggedInUser ---> connections --> status: "accepted" + toUserId = loggedInUserId._id or fromUserId = loggedInUserId._id
    const loggedInUser = req.user;

    const connections = await ConnectionRequest.find({
      $or: [
        {
          fromUserId: loggedInUser._id,
          status: "accepted",
        },
        {
          toUserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connections.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.status(200).json({
      message: "Connections fetched successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured while fetching connections",
      error: error.message,
    });
  }
});

module.exports = userRouter;
