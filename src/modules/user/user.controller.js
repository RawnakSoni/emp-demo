/**
 * user.controller.js
 * Handles HTTP request/response. Delegates to the async service layer.
 */

const userService = require('./user.service');

/**
 * POST /api/users — Create a new user
 */
const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    return res.status(201).json({
      success: true,
      message: 'User created successfully.',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/users — Return all users
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/users/:id — Return a single user by ID
 */
const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};
