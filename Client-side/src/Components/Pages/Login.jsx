


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/Slices/authSlice';
import HomeLayout from '../Layout/HomeLayout';
import loginImg from '../../Assets/Images/main.png';
import { motion } from 'framer-motion';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await dispatch(login(loginData));
    if (response?.payload?.success) {
      navigate('/');
    }
  };

  return (
    <HomeLayout>
      <div className="relative flex items-center justify-center min-h-screen bg-gray-900">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm"
          style={{ backgroundImage: `url(${loginImg})` }}
        ></div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="relative z-10 w-full max-w-md mx-4 bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Welcome Back 
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Email Field */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-white font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                className="rounded-xl px-3 py-2 bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-accent"
                onChange={handleUserInput}
                value={loginData.email}
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-white font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                className="rounded-xl px-3 py-2 bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-accent"
                onChange={handleUserInput}
                value={loginData.password}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="bg-green-500 cursor-pointer hover:bg-green-600 transition-all duration-300 py-2 rounded-full text-white font-semibold shadow-md hover:shadow-lg"
            >
              Login
            </button>

            {/* Signup Link */}
            <p className="text-center text-white mt-2">
              Don’t have an account?{' '}
              <Link to="/signup" className="text-accent font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </HomeLayout>
  );
}

export default Login;
