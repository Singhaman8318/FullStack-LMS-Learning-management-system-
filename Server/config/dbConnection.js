import mongoose from "mongoose";

mongoose.set('strictQuery', false)  // for unkwon query siplmy move 

const connectionDb=async()=>{
               try {
                const {connection}=await mongoose.connect(
                    process.env.MONGO_URL  || `mongodb://127.0.0.1:27017/lms`
                  )
                   if (connection) {
                    console.log(`Database is successfully connected ${connection.host}`);
                   } 
                   
               } catch (e) {
                console.log(e);
                process.exit(1);  // kill the server if gotteed an error 
                
               }
}

 export default  connectionDb