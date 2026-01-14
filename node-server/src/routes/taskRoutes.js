/**
 * Task Routes
 * Defines API endpoints for task operations
 */

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// GET /tasks - Retrieve all tasks
router.get('/tasks', taskController.getTasks);

// POST /tasks - Add a new task
router.post('/tasks', taskController.addTask);

module.exports = router;
