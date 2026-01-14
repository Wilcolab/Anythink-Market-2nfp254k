/**
 * Server Configuration Module
 * 
 * This module centralizes all configuration settings for the application.
 * It reads from environment variables and provides sensible defaults.
 * 
 * Environment Variables:
 * - PORT: Server port (default: 8000)
 * - NODE_ENV: Environment mode - 'development', 'production', or 'test' (default: 'development')
 * - CORS_ORIGIN: Allowed CORS origins (default: '*' for development)
 * 
 * @module config
 * @see {@link ../ENVIRONMENT.md} for detailed environment variable documentation
 */

const config = {
  /**
   * Server port number
   * @type {number}
   * @default 8000
   */
  port: process.env.PORT || 8000,

  /**
   * Application environment
   * @type {string}
   * @enum {'development'|'production'|'test'}
   * @default 'development'
   */
  env: process.env.NODE_ENV || 'development',

  /**
   * CORS allowed origins
   * Use '*' for development, specific domain(s) for production
   * @type {string}
   * @default '*'
   * @example 'https://yourdomain.com'
   */
  corsOrigin: process.env.CORS_ORIGIN || '*',
};

module.exports = config;
