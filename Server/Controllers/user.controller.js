import User from "../Models/user.model.js";
import AppError from "../Util/error.util.js";
import cloudinary from 'cloudinary'
import sendEmail from '../Util/sendEmail.js'
import crypto from 'crypto'
import fs from "fs/promises";
 const cookieOption={
    maxAge:7 *24 * 60 * 60 *100,
    httpOnly: true
 }
const register=async(req,res,next)=>{
      const {fullName,email,password,role}=req.body;
       if (!fullName || !email || !password) {
          return  next(new AppError("All fileds are required !!!!",400))
       }
     // check if user is availabe 
     const existUser= await User.findOne({email})
   // console.log("exst user in signup", existUser.fullName );
   
     if (existUser) {
        return  next(new AppError("User is already exisit", 400));

     }
     // create a new user
     // User comes from userSchema 
     const user=await User.create({
        fullName,
        email,
        password,
        role:role || 'USER',
        avatar:{
        public_id:email,
        secure_url: 'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
        }
     })


         if (!user) {
            return next(new AppError("User registration failed  , please try again later "))
         }

         console.log("user is ",user);
         
               console.log("req boisy ",req.body);
               

     //  : for file upload 
   console.log("file",req.file);
   
         if(req.file){
              try {
               const result= await cloudinary.v2.uploader.upload(req.file.path,{
                  folder:'lms', // changable according to need
                  width:250, 
                  height:250,
                  gravity:"faces",
                  crop:"fill"
                })
                if (result) {
                  user.avatar.public_id=result.public_id;
                  user.avatar.secure_url=result.secure_url;

                  // remove the file from local server 
                  // fs.rm(`uploads/${req.file.filename}`)   needs to on 
                }
              } catch (error) {
                 return next(new AppError(error || "File not upload !... please try again "))
              }
         }
      await   user.save();

      // if user is registred directly done login 
       // if not work set user.getJwtToken()
       const token=await user.getJwtToken();
       res.cookie("token",token,cookieOption)

     // if all things is done save it in to the database
      // send status after sucessfully registerd 
      user.password=undefined;
      res.status(200).json({
        success:true,
        meassage:"User registerd Successfully ",
        user
      }) 

      
};


const login=async(req,res,next)=>{
  const {email, password}=req.body;

    try {
        if (!email || !password) {
            return next(new AppError("All fileds must be required",403))
        }
    
        // find the user based on the email
         // if not work check User.find method  
        const user=await User.findOne({email,})
        .select('+password');

        // here the comparePassword we right a genric method in userSchema
         if (!user || ! await user.comparePassword(password)) {
            return next(new AppError("Email or Password does not match", 400))
         }
         // if user has all credentilas 
         
         // genrate a token 
        // if gooted eror in token so use user.getjwtToken()
         const token=await user.getJwtToken();
            user.password=undefined;
         //once the token is genrated store it in the cookie 
         res.cookie("token",token,cookieOption);
    
         res.status(200).json({
            success:true,
            message:"user Logged in successfully ",
             user
         })
    } catch (error) {
        return next(new AppError(error.message, 500))
    }
   
};

const logout=(req,res,next)=>{
    try {
      res.cookie('token',null,{
         secure:true,
         maxAge:0,
         httpOnly:true
      }) 
      
               res.status(200).json({
                  success:true,
                  message:"User is Logout Successfully "
               })
    } catch (error) {
      return next(new AppError("failed to logout" , 500))
    }
}

const getProfile=async(req,res)=>{
  
    try {
      const userId=req.user.id;
  const user=await User.findById(userId);

  res.status(200).json({
   success:true,
   message:"User detalis",
   user
  })
    } catch (error) {
      return next(new AppError("failed to fetch the data ", 400))
    } 
} 

                const forgotPassword=async(req,res,next)=>{
                     const {email}=req.body;
                     if (!email) {
                        return next(new AppError("Email is required!!!",400))
                     }

                     // check user is exist or not 
                     const user=await User.findOne({email});

                     if (!user) {
                        return next(new AppError("Email is not registered",400))
                     }
               // if user is exist so genrate a frgotpassword reset token in  user.model schema

                const resetToken=await user.genratePasswordResetToken();

                console.log("Token in frogot pasword " , resetToken);
                
                // save the token in DB 
                  await user.save();

                  // after saving genrate a url for send the user 

                  const resetPassowrdURL=`${process.env.FRONTEND_URL}/reset-password${resetToken}`
                console.log("reset url ",resetPassowrdURL);
                
                  // create a genric method for reseting passowrd 
                  try {
                     const subject="reset password"
                     const message=`${resetPassowrdURL}`
                     await sendEmail(email,subject,message );
                     res.status(200).json({
                        success:true,
                        message:`Reset password token has been sent to ${email} successfully `
                     })
                  } catch (error) {

                     // if email is not send so reset the tokens and save it in db  
                     user.forgotPasswordToken=undefined;
                     user.forgotPasswordexpired=undefined;

                     await user.save();
                     return next(new AppError(error.message, 500))
                  }
                }

            const resetPassword=async(req,res, next)=>{
                  const {resetToken}= req.params;
                  const {password}= req.body;

                  // comapre using the bcrypt 

                  const forgotPasswordToken=crypto.createHash('sha256').
                  update(resetToken).digest('hex');

                  // now find the user in DB 

                  const user =await User.findOne({
                     forgotPasswordToken,
                     forgotPasswordexpired:{$gt: Date.now()}
                  });  

                  if (!user) {
                     return next( new AppError("token is invalid please try again " , 400))
                  }
                  // reset the password ; 
                  user.password=password;
                  user.forgotPasswordToken=undefined;
                  user.forgotPasswordexpired=undefined;

                   try {
                     await  user.save()
                     
                   } catch (error) {
                     console.log("error while saving the data in db " , error);
                     
                      return next(new AppError(error || "error while saving in DB " , 400))
                   }
                  res.status(200).json({
                     success:true,
                     message:"Password reset successfully !....."
                  })
            }

     const change_password=async(req,res,next)=>{
        const {oldPassword, newPassword}=req.body;
        const userId=req.user.id ;

        console.log("user id in change password " , userId);

        console.log("Old password in chnag password " , oldPassword);
        console.log("New  password in chnag password " , newPassword);

        
        // add validation 
         if (!oldPassword || !newPassword) {
            return next(new AppError("Pasword doest not exist pls try again", 400))
         }
         // find the user and password based on the ID 

         const user=await User.findById(userId).select('+password');
              if (!user) {
                return next(new AppError("User is not exist " , 400))
              }   

//   
//          // now comapre the password using comaprePassword method which is defiend in user.model 

              const isPasswordValid= await user.comparePassword(oldPassword);

              if (!isPasswordValid) {
               return next( new AppError("Password does not match"));
              }
              user.password=newPassword;
console.log("password during the save ",user.password=newPassword);

              await user.save();

              user.password=undefined;

              res.status(200).json({
               success:true,
               message:"Password change successfully "
              })
     }  

        const update_user=async(req,res,next)=>{
            try {
               const {fullName}=req.body;
              // const {userId}=req.user.id change to 
               const userId=req.user.id;
    
               // find user 
    
               const user=await User.findById(userId)  ;
    
               if (!user) {
                  return next(new AppError("User does not exist ", 400 ))
               }
    
               // if req.full name exxist then chagne with new new name 
    
               if (fullName) {
                  user.fullName=fullName;
               }
    
               // now check profile img is avilalbe 
                if (req.file) {
                   try {
                      const result= await cloudinary.v2.uploader.upload(req.file.path,{
                         folder:'lms', // changable according to need
                         width:250, 
                         height:250,
                         gravity:"faces",
                         crop:"fill"
                       })
                       if (result) {
                         user.avatar.public_id=result.public_id;
                         user.avatar.secure_url=result.secure_url;
       
                         // remove the file from local server 
                         fs.rm(`uploads/${req.file.filename}`) 
                       }
                     } catch (error) {
                        return next(new AppError(error.message , 500))
                     }
                }
                  // now save it in DB 
                  await user.save();
    
                  res.status(200).json({
                   success:true,
                   message:"User profile updated successfully ",
                   user
                  })
            } catch (error) {
               console.log(error.meassage);
               
               return next(new AppError(error.message, 500))
            }
        }

          const contactUs=async(req,res,next)=>{
             // destrucutring the name email message from req.body 
              const {name,email,message} =req.body;
                 console.log(name,email,message);
                 
                // add the validation 
                  if (!email || !name || !message) {
                     return next(new AppError("All filed are required" , 400))
                  } 

                  console.log("enviremoent variable in contact us ",process.env.CONTACT_US_EMAIL);
                  
                  console.log("SMTP Host:", process.env.SMTP_HOST);
                  console.log("SMTP Username:", process.env.SMTP_USERNAME);
                  console.log("SMTP Password:", process.env.SMTP_PASSWORD ? "Loaded" : "Not Loaded");
                  
                  try {
                     const subject=' Contact Us form'
                     const textmessage=`${name} - ${email} <br/> 
                        ${message}`

                      const response= await  sendEmail(process.env.CONTACT_US_EMAIL,subject, textmessage);

                      console.log("response in  contact password ", response);
                      
                       if (!response) {
                       return next(new AppError("Failed to send the email" , 500))
                       }

                       res.status(200).json({
                        success:true,
                        message:"Your request has been submitted successfully "
                       }
                       )
                  } catch (error) {

                     console.log("error message in contact us ",error.message);
                     
                     return next(new AppError(error.message , 500))
                  }
          }


          const useStats=async(req,res,next)=>{
              const allUserCount=await User.countDocuments();

              const subsciptionStatus=await User.countDocuments({
               "subscription.status":"active"
              })

              return res.status(200).json({
               success:true,
               message:"User count and subscption status send successfully",
               allUserCount,
               subsciptionStatus
              })
          }
export {
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword,
    change_password,
    update_user,
    contactUs,
    useStats
}