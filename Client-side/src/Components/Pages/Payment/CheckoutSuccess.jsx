import React, { useEffect } from "react";
import HomeLayout from "../../Layout/HomeLayout";
import { AiFillCheckCircle } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserData } from "../../../Redux/Slices/authSlice";

     function CheckoutSuccess() {
      const dispatch=useDispatch();
        
          

    const location=useLocation();
        const search=new URLSearchParams(location.search);

        const amount=search.get("amount") || "N/A"
        const transactionId=search.get("transaction_id")  || "N/A"

        useEffect(() => {
          const fetchData = async () => {
            await dispatch(getUserData());
          };
          fetchData();
        }, [dispatch]);
        

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center bg-base-200 text-white px-4">
        <div className="w-full max-w-lg bg-base-100 shadow-xl rounded-xl p-6 border border-neutral">
          
          {/* Success Icon */}
          <div className="flex justify-center">
            <AiFillCheckCircle className="text-success text-6xl" />
          </div>

          {/* Success Message */}
          <h2 className="text-center text-2xl font-bold text-white mt-4">
            Payment Successful! 
          </h2>
          <p className="text-center text-neutral-content text-lg">
            Thank you for your payment. Your transaction has been completed successfully.
          </p>

          {/* Payment Details */}
          <div className="bg-base-300 p-4 rounded-lg mt-6">
            <div className="flex justify-between">
              <span className="text-neutral-content">Amount Paid</span>
              <span className="font-semibold text-white">{amount}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-neutral-content">Transaction ID</span>
              <span className="font-semibold text-white">{transactionId}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-neutral-content">Date</span>
              <span className="font-semibold text-white">
  {new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })}
</span>
            </div>
          </div>

          {/* Dashboard Button */}
          <div className="mt-6 flex justify-center">
            <Link to="/">
              <button className="btn bg-green-600 w-full text-lg">Back to Dashboard</button>
            </Link>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CheckoutSuccess;
