/**
 * user.routes.js
 * All /api/users routes. Applies middleware per-route where needed.
 */

const { Router } = require('express');
const userController = require('../modules/user/user.controller');
const validateCreateUser = require('../middlewares/validateCreateUser.middleware');

const router = Router();

// POST /api/users  — create a user (body validation applied)
router.post('/', validateCreateUser, userController.createUser);

// GET /api/users   — list all users
router.get('/', userController.getAllUsers);

// GET /api/users/:id — get single user
router.get('/:id', userController.getUserById);

module.exports = router;
