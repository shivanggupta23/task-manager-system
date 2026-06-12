const User = require('../models/User');

// @route   GET /api/v1/users
// @desc    Get all users (admin only)
// @access  Private/Admin
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers };
