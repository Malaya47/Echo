const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

// Signup API - Register a new user

app.post("/signup", async (req, res) => {
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

// Login API
app.post("/login", async (req, res) => {
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

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Generate a JWT token
      const token = await jwt.sign({ _id: user._id }, "your_secret_key");
      // send token or wrap token in cookie
      res.cookie("token", token);

      res.send("Login sucessfull");
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

// Profile API
app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    // verify the token
    const decoded = await jwt.verify(token, "your_secret_key");
    const { _id } = decoded;

    // find the user by id
    const user = await User.findById(_id);
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

// Feed API - Get all users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
});

//  Delete a user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
});

// update data of the user by userId
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  try {
    const allowedUpdates = ["about", "skills", "photoUrl", "gender", "age"];
    const isUpdateAllowed = Object.keys(data).every((key) =>
      allowedUpdates.includes(key)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills can not be more than 10");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ message: "User updated successfully", user: user });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
