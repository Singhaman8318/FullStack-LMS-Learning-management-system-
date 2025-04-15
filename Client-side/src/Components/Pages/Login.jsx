// import React, { useState } from 'react'
// import HomeLayout from '../Layout/HomeLayout';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import {login} from '../../Redux/Slices/authSlice'
// import loginImg from '../../Assets/Images/main.png' 
// function Login() {

//   const dispatch=useDispatch();
//   const navigate=useNavigate();
//     const[loginData,setLoginData]=useState({
//         email:"",
//         password:""
//     });
   
//      const handleuserInput=(e)=>{
//         const {name,value}=e.target;
//         setLoginData({
//           ...loginData,
//           [name]:value  
          
//         })
//      }
//         const handleLogin=async(e)=>{
//            e.preventDefault();
//            // do both using form data or direct object of loginData
//           //  const formData=new FormData();
//           //  formData.append("email", loginData.email);
//           //  formData.append("password", loginData.password); 
           
//            // now disptch the action 
//            const response= await dispatch(login(loginData));
//            if (response?.payload?.success) {
//             navigate('/') ; // home  page 
//            }
//         }

//   return (
//     <HomeLayout >
//           <div className=' flex items-center  justify-center h-[90vh] w-full '>

//                <form onSubmit={handleLogin} noValidate className='flex flex-col justify-center
//                 gap-3 rounded-2xl p-4 text-white w-96 shadow-[0_0_40px_black]' >
//                     <h2 className='text-center text-2xl font-bold'>Login</h2>
              
                
//                      <div className='flex flex-col gap-1'>
//                         <label htmlFor='email' className='font-semibold'> Email</label>
//                         <input type="email"
//                          required 
//                          name='email'
//                          id='email'
//                          placeholder='enter your email'
//                          className='bg-transparent px-2 py-1 border rounded-2xl text-white'
//                          onChange={handleuserInput}
//                          value={loginData.email}
//                          />
//                      </div>

//                      <div className='flex flex-col gap-1'>
//                         <label htmlFor='password' className='font-semibold'>Password</label>
//                         <input type="password"
//                          required 
//                          name='password'
//                          id='password'
//                          placeholder='enter your password ...'
//                          className='bg-transparent px-2 py-1 border rounded-2xl text-white'
//                          onChange={handleuserInput}
//                          value={loginData.password}
//                          />
//                      </div>
//                       <button  type='submit'
//                        className='w-full mt-1 bg-green-600 p-2 py-2 font-semibold  text-large rounded-3xl hover:bg-green-700 transition-all ease-in-out duration-300 cursor-pointer'>
//                        Login
//                       </button>

//                       <p className='text-center'>Dont have any account ? <Link to='/signup' className='text-accent cursor-pointer'>signup</Link></p>
//                </form>
//           </div>
//     </HomeLayout>
//   )


 
//   // return (
//   //   <HomeLayout>
//   //   {/* Background Image */}
//   //   <div
//   //     className="relative flex items-center justify-center min-h-screen bg-gray-900 px-6"
//   //   >
//   //     {/* Full-Screen Background Image */}
//   //     <div
//   //       className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
//   //       style={{ backgroundImage: `url(${loginImg})` }}
//   //     ></div>

//   //     {/* Centered Login Form */}
//   //     <div className="relative z-10 w-full max-w-md mx-auto">
//   //       <div className="bg-white/10 backdrop-blur-lg shadow-lg p-8 rounded-2xl border border-white/20">
//   //         <h2 className="text-center text-3xl font-bold text-white mb-4">
//   //           Welcome Back! 👋
//   //         </h2>

//   //         <form onSubmit={handleLogin} className="flex flex-col gap-4">
//   //           {/* Email Input */}
//   //           <div className="form-control">
//   //             <label htmlFor="email" className="label text-white font-medium">
//   //               Email Address
//   //             </label>
//   //             <input
//   //               type="email"
//   //               name="email"
//   //               id="email"
//   //               required
//   //               placeholder="Enter your email"
//   //               className="input input-bordered input-primary w-full bg-gray-800/50 text-white placeholder-gray-400"
//   //               onChange={handleuserInput}
//   //               value={loginData.email}
//   //             />
//   //           </div>

//   //           {/* Password Input */}
//   //           <div className="form-control">
//   //             <label htmlFor="password" className="label text-white font-medium">
//   //               Password
//   //             </label>
//   //             <input
//   //               type="password"
//   //               name="password"
//   //               id="password"
//   //               required
//   //               placeholder="Enter your password"
//   //               className="input input-bordered input-primary w-full bg-gray-800/50 text-white placeholder-gray-400"
//   //               onChange={handleuserInput}
//   //               value={loginData.password}
//   //             />
//   //           </div>

//   //           {/* Login Button */}
//   //           <button
//   //             type="submit"
//   //             className="btn btn-success w-full text-lg font-semibold shadow-md transition-all duration-300 hover:scale-105"
//   //           >
//   //             Login
//   //           </button>

//   //           {/* Sign Up Link */}
//   //           <p className="text-center text-gray-300 mt-2">
//   //             Don't have an account?{" "}
//   //             <Link
//   //               to="/signup"
//   //               className="text-accent font-medium hover:underline"
//   //             >
//   //               Sign Up
//   //             </Link>
//   //           </p>
//   //         </form>
//   //       </div>
//   //     </div>
//   //   </div>
//   // </HomeLayout>
//   // );
// }

// export default Login





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
              className="bg-green-500 hover:bg-green-600 transition-all duration-300 py-2 rounded-full text-white font-semibold shadow-md hover:shadow-lg"
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
