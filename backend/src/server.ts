import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { connectDatabase } from './utils/database';
import restaurantRoutes from './routes/restaurantRoutes';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/restaurants', restaurantRoutes);

// Health check route - Ensure DB connection is handled here or globally if possible
// We will call connectDatabase to ensure a connection is established before serving the health check
app.get('/api/health', async (req: Request, res: Response) => {
  try {
    // Attempt to connect/verify connection status before response
    await connectDatabase(); 
    res.status(200).json({
      success: true,
      message: 'Server is running and DB is connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
     res.status(500).json({
      success: false,
      message: 'Server is running but DB connection failed',
      error: error instanceof Error ? error.message : 'Unknown database error',
    });
  }
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Export the application handler for Vercel
module.exports = app;