import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import BRoute from './routes/BusinessAuthRoute.js';
import rateLimit from 'express-rate-limit';
import errorHandler from './middleware/errorHandler.js';
import { authMiddleware } from './middleware/isAuthenticated.js';

// Dotenv configuration
dotenv.config();

// Create an Express application
const app = express();

// CORS setup
app.use(cors());

// JSON parser
app.use(express.json());

// IP limiting setup
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 50 // Limit each IP to 25 requests per windowMs
});
app.use(limiter);

// Routing setup
app.get('/test', (req, res) => {
    res.send("Hello World");
});
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/Buss', BRoute);

// Error handler Middleware
app.use(errorHandler);

// HTTP server creation
//const port = process.env.PORT || 3000;
//const server = http.createServer(app);
//server.listen(port, () => {
   // console.log(`Server is running on port ${port}`);
//});


// Default export for the app
export default app;
