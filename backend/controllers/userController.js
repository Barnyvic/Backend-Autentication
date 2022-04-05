// User controller for registering, login, logout, and resetting passwords

// @desc    Register user
// @route   POST /api/user
// @access  Public
const registerUser = (req, res) => {
  res.json({
    message: "Registering user",
  });
};

module.exports = { registerUser };
