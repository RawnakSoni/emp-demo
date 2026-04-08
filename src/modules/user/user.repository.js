/**
 * user.repository.js
 * Data access layer — executes raw MySQL queries via the shared db connection.
 * All methods return Promises for async/await usage in the service layer.
 */

const db = require('../../../config/db');

/**
 * Create a new user record.
 * @param {{ name: string, email: string, role: string, id: string }} userData
 * @returns {Promise<Object>} The inserted user row
 */
const createUser = (userData) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO users (id, name, email, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, NOW(), NOW())
    `;
    const values = [userData.id, userData.name, userData.email, userData.role];

    db.query(sql, values, (err) => {
      if (err) return reject(err);
      resolve(userData);
    });
  });
};

/**
 * Retrieve all users.
 * @returns {Promise<Array>}
 */
const findAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users ORDER BY created_at DESC', (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

/**
 * Find a single user by ID.
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

/**
 * Find a user by email (used for uniqueness checks).
 * @param {string} email
 * @returns {Promise<Object|null>}
 */
const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

module.exports = {
  createUser,
  findAllUsers,
  findUserById,
  findUserByEmail,
};
