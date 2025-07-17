const jwt = require("jsonwebtoken");
const User = require("../models/user");

require("dotenv").config();

const userAuth = async (req, res, next) => {
  try {
    // Read the token from the req cookies
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }

    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized access",
      error: error.message,
    });
  }
};

module.exports = {
  userAuth,
};
