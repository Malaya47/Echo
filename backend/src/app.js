const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

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

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

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
app.get("/profile", userAuth, async (req, res) => {
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
