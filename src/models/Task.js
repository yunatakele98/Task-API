const { v4: uuidv4 } = require('uuid');
const { readTasks, writeTasks } = require('../utils/fileStorage');

/**
 * Task Model
 * Handles all task-related data operations
 */

/**
 * Get all tasks
 * @returns {Promise<Array>} Array of all tasks
 */
async function getAllTasks() {
    try {
        const tasks = await readTasks();
        return tasks;
    } catch (error) {
        throw new Error(`Error getting tasks: ${error.message}`);
    }
}

/**
 * Get a single task by ID
 * @param {string} id - Task ID
 * @returns {Promise<Object|null>} Task object or null if not found
 */
async function getTaskById(id) {
    try {
        const tasks = await readTasks();
        const task = tasks.find(t => t.id === id);
        return task || null;
    } catch (error) {
        throw new Error(`Error getting task: ${error.message}`);
    }
}

/**
 * Create a new task
 * @param {Object} taskData - Task data (title, description, priority, dueDate)
 * @returns {Promise<Object>} Created task object
 */
async function createTask(taskData) {
    try {
        const tasks = await readTasks();
        
        // Create new task with generated fields
        const newTask = {
            id: uuidv4(),
            title: taskData.title,
            description: taskData.description || '',
            status: 'pending',
            priority: taskData.priority || 'medium',
            dueDate: taskData.dueDate || null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // Add to tasks array
        tasks.push(newTask);
        
        // Save to file
        await writeTasks(tasks);
        
        return newTask;
    } catch (error) {
        throw new Error(`Error creating task: ${error.message}`);
    }
}

/**
 * Update an existing task
 * @param {string} id - Task ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object|null>} Updated task or null if not found
 */
async function updateTask(id, updates) {
    try {
        const tasks = await readTasks();
        const taskIndex = tasks.findIndex(t => t.id === id);
        
        if (taskIndex === -1) {
            return null;
        }
        
        // Update task with new data
        tasks[taskIndex] = {
            ...tasks[taskIndex],
            ...updates,
            id: tasks[taskIndex].id, // Preserve original ID
            createdAt: tasks[taskIndex].createdAt, // Preserve creation date
            updatedAt: new Date().toISOString() // Update timestamp
        };
        
        // Save to file
        await writeTasks(tasks);
        
        return tasks[taskIndex];
    } catch (error) {
        throw new Error(`Error updating task: ${error.message}`);
    }
}

/**
 * Delete a task
 * @param {string} id - Task ID
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
async function deleteTask(id) {
    try {
        const tasks = await readTasks();
        const initialLength = tasks.length;
        
        // Filter out the task to delete
        const filteredTasks = tasks.filter(t => t.id !== id);
        
        // Check if task was found and deleted
        if (filteredTasks.length === initialLength) {
            return false; // Task not found
        }
        
        // Save updated array
        await writeTasks(filteredTasks);
        
        return true; // Task deleted successfully
    } catch (error) {
        throw new Error(`Error deleting task: ${error.message}`);
    }
}

/**
 * Get tasks by status
 * @param {string} status - Task status (pending, in-progress, completed)
 * @returns {Promise<Array>} Array of tasks with matching status
 */
async function getTasksByStatus(status) {
    try {
        const tasks = await readTasks();
        return tasks.filter(t => t.status === status);
    } catch (error) {
        throw new Error(`Error getting tasks by status: ${error.message}`);
    }
}

/**
 * Get tasks by priority
 * @param {string} priority - Task priority (low, medium, high)
 * @returns {Promise<Array>} Array of tasks with matching priority
 */
async function getTasksByPriority(priority) {
    try {
        const tasks = await readTasks();
        return tasks.filter(t => t.priority === priority);
    } catch (error) {
        throw new Error(`Error getting tasks by priority: ${error.message}`);
    }
}

/**
 * Validate task data
 * @param {Object} taskData - Task data to validate
 * @param {boolean} isUpdate - Whether this is an update operation
 * @returns {Object} Validation result { valid: boolean, errors: Array }
 */
function validateTask(taskData, isUpdate = false) {
    const errors = [];
    
    // Title validation (required for create, optional for update)
    if (!isUpdate && !taskData.title) {
        errors.push('Title is required');
    }
    if (taskData.title && (taskData.title.length < 1 || taskData.title.length > 100)) {
        errors.push('Title must be between 1 and 100 characters');
    }
    
    // Description validation (optional)
    if (taskData.description && taskData.description.length > 500) {
        errors.push('Description must not exceed 500 characters');
    }
    
    // Status validation
    if (taskData.status) {
        const validStatuses = ['pending', 'in-progress', 'completed'];
        if (!validStatuses.includes(taskData.status)) {
            errors.push('Status must be: pending, in-progress, or completed');
        }
    }
    
    // Priority validation
    if (taskData.priority) {
        const validPriorities = ['low', 'medium', 'high'];
        if (!validPriorities.includes(taskData.priority)) {
            errors.push('Priority must be: low, medium, or high');
        }
    }
    
    // Due date validation
    if (taskData.dueDate) {
        const date = new Date(taskData.dueDate);
        if (isNaN(date.getTime())) {
            errors.push('Due date must be a valid ISO 8601 date');
        }
    }
    
    return {
        valid: errors.length === 0,
        errors
    };
}

// Export all functions
module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    getTasksByStatus,
    getTasksByPriority,
    validateTask
};

// Made with Bob
