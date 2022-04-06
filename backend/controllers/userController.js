// User controller for registering, login, logout, and resetting passwords

// importing  jwt from jsonwebtoken , bcrypt from bcryptjs and asyncHandler from asyncHandler
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usermodule = require("../models/Usermodule");

// @desc    get me user
// @route   GET /api/user/me
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  // distructuring the user from the request
  const { id, user_Name, User_Email } = await Usermodule.findById(
    req.user._id
  ).select("-User_Password");
  res.status(200).json({
    //200 is the status code for success
    //id, user_Name, User_Email are the fields of the database
    success: true,
    id: id,
    name: user_Name,
    Email: User_Email,
  });
});

// @desc    Login user
// @route   POST /api/user/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { User_Email, User_Password } = req.body;

  // Check for user
  const user = await Usermodule.findOne({ User_Email });
  if (user && (await bcrypt.compare(User_Password, user.User_Password))) {
    res.status(200).json({
      id: user.id,
      name: user.User_Name,
      email: user.User_Email,
      mobile: user.User_Mobile,
      token: generateToken(user.id),
    });
  }
  // Return error for invalid user data
  else {
    res.status(400).json({
      msg: "Invalid credentials",
    });
  }
});

// @desc    Register user
// @route   POST /api/user
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  //check if the required fields are filled
  const { user_Name, User_Email, User_Password, User_Mobile } = req.body;
  if (!user_Name || !User_Email || !User_Password || !User_Mobile) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  //check if the user already exists
  const user = await Usermodule.findOne({ User_Email });
  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(User_Password, salt);

  //create the user
  const newUser = await Usermodule.create({
    user_Name,
    User_Email,
    User_Password: hashedPassword,
    User_Mobile,
  });
  //registeration successful
  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      name: newUser.user_Name,
      email: newUser.User_Email,
      mobile: newUser.User_Mobile,
      token: generateToken(newUser.id),
    });
  }
  //registeration failed
  else {
    res.status(400);
    throw new Error("Invalid User");
  }
});

// Generate Token
const generateToken = (id) => {
  //payload
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    //process.env.JWT_SECRET is the secret key
    expiresIn: "1h", //process.env.JWT_EXPIRES_IN is the time in seconds
  });
};

module.exports = { registerUser, loginUser, getUser };
