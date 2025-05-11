
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/users';
import companionRoutes from './routes/companions';
import bookingRoutes from './routes/bookings';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Rent-a-Companion API is running' });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/companions', companionRoutes);
app.use('/api/bookings', bookingRoutes);

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Close Prisma client when the app terminates
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export { prisma };
