/**
 * config.js
 * Central configuration file for all connection strings and app settings.
 */

const config = {
  app: {
    port: 3000,
    env: 'development',
  },

  // Database — defaults match your local MySQL setup
  database: {
    host: 'localhost',
    port: 3306,
    name: 'myapp',
    user: 'root',
    password: 'password',
  },

  // JWT / Auth (for future use)
  jwt: {
    secret: 'super-secret-key',
    expiresIn: '7d',
  },
};

module.exports = config;
