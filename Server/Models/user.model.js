import { Schema,model } from "mongoose";
import bcrypt from "bcryptjs";
import Jwt from 'jsonwebtoken'
import crypto from 'crypto'
const userSchema=new Schema({

    fullName:{
      type:String,
      required:[true , "Name is required"],
      minLength:[5, "Name must be at least 5 char"],
      maxLength:[20, "Name should be less than 50 char"],
      lowercase:true,
      trim:true
    },
    email:{
        type:String,
        required:[true , 'Email must be rquired'],
        trim:true,
        unique:true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please enter a valid email address"
        ]
        },
     password:{
        type:String ,
        required:[true, "Password is require "],
        minLength:[8, "password must be st least 8 char"],
        select:false
     },
     avatar:{
        public_id:{
            type:String
        },
        secure_url:{
            type:String
        },
     },
     role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER'
     },
     forgotPasswordToken:String,
     forgotPasswordexpired:Date,
     subscription:{
        id:String,
        status: String,
     }    
} ,{
    timestamps:true
 }
)

// add the encryption 
    userSchema.pre("save", async function(next){
        if (!this.isModified("password")) {
          return  next();
        }
        this.password=await bcrypt.hash(this.password,10);
        this.passwordChangedAt = Date.now() - 1000
        next();
    })


    // generic method for JWT token 
    // remove async wait 
    userSchema.methods={
        getJwtToken:  function(){
            return  Jwt.sign(
                {id:this._id, email:this.email ,subscription: this.subscription , role: this.role},
                process.env.JWT_SECRET,
                {
                    expiresIn:process.env.JWT_EXPIRY
                }
            )
        },

        // for compairing the password based on plain text and exncrypted text using the bcrypt 
      
        comparePassword: async function(plaintextPassword){
            return  await bcrypt.compare(plaintextPassword, this.password)
        },

        // for reseting the password
        // use crypto for encrypting the pasword  ( crypto algo)
        genratePasswordResetToken:async function(){
            const resetToken=crypto.randomBytes(20).toString('hex');
            this.forgotPasswordToken= crypto.createHash('sha256').update(resetToken).digest('hex')
            this.forgotPasswordexpired= Date.now() + 15*60 * 100;  // 15 min from now 

            return resetToken;
        }
    }

    // define the function for reseting the password 
     
const User=model("users",userSchema);

 export default  User;