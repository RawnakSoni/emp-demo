/**
 * user.service.js  (business logic layer)
 * Handles all business rules. Awaits repository Promises (now backed by MySQL).
 */

const { v4: uuidv4 } = require('uuid');
const userRepository = require('./user.repository');

/**
 * Create a new user — validates uniqueness before persisting.
 * @param {{ name: string, email: string, role?: string }} payload
 * @returns {Promise<Object>} Created user
 */
const createUser = async (payload) => {
  const { name, email, role } = payload;

  // Business rule: email must be unique
  const existing = await userRepository.findUserByEmail(email);
  if (existing) {
    const err = new Error(`A user with email '${email}' already exists.`);
    err.statusCode = 409;
    throw err;
  }

  const userData = {
    id: uuidv4(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role: role || 'employee'
  };

  return userRepository.createUser(userData);
};

/**
 * Retrieve all users.
 * @returns {Promise<Array>}
 */
const getAllUsers = async () => {
  return userRepository.findAllUsers();
};

/**
 * Retrieve a single user by ID.
 * @param {string} id
 * @returns {Promise<Object>}
 */
const getUserById = async (id) => {
  const user = await userRepository.findUserById(id);
  if (!user) {
    const err = new Error(`User with id '${id}' not found.`);
    err.statusCode = 404;
    throw err;
  }
  return user;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};
