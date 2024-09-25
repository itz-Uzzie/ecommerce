//file to connect mongodb
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017");
    console.log("Database connection successful");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
