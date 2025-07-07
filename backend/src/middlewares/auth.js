const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Read the token from the req cookies
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }

    const decodedObj = await jwt.verify(token, "your_secret_key");

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
