/**
 * app.js
 * Express application setup — registers global middleware, routes, and error handler.
 */

const express = require('express');
const routes = require('./routes/index.routes');
const errorHandler = require('./middlewares/errorHandler.middleware');

const app = express();

// ─── Global Middleware ────────────────────────────────────────────────────────
app.use(express.json());               // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api', routes);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route '${req.method} ${req.originalUrl}' not found.`,
  });
});

// ─── Global Error Handler (must be last) ─────────────────────────────────────
app.use(errorHandler);

module.exports = app;
