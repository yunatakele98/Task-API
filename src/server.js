const express = require('express');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.json(
        {message: "Welcome to Task API",
        version: "1.0.0",
        endpoints: {
            tasks: '/api/tasks',
            health: '/health'
        }
    });
});

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


