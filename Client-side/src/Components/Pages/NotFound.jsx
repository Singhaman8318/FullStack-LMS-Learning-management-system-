// import React, { useState } from 'react'
// import HomeLayout from '../Layout/HomeLayout'
// import { useNavigate } from 'react-router-dom'

// function NotFound() {
//   const navigate=useNavigate();
  
//   return (
//       <HomeLayout>
//   <div className='w-full flex items-center flex-col justify-center h-screen bg-[#162141]'>

//        <h1 className=' text-9xl font-extrabold text-white  tracking-widest'> 404 </h1>

//          <div className='bg-black text-white px-2 text-sm rounded rotate-12 absolute'>

//             Page not found ....
//          </div>

//            <button className='m-5 cursor-pointer '
//               onClick={()=>navigate(-1)}
//            >
//             <a  className='realative inline-block text-sm  
//             font-medium text-[#FF6A3D]'>
//                   <span className='relative block px-8 py-3bg-[#1A2238 ] border border-current text-xl'>
//                       Go Back
//                   </span>


//             </a>
//            </button>
//   </div>

//       </HomeLayout>
//   )
// }

// export default NotFound

import React from 'react';
import HomeLayout from '../Layout/HomeLayout';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  
  return (
    <HomeLayout>
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white'>
        <h1 className='text-9xl font-extrabold text-error drop-shadow-lg'>404</h1>
        <div className='bg-error text-white px-4 py-2 text-sm font-bold rounded-md shadow-md mt-4 animate-bounce'>
          Page not found
        </div>
        <button 
          className='mt-6 cursor-pointer px-6 py-3 text-lg font-medium bg-primary text-white rounded-lg shadow-lg hover:bg-primary-focus transition-all duration-300 ease-in-out'
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </HomeLayout>
  );
}

export default NotFound;