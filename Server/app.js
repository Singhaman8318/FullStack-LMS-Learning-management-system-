


import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import errorMiddleware from './Middleware/error.midlleware.js';
import paymentRoutes from './Routes/payment.route.js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

console.log("frontend url is the app.js", process.env.FRONTEND_URL);

// Middleware
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// Routes
import userRoutes from './Routes/user.routes.js';
import courseRoutes from './Routes/course.route.js';

app.use('/user/v1', userRoutes);
app.use('/v1/course', courseRoutes);
app.use('/user/v1/payments', paymentRoutes);

app.use('/ping', (req, res) => {
  res.send("/pong");
});

// // ⚠️ Move static serving AFTER your routes   

// frontend server build 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../Client-side/dist")));  

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../Client-side/dist/index.html"));
});

// 404 fallback for unhandled APIs
app.all("*", (req, res) => {
  res.status(404).send('OOPPS !!! 404 page not found');
});

// Global error handler
app.use(errorMiddleware);

export default app;
