// importing  express , userController and router from express
const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");

// importing the auth middleware from the middleware folder
const { protect } = require("../middleware/authMiddleware");

//  Post request to register a user
router.post("/", registerUser);

// Post request to login a user
router.post("/login", loginUser);

// Get request to get a user
router.get("/me", protect, getUser);

module.exports = router;
