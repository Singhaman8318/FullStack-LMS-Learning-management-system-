
// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import morgan from 'morgan';
// import errorMiddleware from './Middleware/error.midlleware.js';
// import paymentRoutes from './Routes/payment.route.js';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import dotenv from 'dotenv';
// // Routes
// import userRoutes from './Routes/user.routes.js';
// import courseRoutes from './Routes/course.route.js';

// dotenv.config();
// const app = express();

// console.log("frontend url is the app.js", process.env.FRONTEND_URL);

// // Middleware
// app.use(cors({
//   origin: process.env.FRONTEND_URL,
//   credentials: true
// }))
// app.use(express.json());
// app.use(cookieParser());
// app.use(morgan('dev'));
// app.use(express.urlencoded({ extended: true }));



// app.use('/user/v1', userRoutes);
// app.use('/v1/course', courseRoutes);
// app.use('/user/v1/payments', paymentRoutes);

// app.use('/ping', (req, res) => {
//   res.send("/pong");
// });

// // // ⚠️ Move static serving AFTER your routes   

// // frontend server build 
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // only in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../Client-side/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../Client-side/dist/index.html"));
//   });
// }

// // 404 fallback for unhandled APIs
// app.all("*", (req, res) => {
//   res.status(404).send('OOPPS !!! 404 page not found');
// });

// // Global error handler
// app.use(errorMiddleware);

// export default app;



import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Import Middlewares
import errorMiddleware from './Middleware/error.midlleware.js';

// Import Routes
import userRoutes from './Routes/user.routes.js';
import courseRoutes from './Routes/course.route.js';
import paymentRoutes from './Routes/payment.route.js';

dotenv.config();
const app = express();

// --- 1. Global Middlewares ---
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', 
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// --- 2. API Routes (Inhe pehle rehne dein) ---
app.use('/user/v1', userRoutes);
app.use('/v1/course', courseRoutes);
app.use('/user/v1/payments', paymentRoutes);

app.get('/ping', (req, res) => {
  res.send("pong");
});

// --- 3. Frontend Static Files Serving ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.resolve(__dirname, '..', 'Client-side', 'dist');

// Static folder serve karein
app.use(express.static(frontendPath));

// Catch-all route for React Router (API routes ke niche)
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'), (err) => {
    if (err) {
      // Agar index.html nahi milti, toh ye 404 error dega crash nahi karega
      res.status(404).send("Frontend build not found. Ensure 'npm run build' was successful.");
    }
  });
});

// --- 4. Error Middleware ---
app.use(errorMiddleware);

export default app;