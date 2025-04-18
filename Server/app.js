import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv';
import morgan from 'morgan';
import errorMiddleware from './Middleware/error.midlleware.js';
import paymentRoutes from './Routes/payment.route.js'
import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const app=express();
config();

// console.log("course route is load", courseRoutes);


//  for connecting with frontend 
app.use(
    cors({
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    })
  );


  // server React bulid static files 

  app.use(express.static(path.join(__dirname,"../Clinet-side/build")));

  //Catch all-route for react 
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname, "../Client-side/build" , 'index.html'));
  })
// app.use(cors())
app.use(express.json())

            app.use(cookieParser())  // for parsing the  token cookie
            app.use(morgan('dev'))   // for knowing the request status
            
            app.use(express.urlencoded({ extended: true }));
 app.use('/ping',(req,res)=>{
     res.send("/pong")
 })
      //  console.log("user route is " , userRoutes);
        
 // define the route 
 import userRoutes from './Routes/user.routes.js'
 import courseRoutes from './Routes/course.route.js'

 app.use('/user/v1',userRoutes);
 app.use('/v1/course', courseRoutes);

  
  app.use('/user/v1/payments',paymentRoutes);

            //  for random url 
            app.all("*",(req,res)=>{
                res.status(404).send('OOPPS !!! 404 page not found')
            })

    app.use(errorMiddleware)

export default app