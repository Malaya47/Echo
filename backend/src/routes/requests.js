const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

module.exports = requestRouter;
