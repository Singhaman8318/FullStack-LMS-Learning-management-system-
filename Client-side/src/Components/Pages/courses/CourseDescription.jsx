// import React, { useEffect } from 'react'
// import { useLocation } from 'react-router-dom'
// import HomeLayout from '../../Layout/HomeLayout';
// import { useSelector } from 'react-redux';

// function CourseDescription() {

//     const {state}=useLocation();
//         const {role , data}=useSelector((state)=>state.auth)
//     useEffect(()=>{
        
//     })
//   return (
//     < HomeLayout>
     
//             <div className='min-h[90vh] pt-12 px-20 flex flex-col justify-center text-white '>
//                 <div className='grid grid-cols-2 gap-10 py-10 relative'>
//                         <div className=' space-x-5'>
//                             <img className='w-full h-64'
//                                src={state?.thumbnail?.secure_url}
//                             />

//                                <div className='space-y-4'>
//                                <div className='flex items-center flex-col  justify-between text-xl '>
//                                 <p className='font-semibold'>
//                                     <span className='text-yellow-500 font-bold'>Total Lecures :</span>
//                                     {state?.numeroflectures}
//                                 </p>

//                                 <p className='font-semibold'>
//                                     <span className='text-yellow-500 font-bold'>Instructor  :</span>
//                                     {state?.createdBy}
//                                 </p>  
//                                </div>

//                             { role ==='ADMIN' || data?.subscription?.stauts=== 'ACTIVE' ? (

//                                 <button className='bg-yellow-500 text-xl rounded-md font-bold px-5 py-3 w-full cursor-pointer'>watch now </button>
//                             ) : (
//                                 <button className='bg-yellow-500 text-xl rounded-md font-bold px-5 py-3 w-full cursor-pointer'>click to subscribe  </button>

//                             )}
//                                </div>
//                              </div>


//                              <div className='space-y-2 text-xl '>
//                                 <h1 className='text-3xl font-bold text-yellow-500  mb-5 text-center'>
//                                     {state.title}
//                                 </h1>

//                                 <p className='text-yellow-500 '>course Description</p>
//                                 <p>{state.description}</p>
//                              </div>
//                 </div>
//             </div>
//      </HomeLayout>
//   )
// }

// export default CourseDescription



import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaPlayCircle, FaShoppingCart, FaCheckCircle } from "react-icons/fa";
import HomeLayout from "../../Layout/HomeLayout";

function CourseDescription() {
  const { state } = useLocation();
  const { role, data } = useSelector((state) => state.auth);
    const navigate=useNavigate();
  return (
    <HomeLayout>
      <div className="min-h-screen bg-gray-900 px-6 md:px-16 lg:px-28 py-10 text-gray-100">
        
        {/* Breadcrumbs */}
        <div className="text-sm breadcrumbs text-gray-400 mb-6">
          <ul className="flex space-x-2">
            <li><a href="/" className="hover:text-gray-300">Home</a> / </li>
            <li><a href="/courses" className="hover:text-gray-300">Courses</a> / </li>
            <li className="text-gray-100 font-semibold">{state?.title}</li>
          </ul>
        </div>

        {/* Course Header */}
        <div className="grid md:grid-cols-3 gap-10 items-center">
          {/* Course Details */}
          <div className="md:col-span-2 space-y-4">
            <h1 className="text-4xl font-extrabold text-orange-400">{state?.title}</h1>
            <p className="text-lg text-gray-400">{state?.description}</p>
            <p className="text-md font-semibold text-green-400">📅 Enrollment Open – Limited Seats!</p>

            {/* Role Based CTA Buttons */}
            <div className="mt-4 flex space-x-4">
              {role === "ADMIN" || data?.subscription?.status === "active" ? (
                <button
                onClick={()=>navigate('/course/displaylecture' ,{state:{...state}})}
                 className="btn bg-green-500 hover:bg-green-600 px-6 py-3 flex items-center gap-2 rounded-md shadow-lg transition-all">
                  <FaPlayCircle /> Watch Now
                </button>
              ) : (
                <button  onClick={()=>navigate('/checkout')} className="btn bg-yellow-500 hover:bg-yellow-600 px-6 py-3 flex items-center gap-2 rounded-md shadow-lg transition-all">
                  <FaShoppingCart /> Buy Now
                </button>
              )}
            </div>
            <p className="text-gray-500 text-sm italic">*EMI Options Available</p>
          </div>

          {/* Course Thumbnail */}
          <div className="relative shadow-lg rounded-lg overflow-hidden bg-gray-800 p-2">
            <img className="w-full h-56 object-cover rounded-md" src={state?.thumbnail?.secure_url} alt="Course" />
            <div className="absolute bottom-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-md shadow-md">
              {state?.category}
            </div>
          </div>
        </div>

        {/* Course Details Section */}
        <div className="mt-12 bg-gray-800 shadow-lg p-6 rounded-lg">
          <h2 className="text-2xl font-bold border-b pb-2 text-gray-200 text-center">
            📖 Course Details
          </h2>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-300">
            <p className="font-medium flex items-center gap-2 justify-center">
              <FaCheckCircle className="text-green-400" /> {state?.numberoflectures} Lectures
            </p>
            <p className="font-medium flex items-center gap-2 justify-center">
              <FaCheckCircle className="text-blue-400" /> Instructor: {state?.createdBy}
            </p>
            <p className="font-medium flex items-center gap-2 justify-center">
              <FaCheckCircle className="text-purple-400" /> Category: {state?.category}
            </p>
          </div>
        </div>

      </div>
    </HomeLayout>
  );
}

export default CourseDescription;
