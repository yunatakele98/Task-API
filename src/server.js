const express = require('express');
const { initializeDataFile } = require('./utils/fileStorage');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to Task API",
        version: "1.0.0",
        endpoints: {
            tasks: '/api/tasks',
            health: '/health'
        },
        documentation: 'See ARCHITECTURE.md for complete API documentation'
    });
});

// Health check route
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Mount task routes
app.use('/api/tasks', taskRoutes);

// Start the server
app.listen(PORT, async () => {
    try {
        await initializeDataFile();
        console.log(`Task API Server running on http://localhost:${PORT}`);
        console.log(`📝 API Documentation: http://localhost:${PORT}/`);
        console.log(`💚 Health Check: http://localhost:${PORT}/health`);
        console.log(`📁 Storage initialized successfully`);
    } catch (error) {
        console.error('❌ Failed to initialize storage:', error.message);
        process.exit(1);
    }
});

// Made with Bob
