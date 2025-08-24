


import React, { useState } from 'react';
import HomeLayout from '../Layout/HomeLayout';
import { BsPersonCircle } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { createAccount } from '../../Redux/Slices/authSlice';
import { isValidEmail, isValidpassword } from '../../Helper/rejexValidator';
import { motion } from 'framer-motion';

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState('');
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    avatar: '',
    role:'',
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const getImage = (e) => {
    const uploadImage = e.target.files[0];
    if (uploadImage) {
      setSignupData({ ...signupData, avatar: uploadImage });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.onload = () => setPreviewImage(fileReader.result);
    }
  };

  const createNewAccount = async (e) => {
    e.preventDefault();

    if (!signupData.fullName || !signupData.email || !signupData.password) {
      toast.error('Please fill all the fields.');
      return;
    }

    if (signupData.fullName.length < 5) {
      toast.error('Name should be at least 5 characters.');
      return;
    }

    if (!isValidEmail(signupData.email)) {
      toast.error('Enter a valid email address.');
      return;
    }

    // if (!isValidpassword(signupData.password)) {
    //   toast.error('Password must be at least 8 characters.');
    //   return;
    // }

    const formData = new FormData();
    formData.append('fullName', signupData.fullName);
    formData.append('email', signupData.email);
    formData.append('password', signupData.password);
    formData.append('avatar', signupData.avatar);
    formData.append('role',signupData.role)
    const response = await dispatch(createAccount(formData));
    if (response?.payload?.success) {
      navigate('/login');
    }

    setSignupData({
      fullName: '',
      email: '',
      password: '',
      avatar: '',
      role:'',
    });
    setPreviewImage('');
  };

  return (
    <HomeLayout>
      <div className="relative flex items-center justify-center min-h-screen bg-gray-900 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-3xl shadow-lg p-6"
        >
          <h2 className="text-3xl font-bold text-center mb-5">Create Your Account</h2>

          <form onSubmit={createNewAccount} className="flex flex-col gap-4">
            {/* Image Upload */}
            <label htmlFor="image_uploads" className="cursor-pointer w-fit mx-auto">
              {previewImage ? (
                <img src={previewImage} alt="preview" className="w-24 h-24 rounded-full" />
              ) : (
                <BsPersonCircle className="w-24 h-24 text-white" />
              )}
            </label>
            <input
              type="file"
              name="image_uploads"
              id="image_uploads"
              accept=".jpg, .jpeg, .png"
              className="hidden"
              onChange={getImage}
            />

            {/* Name Input */}
            <div className="flex flex-col gap-1">
              <label htmlFor="fullName" className="text-sm font-semibold">Full Name</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Your full name"
                required
                className="px-3 py-2 bg-white/10 border border-white/30 rounded-xl placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                onChange={handleUserInput}
                value={signupData.fullName}
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm font-semibold">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@email.com"
                required
                className="px-3 py-2 bg-white/10 border border-white/30 rounded-xl placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                onChange={handleUserInput}
                value={signupData.email}
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm font-semibold">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter a strong password"
                required
                className="px-3 py-2 bg-white/10 border border-white/30 rounded-xl placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                onChange={handleUserInput}
                value={signupData.password}
              />
             
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-2 py-2 cursor-pointer bg-green-500 hover:bg-green-600 rounded-full text-white font-semibold transition-all duration-300 shadow-md"
            >
              Create Account
            </button>

            <p className="text-center text-sm text-white mt-2">
              Already have an account?{' '}
              <Link to="/login" className="text-accent hover:underline">Login</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </HomeLayout>
  );
}

export default Signup;

