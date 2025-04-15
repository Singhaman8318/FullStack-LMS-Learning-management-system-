import React from "react";
import HomeLayout from "../../Layout/HomeLayout";
import { Link } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";

function CheckoutFail() {
  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center bg-gray-900 text-white px-4">
        <div className="w-full max-w-lg bg-gray-800 shadow-2xl rounded-2xl p-8 border border-red-500 text-center">
          {/* Failure Icon */}
          <div className="flex justify-center">
            <AiFillCloseCircle className="text-red-500 text-7xl" />
          </div>
          
          {/* Failure Message */}
          <h2 className="text-3xl font-extrabold text-white mt-4">Payment Failed</h2>
          <p className="text-neutral-400 text-lg mt-2">Oops... something went wrong. Please try again.</p>
          
          {/* Retry Button */}
          <div className="mt-6 flex justify-center">
            <Link to="/checkout">
              <button className="btn bg-red-600 hover:bg-red-700 text-lg px-6 py-2 rounded-lg shadow-lg">
                Try Again
              </button>
            </Link>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CheckoutFail;