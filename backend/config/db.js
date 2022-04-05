//importing mongoose from mongoose
const mongoose = require("mongoose");

const connectDB = async () => {
  //try to connect to the database
  try {
    //connecting to the database
    await mongoose.connect(process.env.MONGO_URI); //process.env.MONGO_URI is the environment variable that is set in the .env file
    console.log("MongoDB Connected...".green.inverse.bold); //green is the color of the text, inverse is the color of the background, bold is the font style
  } catch (err) {
    console.error(err.message.red); //red is the color of the text
    process.exit(1); //process.exit(1) is the exit code
  }
};

module.exports = connectDB;
