import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HomeLayout from '../../Layout/HomeLayout';
import { Link, useNavigate } from 'react-router-dom';
import { unSubcribeCourse } from '../../../Redux/Slices/RazorpaySlice';
import { getUserData } from '../../../Redux/Slices/authSlice';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import handleLogout from '../../../Redux/Slices/authSlice'
function Profile() {

    const userData=useSelector((state)=>state?.auth?.data);
    const navigate=useNavigate();
    
      useEffect(()=>{
        console.log("  user data in profile ",userData);
        
      } , [])
      const dispatch=useDispatch();
           const handleCancleation=async()=>{
            toast("Initating to unsubsrbie ")

                     const res=  dispatch(unSubcribeCourse())

                     console.log(res);
                     
                     await dispatch(getUserData())
                     toast.success("unsubscribe usccessfully !")
                     navigate('/')
           }

    
    


// return (
//     <HomeLayout>
//       <div className="min-h-[90vh] flex items-center justify-center bg-gray-900 p-4">
//         <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg overflow-hidden p-6 text-white">
//           {/* Profile Image */}
//           <div className="flex flex-col items-center">
//             <img
//               className="w-32 h-32 object-cover rounded-full border-4 border-gray-600"
//               src={userData?.avatar?.secure_url || "/default-avatar.png"}
//               alt="User Avatar"
//             />
//             <h3 className="text-2xl font-semibold mt-4 capitalize">
//               {userData?.fullName || "User Name"}
//             </h3>
//             <p className="text-gray-400 text-sm">{userData?.email || "user@example.com"}</p>
//           </div>

//           {/* User Details */}
//           <div className="mt-6 space-y-4">
//             <div className="flex justify-between text-gray-300 font-medium">
//               <span>Role:</span>
//               <span className="capitalize">{userData?.role || "User"}</span>
//             </div>
//             <div className="flex justify-between text-gray-300 font-medium">
//               <span>Subscription:</span>
//               <span className={
//                 userData?.subscription?.status === "active"
//                   ? "text-green-400"
//                   : "text-red-500"
//               }>
//                 {userData?.subscription?.status === "active" ? "active" : "Inactive"}
//               </span>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="mt-6 flex flex-col gap-3">
//             <Link
//               to="/logout"
//               className="w-full bg-orange-600 text-white text-center py-2 rounded-md hover:bg-yellow-700 transition"
//             >
//                Logout
//             </Link>

//             <Link
//               to="/edit-Profile"
//               className="w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition"
//             >
//               Edit Profile
//             </Link>

//             {userData?.subscription?.status === "active" && (
//               <button  onClick={handleCancleation} className="w-full cursor-pointer  bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition">
//                 Cancel Subscription
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </HomeLayout>

return(
<HomeLayout>
  <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
    <div className="w-full max-w-md bg-gray-800 shadow-xl rounded-2xl overflow-hidden p-8 text-white transition-all">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <img
          className="w-32 h-32 object-cover rounded-full border-4 border-blue-500 shadow-md"
          src={userData?.avatar?.secure_url || "/default-avatar.png"}
          alt="User Avatar"
        />
        <h3 className="text-2xl font-bold mt-4 capitalize tracking-wide">
          {userData?.fullName || "User Name"}
        </h3>
        <p className="text-gray-400 text-sm font-light">{userData?.email || "user@example.com"}</p>
      </div>

      {/* User Details */}
      <div className="mt-6 space-y-4">
        <div className="flex justify-between text-gray-300 font-semibold text-base">
          <span>Role:</span>
          <span className="capitalize">{userData?.role || "User"}</span>
        </div>
        <div className="flex justify-between text-gray-300 font-semibold text-base">
          <span>Subscription:</span>
          <span
            className={`${
              userData?.subscription?.status === "active"
                ? "text-green-400"
                : "text-red-500"
            } font-bold`}
          >
            {userData?.subscription?.status === "active" ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col gap-3">
        <Link
          to="/login"
          onClick={handleLogout}
          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-center py-2 rounded-lg font-semibold shadow-md hover:scale-[1.02] transition-all"
        >
          Logout
        </Link>

        <Link
          to="/edit-profile"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-2 rounded-lg font-semibold shadow-md hover:scale-[1.02] transition-all"
        >
          Edit Profile
        </Link>

        {userData?.subscription?.status === "active" && (
          <button
            onClick={handleCancleation}
            className="w-full bg-gradient-to-r cursor-pointer from-red-600 to-pink-600 text-white py-2 rounded-lg font-semibold shadow-md hover:scale-[1.02] transition-all"
          >
            Cancel Subscription
          </button>
        )}
      </div>
    </div>
  </div>
</HomeLayout>

  );


}
export default  Profile;