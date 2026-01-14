/**
 * Server Configuration
 * Contains environment variables and server settings
 */

const config = {
  port: process.env.PORT || 8000,
  env: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
};

module.exports = config;
