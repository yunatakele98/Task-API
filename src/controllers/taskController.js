const Task = require('../models/Task');

/**
 * Task Controller
 * Handles HTTP requests for task operations
 */

/**
 * Get all tasks
 */
async function getAllTasks(req, res) {
    try {
        const tasks = await Task.getAllTasks();
        
        res.json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

/**
 * Get a single task by ID
 */
async function getTaskById(req, res) {
    try {
        const { id } = req.params;
        
        const task = await Task.getTaskById(id);
        
        if (!task) {
            return res.status(404).json({
                success: false,
                error: 'Task not found'
            });
        }
        
        res.json({
            success: true,
            data: task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

/**
 * Create a new task
 */
async function createTask(req, res) {
    try {
        const taskData = req.body;
        
        // Validate
        const validation = Task.validateTask(taskData);
        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                errors: validation.errors
            });
        }
        
        const newTask = await Task.createTask(taskData);
        
        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: newTask
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

/**
 * Update an existing task
 */
async function updateTask(req, res) {
    try {
        const { id } = req.params;
        const updates = req.body;
        
        // Validate updates
        const validation = Task.validateTask(updates, true);
        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                errors: validation.errors
            });
        }
        
        const updatedTask = await Task.updateTask(id, updates);
        
        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                error: 'Task not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Task updated successfully',
            data: updatedTask
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

/**
 * Delete a task
 */
async function deleteTask(req, res) {
    try {
        const { id } = req.params;
        
        const deleted = await Task.deleteTask(id);
        
        if (!deleted) {
            return res.status(404).json({
                success: false,
                error: 'Task not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Task deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

/**
 * Get tasks by status
 */
async function getTasksByStatus(req, res) {
    try {
        const { status } = req.params;
        
        // Validate status
        const validStatuses = ['pending', 'in-progress', 'completed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid status. Must be: pending, in-progress, or completed'
            });
        }
        
        const tasks = await Task.getTasksByStatus(status);
        
        res.json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

/**
 * Get tasks by priority
 */
async function getTasksByPriority(req, res) {
    try {
        const { priority } = req.params;
        
        // Validate priority
        const validPriorities = ['low', 'medium', 'high'];
        if (!validPriorities.includes(priority)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid priority. Must be: low, medium, or high'
            });
        }
        
        const tasks = await Task.getTasksByPriority(priority);
        
        res.json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    getTasksByStatus,
    getTasksByPriority
};

// Made with Bob
