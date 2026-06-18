const fs = require('fs').promises;
const path = require('path');

// Path to tasks.json file 
const DATA_FILE = path.join(__dirname, '../../data/tasks.json');

// Read all the tasks from that file
async function readTasks() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);  
    } catch (error) {
        if (error.code === 'ENOENT') {
            // File doesn't exist, return empty array
            return []; 
        }
        throw error;
    }
}

// Write tasks to file
async function writeTasks(tasks) {
    try {
        const data = JSON.stringify(tasks, null, 2);
        await fs.writeFile(DATA_FILE, data, 'utf8');
    } catch (error) {
        throw new Error(`Failed to write tasks: ${error.message}`);
    }
}

// Initialize the data file if it doesn't exist
async function initializeDataFile() {
    try {
        await fs.access(DATA_FILE);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // File doesn't exist, create it with empty array
            await writeTasks([]);
        } else {
            throw error;
        }
    }
}
module.exports = {
    readTasks,
    writeTasks,
    initializeDataFile
};