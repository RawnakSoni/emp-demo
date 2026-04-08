/**
 * index.js  — Application entry point
 * Initialises DB connection then starts the HTTP server.
 */

const app = require('./src/app');
const config = require('./config/config');
require('./config/db'); // Establishes MySQL connection on startup

const PORT = config.app.port;

app.listen(PORT, () => {
  console.log(`✅  Employee Management API running on http://localhost:${PORT}`);
  console.log(`   Environment : ${config.app.env}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
});
