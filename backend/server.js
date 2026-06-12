const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');

// Load env variables
dotenv.config();

const connectDB = require('./config/db');
const swaggerSpec = require('./config/swagger');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

// Connect to MongoDB
const startServer = async () => {
  await connectDB();

  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Swagger docs - available at /api-docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // API Routes
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/tasks', taskRoutes);
  app.use('/api/v1/users', userRoutes);

  // Simple root route
  app.get('/', (req, res) => {
    res.json({ message: 'Task Manager API is running. Visit /api-docs for documentation.' });
  });

  // Global error handler (must be last)
  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
  });
};
startServer();
