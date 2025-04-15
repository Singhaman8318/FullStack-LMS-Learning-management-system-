// import { Buffer } from "buffer";

import User from '../Models/user.model.js'
import { razorpay } from '../server.js';
import AppError from '../Util/error.util.js';
import crypto from 'crypto'
import Payment from '../Models/payment.model.js'




        const getRazorpayAPIKey=(req,res,next)=>{
            res.status(200).json({
                success: true,
                message:"Your razorpay key ",
                key:process.env.RAZORPAY_KEY_ID
            })
        }



                const buySubscription=async(req,res,next)=>{
                    try {
                        const {id}=req.user;

                        const user=await User.findById(id);
    
                        if (!user) {
                            return next(new AppError(" unauthorized pls login ", 400))
                        }
                            // if user is admin so dont have the access of subscription bcoz admin is raja aadmi 
                         if (user.role==='ADMIN') {
                            return next( new AppError('Admin cannot add a subscription', 400))
                         }
    
                         // if user is not admin 
                         // for rajorpay subscription  some essential things need to write  like rajropay plan id 
                         const subscription= await  razorpay.subscriptions.create({
                            plan_id:process.env.RAZORPAY_PLAN_ID,
                            customer_notify:1,  //  notfication fro coustomer
                            total_count:12   
                         });

                         console.log("env v" , process.env.RAZORPAY_PLAN_ID);
                         
                          // set the status of the subscription 
                          user.subscription.id=subscription.id;
                          user.subscription.status=subscription.status;
    
                          // now save it at user level 
    
                          await user.save();
    
                          // now set the status and verify 
    
                          res.status(200).json({
                            success:true,
                            message:"Subscribe successfully",
                            subscription_id:subscription.id
    
                          })
                    } catch (error) {
                        console.log("Error Details:", error.response?.data || error);
                    
                        return next(new AppError(error?.response?.data?.message || error?.message || "Something went wrong", 400));
                    }
                    

                }



  const   verifySubscription = async (req, res, next) => {
        try {
            const { id } = req.user;
            const { razorpay_payment_id, razorpay_signature, razorpay_subscription_id } = req.body;
    

              console.log("req body is " , req.body);
              
            const user = await User.findById(id);
    
            if (!user) {
                return next(new AppError("Not authorized pls Login ....!", 400));
            }
    
            const subscriptionId = user.subscription.id;
    
            const genratedSignature = crypto
                .createHmac('sha256',process.env.RAZORPAY_SECRET)
                .update(`${razorpay_payment_id}|${subscriptionId}`)
                .digest("hex");
                  
                console.log("genrated signature is >", genratedSignature);

                console.log("genrated razorpay signature is " , razorpay_signature );
                
                console.log("payment id " ,razorpay_payment_id);
                console.log("subscription id "  , razorpay_subscription_id);
                
                
            if (genratedSignature !== razorpay_signature) {
                return next(new AppError("Payment is not verfied pls try again ", 500));
            }
    
            await Payment.create({
                razorpay_payment_id,
                razorpay_signature,
                razorpay_subscription_id,
            });
    
            user.subscription.status ='active';
            await user.save();
    
            res.status(200).json({
                success: true,
                message: "Payment verfied succesfully",
            });
        } catch (error) {

            console.log(error.message);
            
            return next(new AppError(error.message, 500));
        }
    };

                const  cancelSubscription=async(req,res,next)=>{
                        try {
                            const {id}=req.user;
                        // check user is esxit  or not 

                        const user=await User.findById(id);
                        if (!user) {
                            return next(new AppError("Not authorzied please Login ...!"))
                        }

                          // if user is a admin denined the permisson 
                            if (user.role=== 'ADMIN') {
                               return neex( new AppError("Not allowed for the ADMIN " , 500)) 
                            }
                    /// if user is exist now cancel te payment or say uncsubsribe the payments 

                    // for doing the unsubscribe of payment we need to the subscription id of the particular user 

                    const subscriptionId= user.subscription.id;
                        
                    // create the instance of the razorpay 

                    const unsubscribe = await razorpay.subscriptions.cancel(subscriptionId);
                                    console.log("unsubscribe    in cancle ",unsubscribe.status);
                                    
                          // now update the status of the user 
                          user.subscription.status=unsubscribe.status;
                        //   user.subscription.status='inactive'

                          // now save it in to the DB 
                          await user.save();

                          // send the response 

                          res.status(200).json({
                            success:true, 
                            message:"Unsubscribe SUccessfuuly "
                          })
                        } catch (error) {
                            console.log(" unsubsribe message",error.message);
                            
                            return next(new AppError(error.message , 500))
                        }


                }

                const AllPayments=async(req,res,next)=>{
                          try {
                            const {count}=req.query;

                            const subscriptions=await razorpay.subscriptions.all({
                                count:count || 10
                            })
                            if (!subscriptions) {
                                return next(new AppError("failed to fetch the subscription" , 400))
                            }
                                    console.log("Subscription in payment contgroller",subscriptions.items);
                                    

                 // month mapping  & initlization 
                  const monthNames=[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                  ]

                  // now initliaze month with vlaues 

                  const finalMonths={
                    January:0,
                    February:0,
                    March:0,
                    April:0,
                    May:0,
                    June:0,
                    July:0,
                    August:0,
                    September:0,
                    October:0,
                    November:0,
                    December:0
                  }

                // now abstract the subscription month
                
                const monthlyWisePayments=subscriptions.items.map((payment)=>{
                    const monthsInNumbers=new Date(payment.start_at * 1000)
                    return monthNames[monthsInNumbers.getMonth()];
                });

                // now calculte the monthly payment 
                monthlyWisePayments.map((month)=>{
                    Object.keys(finalMonths).forEach((objMonth)=>{
                         if (month=== objMonth) {
                            finalMonths[month]+=1;
                         }
                    })
                })

                // now creates the motnhly sales record 

                const monthlySalesRecord=[];
                Object.keys(finalMonths).forEach((monthName)=>{
                    monthlySalesRecord.push(finalMonths[monthName])
                })
                            // if subscription is genrated all things is done 

                            res.status(200).json({
                                success:true,
                                message:"All payments fetched successfully" , 
                                subscriptions,
                                finalMonths,
                                monthlySalesRecord
                            })
                          } catch (error) {
                             return next(new AppError(error.message , 500))
                          }
                }


    export {
        getRazorpayAPIKey,
        buySubscription,
        verifySubscription,
        cancelSubscription,
        AllPayments        
    }



// import User from '../Models/user.model.js';
// import { razorpay } from '../server.js';
// import AppError from '../Util/error.util.js';
// import crypto from 'crypto';
// import Payment from '../Models/payment.model.js';

// const getRazorpayAPIKey = (req, res, next) => {
//     res.status(200).json({
//         success: true,
//         message: "Your razorpay key ",
//         key: process.env.RAZORPAY_KEY_ID,
//     });
// };

// const buySubscription = async (req, res, next) => {
//     const { id } = req.user;
//     const user = await User.findById(id);

//     if (!user) {
//         return next(new AppError("unauthorized pls login", 400));
//     }

//     if (user.role === 'ADMIN') {
//         return next(new AppError('Admin cannot add a subscription', 400));
//     }

//     const subscription = await razorpay.subscriptions.create({
//         plan_id: process.env.RAZORPAY_PLAN_ID,
//         customer_notify: 1,
//         total_count: 12,
//     });

//     user.subscription.id = subscription.id;
//     user.subscription.status = subscription.status;

//     await user.save();

//     res.status(200).json({
//         success: true,
//         message: "Subscribe successfully",
//         subscription_id: subscription.id,
//     });
// };

// const verifySubscription = async (req, res, next) => {
//     try {
//         const { id } = req.user;
//         const { razorpay_payment_id, razorpay_signature, razorpay_subscription_id } = req.body;

//         const user = await User.findById(id);

//         if (!user) {
//             return next(new AppError("Not authorized pls Login ....!", 400));
//         }

//         const subscriptionId = user.subscription.id;

//         const generatedSignature = crypto
//             .createHmac('sha256', process.env.RAZORPAY_SECRET)
//             .update(razorpay_subscription_id + "|" + razorpay_payment_id)
//             .digest("hex");

//         if (generatedSignature !== razorpay_signature) {
//             return next(new AppError("Payment is not verified pls try again ", 500));
//         }

//         await Payment.create({
//             razorpay_payment_id,
//             razorpay_signature,
//             razorpay_subscription_id,
//         });

//         user.subscription.status = "active";
//         await user.save();

//         res.status(200).json({
//             success: true,
//             message: "Payment verified successfully",
//         });
//     } catch (error) {
//         return next(new AppError(error.message, 500));
//     }
// };

// const cancelSubscription = async (req, res, next) => {
//     try {
//         const { id } = req.user;
//         const user = await User.findById(id);

//         if (!user) {
//             return next(new AppError("Not authorized please Login ...!"));
//         }

//         if (user.role === 'ADMIN') {
//             return next(new AppError("Not allowed for the ADMIN", 500));
//         }

//         const subscriptionId = user.subscription.id;
//         const unsubscribe = await razorpay.subscriptions.cancel(subscriptionId);

//         user.subscription.status = unsubscribe.status;
//         await user.save();

//         res.status(200).json({
//             success: true,
//             message: "Unsubscribe Successfully",
//         });
//     } catch (error) {
//         return next(new AppError(error.message, 500));
//     }
// };

// const AllPayments = async (req, res, next) => {
//     try {
//         const { count } = req.query;
//         const subscriptions = await razorpay.subscriptions.all({
//             count: count || 10,
//         });

//         if (!subscriptions) {
//             return next(new AppError("failed to fetch the subscription", 400));
//         }

//         res.status(200).json({
//             success: true,
//             message: "All payments fetched successfully",
//             subscriptions,
//         });
//     } catch (error) {
//         return next(new AppError(error.message, 500));
//     }
// };

// export {
//     getRazorpayAPIKey,
//     buySubscription,
//     verifySubscription,
//     cancelSubscription,
//     AllPayments,
// };