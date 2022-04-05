//importing asyncHandler from express-async-handler
const asyncHandler = require("express-async-handler");
const Goal = require("../models/Goalmodule"); //Goal is the name of the collection in the database

// @desc Get all the data from the database
// @route GET /api/goals
// @access private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find(); //find all the data from the database
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
  await Goal.findByIdAndDelete(req.params.id); //delete the goal
  res.status(200).json({
    id: req.params.id,
  });
});

module.exports = { getGoals, createGoal, updateGoal, deleteGoal };
