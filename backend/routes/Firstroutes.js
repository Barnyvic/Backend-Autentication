// importing the express module and controllers
const express = require("express");
const router = express.Router();
const {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/Firstcontroller");

// C>U>D>R> api/goals

//get and post request
router.route("/").get(getGoals).post(createGoal);

//delete and update request
router.route("/:id").put(updateGoal).delete(deleteGoal);

module.exports = router;
