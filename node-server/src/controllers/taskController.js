/**
 * Task Controller
 * 
 * This module contains controller functions that handle HTTP requests
 * for task-related operations. Controllers act as the intermediary between
 * routes and models, processing requests and formatting responses.
 * 
 * Each controller function follows the Express middleware pattern:
 * - Receives request (req) and response (res) objects
 * - Processes business logic using the TaskModel
 * - Sends appropriate HTTP responses
 * 
 * @module controllers/taskController
 */

const taskModel = require('../models/taskModel');

/**
 * Get All Tasks
 * 
 * Retrieves all tasks from the data store and returns them as a JSON array.
 * This endpoint provides read-only access to the task list.
 * 
 * HTTP Method: GET
 * Endpoint: /tasks
 * Status Code: 200 OK
 * 
 * @param {Object} req - Express request object (not used)
 * @param {Object} res - Express response object
 * @returns {void} Sends JSON response with array of tasks
 * 
 * @example
 * // Request
 * GET http://localhost:8000/tasks
 * 
 * // Response
 * HTTP/1.1 200 OK
 * Content-Type: application/json
 * {
 *   "tasks": [
 *     "Write a diary entry from the future",
 *     "Create a time machine from a cardboard box",
 *     ...
 *   ]
 * }
 */
const getTasks = (req, res) => {
  try {
    // Fetch all tasks from the model
    const tasks = taskModel.getAllTasks();
    
    // Send successful response with task data
    res.status(200).json({ tasks });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error fetching tasks:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve tasks', 
      details: error.message 
    });
  }
};

/**
 * Add New Task
 * 
 * Creates a new task with the provided text and adds it to the data store.
 * Validates that the request body contains a 'text' field before processing.
 * 
 * HTTP Method: POST
 * Endpoint: /tasks
 * Request Body: { "text": "task description" }
 * Success Status: 201 Created
 * Error Status: 400 Bad Request
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing task data
 * @param {string} req.body.text - The text content of the task to add
 * @param {Object} res - Express response object
 * @returns {void} Sends JSON response with success status or error message
 * 
 * @example
 * // Successful Request
 * POST http://localhost:8000/tasks
 * Content-Type: application/json
 * { "text": "Complete documentation" }
 * 
 * // Successful Response
 * HTTP/1.1 201 Created
 * Content-Type: application/json
 * {
 *   "success": true,
 *   "message": "Task added successfully"
 * }
 * 
 * @example
 * // Error Request (missing text)
 * POST http://localhost:8000/tasks
 * Content-Type: application/json
 * {}
 * 
 * // Error Response
 * HTTP/1.1 400 Bad Request
 * Content-Type: application/json
 * {
 *   "error": "Task text is required"
 * }
 */
const addTask = (req, res) => {
  try {
    // Extract task text from request body
    const { text } = req.body;
    
    // Validate that text field exists
    if (!text) {
      return res.status(400).json({ error: 'Task text is required' });
    }

    // Add task using the model
    const result = taskModel.addTask(text);
    
    // Send successful response with 201 Created status
    res.status(201).json(result);
  } catch (error) {
    // Handle validation or other errors
    console.error('Error adding task:', error);
    res.status(400).json({ 
      error: 'Failed to add task', 
      details: error.message 
    });
  }
};

/**
 * Health Check Endpoint
 * 
 * Returns a simple "Hello World" message to verify the server is running.
 * This endpoint is compatible with the Python server's health check format.
 * 
 * HTTP Method: GET
 * Endpoint: /
 * Status Code: 200 OK
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} Sends JSON response with "Hello World" message
 * 
 * @example
 * // Request
 * GET http://localhost:8000/
 * 
 * // Response
 * HTTP/1.1 200 OK
 * Content-Type: application/json
 * "Hello World"
 */
const healthCheck = (req, res) => {
  res.status(200).json('Hello World');
};

module.exports = {
  getTasks,
  addTask,
  healthCheck
};
