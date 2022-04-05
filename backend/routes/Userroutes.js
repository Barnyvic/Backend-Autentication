// importing  express , userController and router from express
const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/userController");

//  Post request to register a user
router.post("/", registerUser);

module.exports = router;
