/**
 * Express Server - Main Application Entry Point
 * 
 * This is the main entry point for the Node.js/Express backend server.
 * It sets up the Express application with necessary middleware, routes,
 * and error handling.
 * 
 * Key Features:
 * - RESTful API for task management
 * - CORS support for cross-origin requests
 * - JSON request body parsing
 * - Request logging in development mode
 * - Centralized error handling
 * - Health check endpoint
 * 
 * Environment Variables:
 * - PORT: Server port (default: 8000)
 * - NODE_ENV: Environment mode (development/production/test)
 * - CORS_ORIGIN: Allowed CORS origins (default: '*')
 * 
 * @see {@link ./config/config.js} for configuration details
 * @see {@link ../ENVIRONMENT.md} for environment variable documentation
 * @module index
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config');
const taskRoutes = require('./routes/taskRoutes');
const { healthCheck } = require('./controllers/taskController');

// Initialize Express application
const app = express();

/**
 * CORS Middleware Configuration
 * 
 * Enables Cross-Origin Resource Sharing to allow requests from different domains.
 * In production, configure CORS_ORIGIN environment variable to restrict access
 * to specific domains for security.
 * 
 * @middleware
 */
app.use(cors({ origin: config.corsOrigin }));

/**
 * JSON Body Parser Middleware
 * 
 * Parses incoming requests with JSON payloads.
 * Makes the parsed data available in req.body for all routes.
 * 
 * @middleware
 */
app.use(bodyParser.json());

/**
 * URL-Encoded Body Parser Middleware
 * 
 * Parses incoming requests with URL-encoded payloads (form submissions).
 * Extended mode allows for rich objects and arrays to be encoded.
 * 
 * @middleware
 */
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Request Logging Middleware (Development Only)
 * 
 * Logs incoming HTTP requests to the console for debugging purposes.
 * Only active in development mode to avoid cluttering production logs.
 * 
 * @middleware
 */
if (config.env === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

/**
 * Health Check Route
 * 
 * Root endpoint that returns a simple "Hello World" message.
 * Used to verify the server is running and responding to requests.
 * 
 * @route GET /
 * @returns {string} 200 - "Hello World" message in JSON format
 */
app.get('/', healthCheck);

/**
 * Task Management Routes
 * 
 * Mounts all task-related routes under the root path.
 * Routes are defined in the taskRoutes module.
 * 
 * Available endpoints:
 * - GET  /tasks  - Retrieve all tasks
 * - POST /tasks  - Create a new task
 * 
 * @route /tasks
 */
app.use('/', taskRoutes);

/**
 * 404 Not Found Handler
 * 
 * Catches all requests to undefined routes and returns a 404 error.
 * This middleware runs only if no other routes matched the request.
 * 
 * @middleware
 * @returns {Object} 404 - Error message for undefined routes
 */
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

/**
 * Global Error Handler
 * 
 * Centralized error handling middleware that catches all errors
 * thrown in route handlers or other middleware.
 * 
 * In development mode, it returns the full error message.
 * In production mode, it returns a generic error message for security.
 * 
 * @middleware
 * @param {Error} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} 500 - Error message and details
 */
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: config.env === 'development' ? err.message : undefined
  });
});

/**
 * Server Initialization
 * 
 * Starts the Express server on the configured port.
 * Binds to 0.0.0.0 to allow connections from Docker containers and external sources.
 * Logs the server status and access URL to the console.
 */
app.listen(config.port, '0.0.0.0', () => {
  console.log(`Server is running on port ${config.port}`);
  console.log(`Environment: ${config.env}`);
  console.log(`Access the API at http://localhost:${config.port}`);
});

// Export the app for testing purposes
module.exports = app;
