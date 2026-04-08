/**
 * validateCreateUser.middleware.js
 * Validates the request body for POST /api/users.
 * Returns 400 with descriptive errors if validation fails.
 */

const validateCreateUser = (req, res, next) => {
  const errors = [];
  const { name, email, role } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push('`name` is required and must be a non-empty string.');
  }

  if (!email || typeof email !== 'string' || email.trim() === '') {
    errors.push('`email` is required and must be a non-empty string.');
  } else {
    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.push('`email` must be a valid email address.');
    }
  }

  const validRoles = ['admin', 'manager', 'employee'];
  if (role && !validRoles.includes(role)) {
    errors.push(`\`role\` must be one of: ${validRoles.join(', ')}.`);
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed.',
      errors,
    });
  }

  next();
};

module.exports = validateCreateUser;
