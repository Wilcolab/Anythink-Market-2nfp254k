/**
 * Task Controller
 * Handles business logic for task-related operations
 */

const taskModel = require('../models/taskModel');

/**
 * Get all tasks
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getTasks = (req, res) => {
  try {
    const tasks = taskModel.getAllTasks();
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks', details: error.message });
  }
};

/**
 * Add a new task
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const addTask = (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Task text is required' });
    }

    const result = taskModel.addTask(text);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add task', details: error.message });
  }
};

/**
 * Root endpoint - health check
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const healthCheck = (req, res) => {
  res.status(200).json('Hello World');
};

module.exports = {
  getTasks,
  addTask,
  healthCheck
};
