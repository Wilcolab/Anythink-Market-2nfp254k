/**
 * Task Routes
 * 
 * This module defines the HTTP routes for task-related operations.
 * Routes map URL endpoints to controller functions that handle the business logic.
 * 
 * Route Structure:
 * - GET  /tasks  - Retrieve all tasks
 * - POST /tasks  - Create a new task
 * 
 * All routes are prefixed with '/tasks' when mounted in the main application.
 * 
 * @module routes/taskRoutes
 */

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

/**
 * GET /tasks
 * 
 * Retrieve all tasks from the system
 * 
 * @route GET /tasks
 * @group Tasks - Operations related to task management
 * @returns {Object} 200 - JSON object containing array of tasks
 * @returns {Object} 500 - Error message if retrieval fails
 * 
 * @example Response:
 * {
 *   "tasks": [
 *     "Write a diary entry from the future",
 *     "Create a time machine from a cardboard box"
 *   ]
 * }
 */
router.get('/tasks', taskController.getTasks);

/**
 * POST /tasks
 * 
 * Create and add a new task to the system
 * 
 * @route POST /tasks
 * @group Tasks - Operations related to task management
 * @param {string} text.body.required - The text content of the task
 * @returns {Object} 201 - Success message with task details
 * @returns {Object} 400 - Error message if validation fails
 * 
 * @example Request Body:
 * {
 *   "text": "Complete project documentation"
 * }
 * 
 * @example Response:
 * {
 *   "message": "Task added successfully"
 * }
 */
router.post('/tasks', taskController.addTask);

// Export the router to be mounted in the main application
module.exports = router;

