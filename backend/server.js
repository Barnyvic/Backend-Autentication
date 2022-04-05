// importing the express module dotenv and errorhandler from the middleware folder and database from config folder
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errormiddleware");
const port = process.env.PORT || 4000;

// initializing the express app, dotenv and setting the port
dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// importing the routes
app.use("/api/goal", require("./routes/Firstroutes"));
app.use("/api/user", require("./routes/Userroutes"));

// error handling middleware
app.use(errorHandler);

// starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
