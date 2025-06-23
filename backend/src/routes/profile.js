const express = require("express");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");

const { userAuth } = require("../middlewares/auth");
const {
  validateEditProfileData,
  validatePassowrdData,
} = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User does not exsist");
    }
    res.send(user);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching profile",
      error: error.message,
    });
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();
    res.status(200).json({
      message: `${loggedInUser.firstName} ${loggedInUser.lastName}'s profile updated successfully`,
      user: loggedInUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating profile",
      error: error.message,
    });
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!validatePassowrdData(req)) {
      throw new Error("Invalid Password Request");
    }

    const loggedInUser = req.user;

    const currentPasswordHash = loggedInUser.password;

    const isCurrentPasswordValid = await loggedInUser.validatePassword(
      currentPassword
    );

    if (!isCurrentPasswordValid) {
      throw new Error("Invalid Current Password");
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    loggedInUser.password = newPasswordHash;

    await loggedInUser.save();
    res.status(200).json({
      message: `${loggedInUser.firstName} ${loggedInUser.lastName} password updated successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating password",
      error: error.message,
    });
  }
});

module.exports = profileRouter;
