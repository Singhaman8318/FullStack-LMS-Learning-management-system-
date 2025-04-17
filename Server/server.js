import app from './app.js'
import connectionDb from './config/dbConnection.js';
const PORT=process.env.PORT||5014;
import { v2 as cloudinary } from 'cloudinary';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();




    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret:process.env.CLOUDINARY_API_SECRET 
    })
  // RAZORPAY CONFGRATION 

 export const razorpay=new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_SECRET
  })
app.listen(PORT ,async()=>{
       await connectionDb();
       console.log(`App is running at http://localhost:${PORT}`);      
})