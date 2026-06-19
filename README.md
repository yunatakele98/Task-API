# Task Management API

A RESTful API for managing tasks built with Node.js and Express.js. Created as part of the Bob-a-thon Track 1: Get To Know Bob (Beginner Exploratory).

## 🚀 Features

- **Complete CRUD Operations**: Create, Read, Update, and Delete tasks
- **Advanced Filtering**: Filter tasks by status and priority
- **RESTful Design**: Follows REST API best practices
- **MVC Architecture**: Clean separation of concerns
- **File-Based Storage**: JSON file persistence (no database required)
- **Unique IDs**: UUID generation for each task
- **Timestamps**: Automatic createdAt and updatedAt tracking

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a specific task by ID |
| GET | `/api/tasks/status/:status` | Get tasks by status (pending, in-progress, completed) |
| GET | `/api/tasks/priority/:priority` | Get tasks by priority (low, medium, high) |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update an existing task |
| DELETE | `/api/tasks/:id` | Delete a task |

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Storage**: File-based JSON
- **ID Generation**: UUID v4
- **Architecture**: MVC Pattern

## 📁 Project Structure

```
Task-API/
├── package.json              # Project dependencies and scripts
├── data/
│   └── tasks.json           # Task data storage
└── src/
    ├── server.js            # Express server setup
    ├── models/
    │   └── Task.js          # Task business logic
    ├── controllers/
    │   └── taskController.js # Request handlers
    ├── routes/
    │   └── tasks.js         # Route definitions
    └── utils/
        └── fileStorage.js   # File I/O operations
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone or navigate to the project directory:
```bash
cd Task-API
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will start on `http://localhost:3000`

### Development Mode

For auto-restart on file changes:
```bash
npm run dev
```

## 📝 Usage Examples

### Get All Tasks
```bash
curl http://localhost:3000/api/tasks
```

### Get Task by ID
```bash
curl http://localhost:3000/api/tasks/550e8400-e29b-41d4-a716-446655440000
```

### Create a New Task
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "status": "pending",
    "priority": "high",
    "dueDate": "2026-06-30"
  }'
```

### Update a Task
```bash
curl -X PUT http://localhost:3000/api/tasks/YOUR_TASK_ID \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

### Delete a Task
```bash
curl -X DELETE http://localhost:3000/api/tasks/YOUR_TASK_ID
```

### Filter by Status
```bash
curl http://localhost:3000/api/tasks/status/completed
```

### Filter by Priority
```bash
curl http://localhost:3000/api/tasks/priority/high
```

## 📊 Task Object Schema

```json
{
  "id": "uuid-v4-string",
  "title": "string (required)",
  "description": "string (required)",
  "status": "pending | in-progress | completed (default: pending)",
  "priority": "low | medium | high (default: medium)",
  "dueDate": "ISO date string (optional)",
  "createdAt": "ISO date string (auto-generated)",
  "updatedAt": "ISO date string (auto-updated)"
}
```

## ✅ API Response Format

### Success Response
```json
{
  "success": true,
  "data": { /* task object or array */ },
  "count": 3,  // for list endpoints
  "message": "Operation successful"  // for create/update/delete
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message description"
}
```

## 🔧 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with auto-reload
- `npm test` - Run tests (placeholder)

## 🏗️ Architecture

This project follows the **MVC (Model-View-Controller)** pattern:

- **Models** (`src/models/`): Business logic and data operations
- **Views**: JSON API responses
- **Controllers** (`src/controllers/`): Request handling and response formatting
- **Routes** (`src/routes/`): URL endpoint definitions
- **Utils** (`src/utils/`): Shared utility functions

For detailed architecture documentation, see [ARCHITECTURE.md](ARCHITECTURE.md)

## 🧪 Testing

All 7 endpoints have been tested and verified working:

✅ GET all tasks  
✅ GET task by ID  
✅ GET tasks by status  
✅ GET tasks by priority  
✅ POST create task  
✅ PUT update task  
✅ DELETE task  

## 🎯 Learning Outcomes

This project was built to learn:
- RESTful API design principles
- Node.js and Express.js fundamentals
- MVC architecture pattern
- Async/await and error handling
- File-based data persistence
- HTTP methods and status codes
- API endpoint testing with curl

## 🚀 Future Enhancements

Potential improvements for production use:
- [ ] Replace file storage with a database (MongoDB/PostgreSQL)
- [ ] Add authentication and authorization (JWT)
- [ ] Implement input validation middleware
- [ ] Add request rate limiting
- [ ] Create API documentation with Swagger/OpenAPI
- [ ] Add pagination for large datasets
- [ ] Implement search functionality
- [ ] Add task categories/tags
- [ ] Create a frontend UI (React/Vue)
- [ ] Deploy to cloud platform (Heroku/AWS)

## 📚 Dependencies

- **express** (^4.18.2): Web framework for Node.js
- **uuid** (^9.0.1): UUID generation for unique task IDs

### Dev Dependencies
- **nodemon** (^3.0.1): Auto-restart server on file changes

## 🤝 Contributing

This is a learning project created for the Bob-a-thon. Feel free to fork and experiment!

## 📄 License

This project is open source and available for educational purposes.

## 👤 Author

**Yuna Takele**
- Bob-a-thon Track 1 Participant
- Learning web development with Bob IDE

## 🙏 Acknowledgments

- Built with guidance from Bob AI Assistant
- Part of Bob-a-thon: Get To Know Bob (Beginner Exploratory)
- Thanks to the Bob team for creating an amazing learning tool!

## 📞 Support

For questions or issues:
1. Check the [ARCHITECTURE.md](ARCHITECTURE.md) for detailed documentation
2. Review the API examples above
3. Ensure the server is running on port 3000
4. Verify Node.js and npm are properly installed

---

**Built with ❤️ using Bob IDE**