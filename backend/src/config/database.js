const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://malayatiwari97:malaya1997@cluster101.z8udtp7.mongodb.net/bumble"
  );
};

module.exports = connectDB;
