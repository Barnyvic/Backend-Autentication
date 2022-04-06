// importing the express module and controllers
const express = require("express");
const router = express.Router();
const {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/Firstcontroller");

// bring in the protect middleware
const { protect } = require("../middleware/authMiddleware");

// C>U>D>R> api/goals

//get and post request
router.route("/").get(protect, getGoals).post(protect, createGoal);

//delete and update request
router
  .route("/:id")
  .put(protect, updateGoal)
  .delete(protect, deleteGoal)
  .put(protect, updateGoal);

module.exports = router;
