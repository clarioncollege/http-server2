const mongoose = require("mongoose");
const { DB_URI } = require("../config");

const connectDb = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
