// import app from './app.js'
// import connectionDb from './config/dbConnection.js';
// const PORT = process.env.PORT || 3000;
// import { v2 as cloudinary } from 'cloudinary';
// import Razorpay from 'razorpay';
// import dotenv from 'dotenv';
// dotenv.config();




//     // Configuration
//     cloudinary.config({ 
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//         api_key: process.env.CLOUDINARY_API_KEY, 
//         api_secret:process.env.CLOUDINARY_API_SECRET 
//     })
//   // RAZORPAY CONFGRATION 

//  export const razorpay=new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret:process.env.RAZORPAY_SECRET
//   })
// app.listen(PORT ,"0.0.0.0",async()=>{
//        await connectionDb();
//        console.log(`App is running at:${PORT}`);      
// })



import dotenv from 'dotenv';
dotenv.config(); // Sabse pehle config load karein

import app from './app.js';
import connectionDb from './config/dbConnection.js';
import { v2 as cloudinary } from 'cloudinary';
import Razorpay from 'razorpay';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 5014;

// ESM mode mein __dirname define karne ke liye
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cloudinary Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Razorpay Configuration
export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
});

// --- FRONTEND SERVING LOGIC START ---
// Ye part aapki site ko live dikhayega
const frontendPath = path.join(__dirname, '../Client-side/dist');
app.use(import.meta.env?.PROD ? '/' : '/', (await import('express')).static(frontendPath)); 
// Simple version:
import express from 'express';
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(frontendPath, 'index.html'));
});
// --- FRONTEND SERVING LOGIC END ---

app.listen(PORT, "0.0.0.0", async () => {
    await connectionDb();
    console.log(`App is running at: http://localhost:${PORT}`);      
});