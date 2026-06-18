async function getAllTasks(req, res) {
    try {
        // Call model
        const tasks = await Task.getAllTasks();
        
        // Send response
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

async function getTaskById(req, res) {
    try {
        // Extract ID from URL parameter
        const { id } = req.params;
        
        // Call model
        const task = await Task.getTaskById(id);
        
        // Check if found
        if (!task) {
            return res.status(404).json({
                success: false,
                error: 'Task not found'
            });
        }
        
        // Send response
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

async function createTask(req, res) {
    try {
        const taskData = req.body;
        const newTask = await Task.createTask(taskData);
        res.status(201).json({
            success: true,
            data: newTask
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
async function updateTask(req, res) {
    try {
        // Extract ID and updates
        const { id } = req.params;
        const updates = req.body;
        
        // Validate updates (optional)
        const validation = Task.validateTask(updates, true);
        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                errors: validation.errors
            });
        }
        
        // Call model
        const updatedTask = await Task.updateTask(id, updates);
        
        // Check if found
        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                error: 'Task not found'
            });
        }
        
        // Send response
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

async function deleteTask(req, res) {
    try {
        // Extract ID
        const { id } = req.params;
        
        // Call model
        const deleted = await Task.deleteTask(id);
        
        // Check if found
        if (!deleted) {
            return res.status(404).json({
                success: false,
                error: 'Task not found'
            });
        }
        
        // Send response
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

async function getTasksByStatus(req, res) {
    try {
        // Extract status
        const { status } = req.params;
        
        // Validate status
        const validStatuses = ['pending', 'in-progress', 'completed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid status. Must be: pending, in-progress, or completed'
            });
        }
        
        // Call model
        const tasks = await Task.getTasksByStatus(status);
        
        // Send response
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
async function getTasksByPriority(req, res) {
    try {
        // Extract priority
        const { priority } = req.params;
        
        // Validate priority
        const validPriorities = ['low', 'medium', 'high'];
        if (!validPriorities.includes(priority)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid priority. Must be: low, medium, or high'
            });
        }
        
        // Call model
        const tasks = await Task.getTasksByPriority(priority);
        
        // Send response
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

