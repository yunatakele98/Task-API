const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

/**
 * Task Routes
 * Base URL: /api/tasks
 * 
 * IMPORTANT: Specific routes must come before generic routes
 * to avoid route matching conflicts
 */

// GET /api/tasks - Get all tasks
router.get('/', taskController.getAllTasks);

// GET /api/tasks/status/:status - Get tasks by status (SPECIFIC - before :id)
router.get('/status/:status', taskController.getTasksByStatus);

// GET /api/tasks/priority/:priority - Get tasks by priority (SPECIFIC - before :id)
router.get('/priority/:priority', taskController.getTasksByPriority);

// GET /api/tasks/:id - Get a single task by ID (GENERIC - after specific routes)
router.get('/:id', taskController.getTaskById);

// POST /api/tasks - Create a new task
router.post('/', taskController.createTask);

// PUT /api/tasks/:id - Update a task
router.put('/:id', taskController.updateTask);

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', taskController.deleteTask);

module.exports = router;

// Made with Bob
