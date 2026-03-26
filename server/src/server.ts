import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { initSocket } from './services/socket';
import leadRoutes from './routes/leadRoutes';
import plotRoutes from './routes/plotRoutes';
import paymentRoutes from './routes/paymentRoutes';
import authRoutes from './routes/authRoutes';
import siteVisitRoutes from './routes/siteVisitRoutes';
import reportRoutes from './routes/reportRoutes';

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Socket.io initialization
initSocket(server);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/plots', plotRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/site-visits', siteVisitRoutes);
app.use('/api/reports', reportRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Real Estate Plot Management API is running...');
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
