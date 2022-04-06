// Importing Jwt,asynHandler and Usermodule
const Jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Usermodule = require("../models/Usermodule");

// @desc    get me user
const protect = asyncHandler(async (req, res, next) => {
  //Get token from header
  const token = req.headers["x-auth-token"];

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" }); //401 unauthorized
  }
  //Verify token
  try {
    //Decode token
    const decoded = Jwt.verify(token, process.env.JWT_SECRET); //process.env.JWT_SECRET is the secret key
    //Add user from payload
    req.user = await Usermodule.findById(decoded.id).select("-User_Password"); //-User_Password is used to exclude the password from the response
    next();
  } catch (err) {
    //Return error
    res.status(400).json({ msg: "Token is not valid" });
  }
});

module.exports = { protect };
