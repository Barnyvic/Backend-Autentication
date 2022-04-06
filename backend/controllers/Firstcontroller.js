//importing asyncHandler from express-async-handler
const asyncHandler = require("express-async-handler");
const Goal = require("../models/Goalmodule"); //Goal is the name of the collection in the database
const Usermodule = require("../models/Usermodule"); //Usermodule is the name of the collection in the database

// @desc Get all the data from the database
// @route GET /api/goals
// @access private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id }); //find all the data from the database
  res.status(200).json(goals); //return the data
});

// @desc Create a new goal
// @route POST /api/goals
// @access private
const createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    //if the text is not provided
    res.status(400);
    throw new Error("Missing test"); //throw an error
  }
  const goal = await Goal.create({
    //create a new goal
    text: req.body.text, //text is the name of the text field in the database
    user: req.user.id, //user is the name of the user field in the database and req.user.id is the id of the user
  });
  res.status(200).json(goal); //return the data
});

// @desc Update a goal
// @route PUT /api/goals/:id
// @access private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id); //find the goal by id
  if (!goal) {
    res.status(404); //if the goal is not found
    throw new Error("Goal not found");
  }

  const usermodule = await Usermodule.findById(req.user.id); //find the user by id

  // Check for  user
  if (!usermodule) {
    res.status(404); //if the user is not found
    throw new Error("User not found");
  }

  // make sure the goal users id matches the logged in user
  if (goal.user.toString() !== usermodule.id) {
    res.status(401); //if the user is not authorized
    throw new Error("Not authorized");
  }

  //if the goal is found
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    //update the goal
    new: true,
    runValidators: true,
  });
  res.status(200).json(updatedGoal); //return the data
});

// @desc Delete a goal
// @route DELETE /api/goals/:id
// @access private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id); //find the goal by id
  if (!goal) {
    res.status(404);
    throw new Error("Goal not found"); //if the goal is not found
  }

  const usermodule = await Usermodule.findById(req.user.id); //find the user by id

  // Check for  user
  if (!usermodule) {
    res.status(404); //if the user is not found
    throw new Error("User not found");
  }

  // make sure the goal users id matches the logged in user
  if (goal.user.toString() !== usermodule.id) {
    res.status(401); //if the user is not authorized
    throw new Error("Not authorized");
  }

  await Goal.findByIdAndDelete(req.params.id); //delete the goal
  res.status(200).json({
    id: req.params.id,
  });
});

module.exports = { getGoals, createGoal, updateGoal, deleteGoal };
