import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { purchaseCourseBundle, razorpayPaymentId, razorpayPaymentVerfiy } from '../../../Redux/Slices/RazorpaySlice';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import HomeLayout from '../../Layout/HomeLayout';

function Checkout() {
  
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const razorpay_id=useSelector((state)=>state?.razorpay?.key);
    const subscription_id=useSelector((state)=>state?.razorpay?.subscription_id);

   
     
    console.log("subscription id ",subscription_id);
    console.log("razorpay id ", razorpay_id);
    
      const userData=useSelector((state)=>state?.auth?.data);
    const paymentDetails={
        razorpay_payment_id:"",
        razorpay_subscription_id:"",
        razorpay_signature:"",
     }
     

       async  function handleForm(e){
        e.preventDefault();
          if ( !razorpay_id || !subscription_id) {
             toast.error("Something went wrong ")
             return;
          }
         
          const options={
            key:razorpay_id , 
            subscription_id:subscription_id,
             name:"Edtech pvt limited",
             description: "subscription",
             theme:{
                color:"#F37254"
             },
             prefill:{
                 email:userData.email,
                 name:userData.fullName
             },
             handler:async function (response) {
                paymentDetails.razorpay_payment_id=response.razorpay_payment_id;
                paymentDetails.razorpay_subscription_id=response.razorpay_subscription_id;
                paymentDetails.razorpay_signature=response.razorpay_signature;

                // if all three propery find 
                toast.success("payment successfully ")  ;

                // then verfy the payment make request  on backend 
const res =await dispatch(razorpayPaymentVerfiy(paymentDetails));
             console.log(" response in checkout ",res);
             
                  navigate('/checkout/success')
                // then do jdugment if verfy then do something if not verfy do something 
                 res?.payload?.success ? navigate("/checkout/success") :  navigate("/checkout/fail")
             }
          }

           // open new window if payment is done 
          const paymentObject= new window.Razorpay(options);
          paymentObject.open();

       }

       const onLoad=async()=>{
        await dispatch(razorpayPaymentId());
        await dispatch(purchaseCourseBundle())
      }
      
    
    useEffect(() => {
       onLoad();
    }, []);
      
  return (
    <HomeLayout>
      <form
        onSubmit={handleForm}
        className="min-h-screen flex items-center justify-center bg-gray-900 p-4"
      >
        <div className="w-96 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 rounded-3xl shadow-2xl relative flex flex-col items-center border border-gray-700 backdrop-blur-lg">
          {/* Header */}
          <h1 className="text-center bg-green-400 text-black absolute top-0 w-full py-4 text-xl font-extrabold rounded-t-3xl shadow-md">
             Premium Subscription
          </h1>

          {/* Content */}
          <div className="pt-16 text-center space-y-6 px-6">
            <p className="text-lg leading-relaxed text-gray-300 font-medium">
              Unlock <span className="font-bold text-white">unlimited access</span> to all courses.
              <span className="block text-orange-300 font-semibold mt-2 text-xl">
                1-Year Membership 
              </span>
              Includes all **existing & upcoming courses**.
            </p>

            {/* Price Section */}
            <p className="flex items-center justify-center gap-2 text-3xl font-bold text-orange-500">
              ₹499 <span className="text-lg font-medium text-gray-400">/year</span>
            </p>

            {/* Refund Information */}
            <div className="text-gray-400 text-sm bg-gray-800 py-2 px-4 rounded-lg border border-gray-700 shadow-md">
              <p> 100% refund if canceled within 7 days</p>
            </div>

            {/* Buy Now Button */}
            <button
              type="submit"
              className="bg-green-500 cursor-pointer hover:bg-green-400 transition-all duration-300 w-full py-3 text-xl font-bold rounded-lg shadow-lg mt-6 hover:scale-105 transform active:scale-95"
            >
               Get Premium Now
            </button>
          </div>
        </div>
      </form>
    </HomeLayout>
  );




}
export default Checkout


