import User from "../Models/user.model.js";
import AppError from "../Util/error.util.js";
import  Jwt from "jsonwebtoken";
const isLoggedIn=async(req,res,next)=>{
      const {token }=req.cookies;
      if (!token) {
        return next(new AppError("unauthorized user ", 400) )
      }
      const userDetails= await Jwt.verify(token,process.env.JWT_SECRET);

      req.user=userDetails;

      next();
}


  //  create a middleware for check the particular user role 

    const authorisedRole=(...roles)=>async(req,res,next)=>{
             const currentUserRole=req.user.role;
            console.log("req role in auth >", req.user.role);
            
              if (!roles.includes(currentUserRole)) {
                  return next(new AppError("You dont have to permisson to acces this "))
              }
              next();
    }

     const subscribe_user=async(req,res,next)=>{
            const subscription=req.user.subscription;
            const currentUserRole=req.user.role;
            const user = await User.findById(req.user.id)
               if (currentUserRole==!'ADMIN' && subscription!=='active') {
                 return next( new AppError("Pls subscribe to access this route  ", 403))
               }

               // otherwise  do next 
                next();
     }
    
export {
    isLoggedIn,
    authorisedRole,
    subscribe_user
}