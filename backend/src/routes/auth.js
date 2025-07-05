const express = require("express");
const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");

authRouter.post("/signup", async (req, res) => {
  try {
    //  Vaidation of data
    validateSignupData(req);

    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      photoUrl,
      about,
      skills,
    } = req.body;

    //  Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
      photoUrl,
      about,
      skills,
    });

    const allowedFields = [
      "firstName",
      "lastName",
      "emailId",
      "password",
      "age",
      "gender",
      "photoUrl",
      "about",
      "skills",
    ];
    const isValid = Object.keys(req.body).every((key) =>
      allowedFields.includes(key)
    );

    if (!isValid) {
      throw new Error("Invalid fields in request");
    }
    await user.save();
    res.status(200).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const allowedFields = ["emailId", "password"];
    const isValid = Object.keys(req.body).every((key) =>
      allowedFields.includes(key)
    );
    if (!isValid) {
      throw new Error("Invalid fields in request");
    }

    if (!validator.isEmail(emailId)) {
      throw new Error("Email is not valid");
    }

    if (!emailId || !password) {
      throw new Error("Email and password are required");
    }

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token);

      res.status(200).json({
        message: "Login Successfull",
        user,
      });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(500).json({
      message: "Error logging in",
      error: error.message,
    });
  }
});

authRouter.post("/logout", async (req, res) => {
  res.clearCookie("token", { path: "/" });
  res.status(200).json({
    message: "Logged out successfully",
  });
});

module.exports = authRouter;
