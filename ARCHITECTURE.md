# 🏗️ Task API - Complete System Architecture

## 📋 Table of Contents
1. [System Overview](#system-overview)
2. [Project Structure](#project-structure)
3. [Architecture Layers](#architecture-layers)
4. [Data Flow Diagram](#data-flow-diagram)
5. [Request-Response Cycle](#request-response-cycle)
6. [File Purposes](#file-purposes)
7. [Folder Roles](#folder-roles)
8. [Complete Flow Examples](#complete-flow-examples)
9. [Storage System](#storage-system)

---

## 🎯 System Overview

The Task API is a RESTful web service built with Node.js and Express.js that manages tasks. It follows the **MVC (Model-View-Controller)** pattern with additional layers for better organization.

### **Technology Stack**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Storage**: JSON file (tasks.json)
- **ID Generation**: UUID v4
- **Architecture**: Layered MVC

---

## 📁 Project Structure

```
Task-API/
├── package.json                 # Project dependencies and scripts
├── .gitignore                   # Git ignore rules
├── ARCHITECTURE.md              # This file
│
├── data/                        # Data storage layer
│   └── tasks.json              # JSON file database
│
├── src/                         # Source code
│   ├── server.js               # Application entry point
│   │
│   ├── routes/                 # URL routing layer
│   │   └── tasks.js           # Task route definitions
│   │
│   ├── controllers/            # Business logic layer
│   │   └── taskController.js  # Task request handlers
│   │
│   ├── models/                 # Data access layer
│   │   └── Task.js            # Task model & operations
│   │
│   ├── middleware/             # Request processing layer
│   │   ├── validation.js      # Input validation
│   │   └── errorHandler.js    # Error handling
│   │
│   └── utils/                  # Utility functions
│       └── fileStorage.js     # File I/O operations
│
└── tests/                       # Testing
    └── api-tests.md            # API test documentation
```

---

## 🏛️ Architecture Layers

### **Layer Hierarchy (Top to Bottom)**

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT (Browser/Postman)                  │
│                  HTTP Request (GET/POST/PUT/DELETE)          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  LAYER 1: SERVER (server.js)                                │
│  • Starts Express application                                │
│  • Configures middleware (express.json())                    │
│  • Mounts routes                                             │
│  • Listens on port 3000                                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  LAYER 2: ROUTES (routes/tasks.js)                          │
│  • Maps URLs to controller functions                         │
│  • Defines HTTP methods (GET, POST, PUT, DELETE)             │
│  • Example: GET /api/tasks → getAllTasksController           │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  LAYER 3: MIDDLEWARE (middleware/)                           │
│  • Validates request data                                    │
│  • Handles errors                                            │
│  • Processes requests before reaching controller             │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  LAYER 4: CONTROLLERS (controllers/taskController.js)        │
│  • Handles HTTP requests                                     │
│  • Calls model functions                                     │
│  • Formats responses                                         │
│  • Sends HTTP responses                                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  LAYER 5: MODELS (models/Task.js)                           │
│  • Business logic                                            │
│  • Data validation                                           │
│  • CRUD operations                                           │
│  • Calls storage utilities                                   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  LAYER 6: UTILS (utils/fileStorage.js)                      │
│  • Low-level file operations                                 │
│  • Read/write JSON files                                     │
│  • No business logic                                         │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  LAYER 7: DATA STORAGE (data/tasks.json)                    │
│  • Persistent data storage                                   │
│  • JSON array of task objects                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagram

### **Complete Request-Response Flow**

```
CLIENT
  │
  │ 1. HTTP Request
  │    POST /api/tasks
  │    Body: { "title": "New Task", "priority": "high" }
  ↓
┌─────────────────────────────────────────────────────────────┐
│ server.js                                                    │
│ • Receives request                                           │
│ • Parses JSON body (express.json() middleware)               │
│ • Routes to appropriate handler                              │
└─────────────────────────────────────────────────────────────┘
  │
  │ 2. Route Matching
  ↓
┌─────────────────────────────────────────────────────────────┐
│ routes/tasks.js                                              │
│ • Matches: POST /api/tasks                                   │
│ • Calls: taskController.createTask(req, res)                 │
└─────────────────────────────────────────────────────────────┘
  │
  │ 3. Validation (Optional)
  ↓
┌─────────────────────────────────────────────────────────────┐
│ middleware/validation.js                                     │
│ • Validates request body                                     │
│ • Checks required fields                                     │
│ • Returns 400 if invalid                                     │
└─────────────────────────────────────────────────────────────┘
  │
  │ 4. Controller Processing
  ↓
┌─────────────────────────────────────────────────────────────┐
│ controllers/taskController.js                                │
│ • Extracts data from req.body                                │
│ • Calls: Task.createTask(taskData)                           │
│ • Waits for result                                           │
└─────────────────────────────────────────────────────────────┘
  │
  │ 5. Business Logic
  ↓
┌─────────────────────────────────────────────────────────────┐
│ models/Task.js                                               │
│ • Validates task data                                        │
│ • Generates UUID                                             │
│ • Sets defaults (status: 'pending')                          │
│ • Adds timestamps                                            │
│ • Calls: readTasks() from fileStorage                        │
└─────────────────────────────────────────────────────────────┘
  │
  │ 6. Read Existing Data
  ↓
┌─────────────────────────────────────────────────────────────┐
│ utils/fileStorage.js                                         │
│ • readTasks()                                                │
│ • Reads data/tasks.json                                      │
│ • Parses JSON to array                                       │
│ • Returns array to Task.js                                   │
└─────────────────────────────────────────────────────────────┘
  │
  │ 7. Read from File
  ↓
┌─────────────────────────────────────────────────────────────┐
│ data/tasks.json                                              │
│ • File system reads JSON file                                │
│ • Returns: [{ existing tasks }]                              │
└─────────────────────────────────────────────────────────────┘
  │
  │ 8. Add New Task
  ↑
┌─────────────────────────────────────────────────────────────┐
│ models/Task.js                                               │
│ • Adds new task to array                                     │
│ • tasks.push(newTask)                                        │
│ • Calls: writeTasks(tasks)                                   │
└─────────────────────────────────────────────────────────────┘
  │
  │ 9. Write Updated Data
  ↓
┌─────────────────────────────────────────────────────────────┐
│ utils/fileStorage.js                                         │
│ • writeTasks(tasks)                                          │
│ • Converts array to JSON string                              │
│ • Writes to data/tasks.json                                  │
└─────────────────────────────────────────────────────────────┘
  │
  │ 10. Save to File
  ↓
┌─────────────────────────────────────────────────────────────┐
│ data/tasks.json                                              │
│ • File system writes JSON                                    │
│ • Data persisted to disk                                     │
└─────────────────────────────────────────────────────────────┘
  │
  │ 11. Return New Task
  ↑
┌─────────────────────────────────────────────────────────────┐
│ models/Task.js                                               │
│ • Returns newTask object                                     │
│ • Back to controller                                         │
└─────────────────────────────────────────────────────────────┘
  │
  │ 12. Format Response
  ↑
┌─────────────────────────────────────────────────────────────┐
│ controllers/taskController.js                                │
│ • Receives newTask from model                                │
│ • Formats response:                                          │
│   {                                                          │
│     success: true,                                           │
│     data: newTask                                            │
│   }                                                          │
│ • Calls: res.status(201).json(response)                      │
└─────────────────────────────────────────────────────────────┘
  │
  │ 13. HTTP Response
  ↑
┌─────────────────────────────────────────────────────────────┐
│ server.js                                                    │
│ • Sends response to client                                   │
│ • Status: 201 Created                                        │
│ • Body: JSON with new task                                   │
└─────────────────────────────────────────────────────────────┘
  │
  │ 14. Response Received
  ↑
CLIENT
  • Receives: 201 Created
  • Body: { "success": true, "data": { ...newTask } }
```

---

## 📄 File Purposes

### **1. server.js** (Entry Point)
**Purpose**: Initialize and configure the Express application

**Responsibilities**:
- Create Express app instance
- Configure middleware (JSON parsing, CORS)
- Mount routes
- Start HTTP server
- Initialize storage on startup

**Key Code**:
```javascript
const express = require('express');
const taskRoutes = require('./routes/tasks');
const { initializeStorage } = require('./utils/fileStorage');

const app = express();
app.use(express.json());
app.use('/api/tasks', taskRoutes);

app.listen(3000, async () => {
    await initializeStorage();
    console.log('Server running on port 3000');
});
```

---

### **2. routes/tasks.js** (URL Routing)
**Purpose**: Map HTTP endpoints to controller functions

**Responsibilities**:
- Define URL patterns
- Specify HTTP methods
- Connect URLs to controllers
- Apply route-specific middleware

**Key Code**:
```javascript
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
```

**URL Mapping**:
| HTTP Method | URL | Controller Function |
|-------------|-----|---------------------|
| GET | /api/tasks | getAllTasks |
| GET | /api/tasks/:id | getTaskById |
| POST | /api/tasks | createTask |
| PUT | /api/tasks/:id | updateTask |
| DELETE | /api/tasks/:id | deleteTask |

---

### **3. controllers/taskController.js** (Request Handlers)
**Purpose**: Handle HTTP requests and responses

**Responsibilities**:
- Extract data from requests (req.body, req.params)
- Call model functions
- Handle errors
- Format and send responses
- Set HTTP status codes

**Key Code**:
```javascript
const Task = require('../models/Task');

async function createTask(req, res) {
    try {
        // Validate
        const validation = Task.validateTask(req.body);
        if (!validation.valid) {
            return res.status(400).json({ errors: validation.errors });
        }
        
        // Create
        const task = await Task.createTask(req.body);
        
        // Respond
        res.status(201).json({
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
```

---

### **4. models/Task.js** (Business Logic)
**Purpose**: Implement task-specific operations and validation

**Responsibilities**:
- CRUD operations (Create, Read, Update, Delete)
- Data validation
- Business rules (defaults, required fields)
- Generate IDs and timestamps
- Call storage utilities

**Key Code**:
```javascript
const { v4: uuidv4 } = require('uuid');
const { readTasks, writeTasks } = require('../utils/fileStorage');

async function createTask(taskData) {
    const tasks = await readTasks();
    
    const newTask = {
        id: uuidv4(),
        title: taskData.title,
        status: 'pending',  // Business rule
        priority: taskData.priority || 'medium',  // Default
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    await writeTasks(tasks);
    
    return newTask;
}
```

**Functions**:
- `getAllTasks()` - Get all tasks
- `getTaskById(id)` - Get one task
- `createTask(data)` - Create new task
- `updateTask(id, updates)` - Update task
- `deleteTask(id)` - Delete task
- `getTasksByStatus(status)` - Filter by status
- `getTasksByPriority(priority)` - Filter by priority
- `validateTask(data)` - Validate task data

---

### **5. utils/fileStorage.js** (File Operations)
**Purpose**: Handle low-level file I/O operations

**Responsibilities**:
- Read JSON files
- Write JSON files
- Initialize storage
- Handle file errors
- No business logic

**Key Code**:
```javascript
const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../data/tasks.json');

async function readTasks() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
}

async function writeTasks(tasks) {
    const data = JSON.stringify(tasks, null, 2);
    await fs.writeFile(DATA_FILE, data, 'utf8');
}
```

---

### **6. middleware/validation.js** (Input Validation)
**Purpose**: Validate incoming request data

**Responsibilities**:
- Check required fields
- Validate data types
- Validate value ranges
- Return validation errors
- Prevent invalid data from reaching controllers

---

### **7. middleware/errorHandler.js** (Error Handling)
**Purpose**: Centralized error handling

**Responsibilities**:
- Catch all errors
- Log errors
- Format error responses
- Set appropriate status codes
- Hide sensitive error details in production

---

### **8. data/tasks.json** (Data Storage)
**Purpose**: Persist task data

**Structure**:
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Complete Bob-a-thon project",
    "description": "Build RESTful API",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2026-06-25T00:00:00.000Z",
    "createdAt": "2026-06-18T20:00:00.000Z",
    "updatedAt": "2026-06-18T20:00:00.000Z"
  }
]
```

---

## 📂 Folder Roles

### **src/** - Source Code
Contains all application code organized by responsibility

### **src/routes/** - Routing Layer
- Maps URLs to functions
- Defines API endpoints
- Handles HTTP methods

### **src/controllers/** - Controller Layer
- Processes HTTP requests
- Calls business logic
- Formats responses

### **src/models/** - Model Layer
- Business logic
- Data operations
- Validation rules

### **src/middleware/** - Middleware Layer
- Request preprocessing
- Validation
- Error handling

### **src/utils/** - Utility Layer
- Helper functions
- File operations
- Reusable code

### **data/** - Data Storage
- JSON file database
- Persistent storage

### **tests/** - Testing
- API tests
- Test documentation

---

## 🔄 Complete Flow Examples

### **Example 1: CREATE a Task (POST /api/tasks)**

**Request**:
```http
POST /api/tasks HTTP/1.1
Content-Type: application/json

{
  "title": "Learn Node.js",
  "description": "Complete Node.js tutorial",
  "priority": "high",
  "dueDate": "2026-06-30T00:00:00.000Z"
}
```

**Step-by-Step Flow**:

1. **server.js** receives request
   - Express parses JSON body
   - Routes to `/api/tasks`

2. **routes/tasks.js** matches route
   - Finds: `router.post('/', taskController.createTask)`
   - Calls: `taskController.createTask(req, res)`

3. **controllers/taskController.js** processes request
   ```javascript
   async function createTask(req, res) {
       // Extract data
       const taskData = req.body;
       // {
       //   title: "Learn Node.js",
       //   description: "Complete Node.js tutorial",
       //   priority: "high",
       //   dueDate: "2026-06-30T00:00:00.000Z"
       // }
       
       // Validate
       const validation = Task.validateTask(taskData);
       if (!validation.valid) {
           return res.status(400).json({ errors: validation.errors });
       }
       
       // Create task
       const newTask = await Task.createTask(taskData);
       
       // Send response
       res.status(201).json({ success: true, data: newTask });
   }
   ```

4. **models/Task.js** creates task
   ```javascript
   async function createTask(taskData) {
       // Read existing tasks
       const tasks = await readTasks();
       // tasks = [{ existing task 1 }, { existing task 2 }]
       
       // Create new task
       const newTask = {
           id: uuidv4(),  // "7c9e6679-7425-40de-944b-e07fc1f90ae7"
           title: taskData.title,  // "Learn Node.js"
           description: taskData.description,  // "Complete Node.js tutorial"
           status: 'pending',  // Default
           priority: taskData.priority,  // "high"
           dueDate: taskData.dueDate,  // "2026-06-30T00:00:00.000Z"
           createdAt: new Date().toISOString(),  // "2026-06-18T22:00:00.000Z"
           updatedAt: new Date().toISOString()   // "2026-06-18T22:00:00.000Z"
       };
       
       // Add to array
       tasks.push(newTask);
       // tasks = [{ task 1 }, { task 2 }, { newTask }]
       
       // Save to file
       await writeTasks(tasks);
       
       return newTask;
   }
   ```

5. **utils/fileStorage.js** saves data
   ```javascript
   async function writeTasks(tasks) {
       // Convert to JSON string
       const data = JSON.stringify(tasks, null, 2);
       
       // Write to file
       await fs.writeFile(DATA_FILE, data, 'utf8');
   }
   ```

6. **data/tasks.json** updated
   ```json
   [
     { "id": "...", "title": "Existing Task 1" },
     { "id": "...", "title": "Existing Task 2" },
     {
       "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
       "title": "Learn Node.js",
       "description": "Complete Node.js tutorial",
       "status": "pending",
       "priority": "high",
       "dueDate": "2026-06-30T00:00:00.000Z",
       "createdAt": "2026-06-18T22:00:00.000Z",
       "updatedAt": "2026-06-18T22:00:00.000Z"
     }
   ]
   ```

**Response**:
```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "success": true,
  "data": {
    "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    "title": "Learn Node.js",
    "description": "Complete Node.js tutorial",
    "status": "pending",
    "priority": "high",
    "dueDate": "2026-06-30T00:00:00.000Z",
    "createdAt": "2026-06-18T22:00:00.000Z",
    "updatedAt": "2026-06-18T22:00:00.000Z"
  }
}
```

---

### **Example 2: READ All Tasks (GET /api/tasks)**

**Request**:
```http
GET /api/tasks HTTP/1.1
```

**Step-by-Step Flow**:

1. **server.js** → **routes/tasks.js**
   - Matches: `router.get('/', taskController.getAllTasks)`

2. **controllers/taskController.js**
   ```javascript
   async function getAllTasks(req, res) {
       const tasks = await Task.getAllTasks();
       res.json({
           success: true,
           count: tasks.length,
           data: tasks
       });
   }
   ```

3. **models/Task.js**
   ```javascript
   async function getAllTasks() {
       const tasks = await readTasks();
       return tasks;
   }
   ```

4. **utils/fileStorage.js**
   ```javascript
   async function readTasks() {
       const data = await fs.readFile(DATA_FILE, 'utf8');
       return JSON.parse(data);
   }
   ```

5. **data/tasks.json** read
   - Returns array of all tasks

**Response**:
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "count": 3,
  "data": [
    { "id": "...", "title": "Task 1", ... },
    { "id": "...", "title": "Task 2", ... },
    { "id": "...", "title": "Task 3", ... }
  ]
}
```

---

### **Example 3: UPDATE a Task (PUT /api/tasks/:id)**

**Request**:
```http
PUT /api/tasks/7c9e6679-7425-40de-944b-e07fc1f90ae7 HTTP/1.1
Content-Type: application/json

{
  "status": "completed",
  "priority": "medium"
}
```

**Step-by-Step Flow**:

1. **routes/tasks.js**
   - Matches: `router.put('/:id', taskController.updateTask)`
   - `req.params.id = "7c9e6679-7425-40de-944b-e07fc1f90ae7"`

2. **controllers/taskController.js**
   ```javascript
   async function updateTask(req, res) {
       const { id } = req.params;
       const updates = req.body;
       
       const updatedTask = await Task.updateTask(id, updates);
       
       if (!updatedTask) {
           return res.status(404).json({
               success: false,
               error: 'Task not found'
           });
       }
       
       res.json({ success: true, data: updatedTask });
   }
   ```

3. **models/Task.js**
   ```javascript
   async function updateTask(id, updates) {
       // Read all tasks
       const tasks = await readTasks();
       
       // Find task index
       const taskIndex = tasks.findIndex(t => t.id === id);
       
       if (taskIndex === -1) {
           return null;  // Not found
       }
       
       // Update task
       tasks[taskIndex] = {
           ...tasks[taskIndex],  // Keep existing fields
           ...updates,  // Apply updates
           id: tasks[taskIndex].id,  // Preserve ID
           createdAt: tasks[taskIndex].createdAt,  // Preserve creation date
           updatedAt: new Date().toISOString()  // New timestamp
       };
       
       // Save
       await writeTasks(tasks);
       
       return tasks[taskIndex];
   }
   ```

4. **utils/fileStorage.js** writes updated array

**Response**:
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    "title": "Learn Node.js",
    "description": "Complete Node.js tutorial",
    "status": "completed",
    "priority": "medium",
    "dueDate": "2026-06-30T00:00:00.000Z",
    "createdAt": "2026-06-18T22:00:00.000Z",
    "updatedAt": "2026-06-18T22:30:00.000Z"
  }
}
```

---

### **Example 4: DELETE a Task (DELETE /api/tasks/:id)**

**Request**:
```http
DELETE /api/tasks/7c9e6679-7425-40de-944b-e07fc1f90ae7 HTTP/1.1
```

**Step-by-Step Flow**:

1. **routes/tasks.js**
   - Matches: `router.delete('/:id', taskController.deleteTask)`

2. **controllers/taskController.js**
   ```javascript
   async function deleteTask(req, res) {
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
   }
   ```

3. **models/Task.js**
   ```javascript
   async function deleteTask(id) {
       const tasks = await readTasks();
       const initialLength = tasks.length;
       
       // Filter out the task
       const filteredTasks = tasks.filter(t => t.id !== id);
       
       if (filteredTasks.length === initialLength) {
           return false;  // Task not found
       }
       
       // Save updated array
       await writeTasks(filteredTasks);
       
       return true;  // Successfully deleted
   }
   ```

4. **utils/fileStorage.js** writes filtered array

**Response**:
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

## 💾 Storage System

### **How File Storage Works**

```
┌─────────────────────────────────────────────────────────────┐
│                    Application Memory                        │
│                                                              │
│  JavaScript Array:                                           │
│  [                                                           │
│    { id: "1", title: "Task 1", status: "pending" },        │
│    { id: "2", title: "Task 2", status: "completed" }       │
│  ]                                                           │
└─────────────────────────────────────────────────────────────┘
                    ↕ readTasks() / writeTasks()
┌─────────────────────────────────────────────────────────────┐
│                    File System (Disk)                        │
│                                                              │
│  data/tasks.json:                                            │
│  [                                                           │
│    {                                                         │
│      "id": "1",                                              │
│      "title": "Task 1",                                      │
│      "status": "pending"                                     │
│    },                                                        │
│    {                                                         │
│      "id": "2",                                              │
│      "title": "Task 2",                                      │
│      "status": "completed"                                   │
│    }                                                         │
│  ]                                                           │
└─────────────────────────────────────────────────────────────┘
```

### **Read Operation**
1. `fs.readFile()` reads file as string
2. `JSON.parse()` converts string to JavaScript array
3. Array returned to application

### **Write Operation**
1. `JSON.stringify()` converts array to string
2. `fs.writeFile()` writes string to file
3. Data persisted to disk

### **Why JSON File?**
- ✅ Simple for learning
- ✅ No database setup required
- ✅ Human-readable
- ✅ Easy to debug
- ✅ Version control friendly
- ❌ Not suitable for production (use database instead)

---

## 🎯 Key Architectural Principles

### **1. Separation of Concerns**
Each layer has one responsibility:
- Routes: URL mapping
- Controllers: Request handling
- Models: Business logic
- Utils: File operations

### **2. Single Responsibility Principle**
Each file has one job:
- `fileStorage.js`: File I/O only
- `Task.js`: Task operations only
- `taskController.js`: HTTP handling only

### **3. DRY (Don't Repeat Yourself)**
- Reusable functions in utils
- Shared validation in models
- Common error handling in middleware

### **4. Layered Architecture**
- Clear boundaries between layers
- Each layer only talks to adjacent layers
- Easy to modify one layer without affecting others

### **5. Scalability**
- Easy to add new features
- Easy to switch storage (file → database)
- Easy to add new endpoints

---

## 📚 Summary

### **Request Flow Summary**
```
Client → Server → Routes → Middleware → Controller → Model → Utils → Storage
                                                                        ↓
Client ← Server ← Routes ← Middleware ← Controller ← Model ← Utils ← Storage
```

### **File Responsibilities**
- **server.js**: Start app, configure middleware
- **routes/**: Map URLs to controllers
- **controllers/**: Handle HTTP, call models
- **models/**: Business logic, call utils
- **utils/**: File operations
- **middleware/**: Validate, handle errors
- **data/**: Store data

### **Data Flow**
1. HTTP Request arrives
2. Routes match URL
3. Middleware validates
4. Controller processes
5. Model applies logic
6. Utils access storage
7. Data returned up the chain
8. HTTP Response sent

---

## 🚀 Next Steps

Now that you understand the architecture:

1. **Implement Controllers** - Create taskController.js
2. **Implement Routes** - Create routes/tasks.js
3. **Connect to Server** - Mount routes in server.js
4. **Test Endpoints** - Verify each operation works
5. **Add Middleware** - Implement validation and error handling

---

**This architecture provides a solid foundation for building scalable, maintainable REST APIs!** 🎉