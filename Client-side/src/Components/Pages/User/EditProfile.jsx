import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { changePassword, getUserData, updateprofile } from '../../../Redux/Slices/authSlice';
import HomeLayout from '../../Layout/HomeLayout';
import { BsPersonCircle } from 'react-icons/bs';
import {  AiOutlineBackward } from 'react-icons/ai';

function EditProfile() {

  const dispatch=useDispatch();
  const navigate=useNavigate();

   const [oldPassword ,setOldPassword]=useState('');
   const [newPassword,setNewPassword]=useState('');
   const[showPasswordFileds,setShowPasswordFileds]=useState(false);
  const [userInput,setuserinput]=useState({
     fullName:"" ,
     previewImage:"",
     userid:useSelector((state)=>state?.auth?.data?._id),
     avatar:undefined
  })
           
  const handeImageUpload=(e)=>{
    e.preventDefault();

    const uploadImage=e.target.files[0];
       if (uploadImage) {
        const fileReader=new FileReader();
        fileReader.readAsDataURL(uploadImage);
        fileReader.addEventListener("load" ,function(){
          setuserinput({
            ...userInput,
            previewImage:this.result,
            avatar:uploadImage
          });
        });
      };
          }

          const onFormSubmit=async(e)=>{
            e.preventDefault();

            if (!userInput.fullName || !userInput.avatar) {
                toast.error("All field must be required");
                return
            };

            // if (userInput.fullLname.length >5 ) {
            //   toast.error("Name cannot be less than the five character ");
            //   return;
            // }
            
            // create form data bcoz we need to upload the image 
            const formData=new FormData();
            formData.append("fullName",userInput.fullName);
            formData.append("avatar", userInput.avatar);

            console.log(formData.entries().next());
            console.log(formData.entries().next());

        await dispatch(updateprofile([userInput.userid,formData]));

            // disptach the getUserdata function 
            await dispatch(getUserData());
                navigate('/profile');
         }

// for handle the user input 

const handleUserInput=(e)=>{
e.preventDefault();
const{name,value}=e.target;
  
setuserinput({
  ...userInput,
  [name]:value
})
}

  // for changing the user password 
   const enableChangePassword=async()=>{
   setShowPasswordFileds((prev)=>!prev);

    if (!oldPassword || !newPassword) {
       toast.error("Please enter yoyr passwords ....!");
        return
    }

     await dispatch(changePassword({oldPassword,newPassword}))
     
   }

    const viewPasswordSection=()=>{
      setShowPasswordFileds((prev)=>!prev);
    }
  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-screen bg-[#121212] text-white">
        <form
          onSubmit={onFormSubmit}
          className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg rounded-xl p-6 w-96 flex flex-col gap-5"
        >
          <h1 className="text-center text-2xl font-semibold text-gray-200">
            Edit Profile
          </h1>

          {/* Profile Image Upload */}
          <label
            htmlFor="image_uploads"
            className="w-28 h-28 rounded-full overflow-hidden m-auto border-2 border-gray-500 cursor-pointer"
          >
            {userInput.previewImage ? (
              <img
                src={userInput.previewImage}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <BsPersonCircle className="w-full h-full text-gray-400" />
            )}
          </label>
          <input
            type="file"
            className="hidden"
            id="image_uploads"
            accept=".jpg, .png, .jpeg"
            onChange={handeImageUpload}
          />

          {/* Full Name Input */}
          <div className="flex flex-col">
            <label htmlFor="fullName" className="text-gray-300 font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter your name"
              className="bg-gray-800 text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={userInput.fullName}
              onChange={handleUserInput}
              required
            />
          </div>


{/* update password  */}
          {/* Update Button */}
          <button
            type="submit"
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 transition-all text-white font-semibold py-2 rounded-lg"
          >
            Update Profile
          </button>

          
              {/* Change Password Section */}
<div className="flex flex-col gap-4 bg-gray-900 p-6  text-orange-700 rounded-xl shadow-md mt-6">
  <div className="flex items-center justify-between">
    <label className="text-white font-medium text-lg">Change Password</label>
    <input
      type="checkbox"
      checked={showPasswordFileds}
      onClick={viewPasswordSection}
      className="w-5 h-5 cursor-pointer accent-blue-600"
    />
  </div>

  {showPasswordFileds && (
    <div className="flex flex-col gap-4">
      <div className="w-full">
        <label className="block text-gray-300 font-semibold mb-1">Old Password</label>
        <input
          type="password"
          placeholder="Enter your old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="bg-gray-800 w-full text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="w-full">
        <label className="block text-gray-300 font-semibold mb-1">New Password</label>
        <input
          type="password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="bg-gray-800 w-full text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={enableChangePassword}
        className="bg-blue-600 cursor-pointer hover:bg-blue-700 transition-all text-white font-semibold py-2 px-4 rounded-lg"
      >
        Update Password
      </button>
    </div>
  )}
</div>

          {/* Back Link */}
          <Link
            to="/profile"
            className="flex items-center justify-center text-gray-400 hover:text-gray-200 transition-all"
          >
            <AiOutlineBackward className="mr-2" /> Go back to profile
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
}

export default EditProfile
