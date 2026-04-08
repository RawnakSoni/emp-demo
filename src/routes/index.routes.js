/**
 * index.routes.js
 * Root router — registers all feature routers under their prefixes.
 */

const { Router } = require('express');
const userRoutes = require('./user.routes');

const router = Router();

router.use('/users', userRoutes);

// Health-check
router.get('/health', (req, res) => {
  res.status(200).json({ success: true, status: 'OK', timestamp: new Date().toISOString() });
});

module.exports = router;
