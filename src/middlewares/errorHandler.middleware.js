const config = require('../../config/config.js');

/**
 * errorHandler.middleware.js
 * Global error-handling middleware — must be registered LAST in app.js.
 * Catches all errors thrown/passed via next(err).
 */

const errorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // In production you'd want to avoid leaking stack traces
  const response = {
    success: false,
    message,
    ...(config.app.env !== 'production' && { stack: err.stack }),
  };

  console.error(`[ERROR] ${statusCode} — ${message}`);
  return res.status(statusCode).json(response);
};

module.exports = errorHandler;
