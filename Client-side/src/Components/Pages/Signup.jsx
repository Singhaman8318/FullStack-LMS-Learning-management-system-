// import React, { useState } from 'react'
// import HomeLayout from '../Layout/HomeLayout'
// import { BsPerson, BsPersonCircle, BsTornado } from 'react-icons/bs';
// import { useDispatch } from 'react-redux';
// import { Navigate, useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import {toast} from 'react-hot-toast'
// import { createAccount } from '../../Redux/Slices/authSlice';
// import { isValidEmail, isValidpassword } from '../../Helper/rejexValidator';
// function Signup() {

//     const dispatch=useDispatch();
//     const naviate=useNavigate();

//     const [previewImage, setPreviewImage]=useState("");
//     const [signupData , setSignupData]=useState({
//         fullName:"",
//         email: "" ,
//         password :"",
//         avatar:""
//     })

//        const handleuserInput=(e)=>{
//         // find the name and value from the event 

//         const {name  ,value}=e.target;
//         setSignupData({
//             ...signupData ,
//             [name]:value
//         })
//        }

//        // for handling the user img 
//        const getImage=(e)=>{
//                 e.preventDefault();
//                 // getting the image 
//                 const uploadImage=e.target.files[0];
            
//                 if (uploadImage) {
//                     setSignupData({
//                         ...signupData,
//                         avatar:uploadImage
//                     });

//                     // now read the file 

//                     const fileReader=new FileReader();
//                     fileReader.readAsDataURL(uploadImage)  ; // set the img in url 
//                     fileReader.addEventListener("load" , function(){
//                         console.log("this ig" , this.result);
                        
//                         setPreviewImage(this.result)
//                     }) 
//                 }
//        }

//        async function createNewAccount(e){
//          e.preventDefault();
//          if( !signupData.fullName || !signupData.email || !signupData.password){
//             toast.error('Please fill all the fileds ');
//             return;
//          }

//          // checking name filed length 
//           if (signupData.fullName.length <5) {
//             toast.error("Name should be atLeast 5 character");
//             return ;
//           }

//           // check email validation 
//            if (!isValidEmail(signupData.email)) {
//              toast.error("Please enter the correct email adress")
//              return
//            }

//           // checking password validation 

//               if (!isValidpassword(signupData.password)) {
//                  toast.error("Plassword atleast 8 character "); 
//                  return 
//               }

//             // create a fomr object to send the data on server  ... we can do with the same js object no such any iusses but here we use the formdata
//             const formData=new FormData();

//             formData.append('fullName', signupData.fullName);
//             formData.append("password", signupData.password);
//             formData.append("email" , signupData.email);
//             formData.append("avatar", signupData.avatar);
     
//             // dipatch the action 
//             // note create account comes from the authsile in this method we pass the form data for backned request 
//             const response=await  dispatch(createAccount(formData)) ; 
//             console.log("response in", response);

            
//              if (response?.payload?.success) {

//                   // if account is created succesfully navigate to the login page 
//             naviate('/login');
//              }
          

//             // now clean the all fileds including name email password avatar 
//                 setSignupData({
//                     fullName:"",
//                     email:"",
//                     password:"",
//                     avatar:"",
//                 });

//                 // images 
//                 setPreviewImage(" ");

//        }
//   return (

// <HomeLayout >
//           <div className=' flex items-center  justify-center h-[90vh] w-full '>

//                <form onSubmit={createNewAccount} noValidate className='flex flex-col justify-center
//                 gap-3 rounded-2xl p-4 text-white w-96 shadow-[0_0_40px_black]' >
//                     <h2 className='text-center text-2xl font-bold'>Registration Page..</h2>
//                     <label htmlFor='image_uploads' className='cursor-pointer'>
//                         {previewImage ? (
//                             <img className='w-24 h-24 rounded-full m-auto' src={previewImage}/>
//                         ) : (
//                             <BsPersonCircle  className='w-24 h-24 rounded-full m-auto'/>
//                         )}
//                     </label>
//                     <input className='hidden' 
//                     onChange={getImage}
//                       name='images_uploads'
//                      type='file' id='image_uploads'
//                      accept='.jpg , .jpeg , .png '
//                     />


//                     <div className='flex flex-col gap-1'>
//                         <label htmlFor='fullName' className='font-semibold'>Name</label>
//                         <input type="fullName"
//                          required 
//                          name='fullName'
//                          id='fullName'
//                          placeholder='enter your Full Name'
//                          className='bg-transparent px-2 py-1 border rounded-2xl text-white'
//                          onChange={handleuserInput}
//                          value={signupData.fullName}
//                          />
//                      </div>
                
//                      <div className='flex flex-col gap-1'>
//                         <label htmlFor='email' className='font-semibold'> Email</label>
//                         <input type="email"
//                          required 
//                          name='email'
//                          id='email'
//                          placeholder='enter your email'
//                          className='bg-transparent px-2 py-1 border rounded-2xl text-white'
//                          onChange={handleuserInput}
//                          value={signupData.email}
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
//                          value={signupData.password}
//                          />
//                      </div>
//                       <button  type='submit'
//                        className='w-full mt-1 bg-green-600 p-2 py-2 font-semibold  text-large rounded-3xl hover:bg-green-700 transition-all ease-in-out duration-300 cursor-pointer'>
//                         Create Account
//                       </button>

//                       <p className='text-center'>Already have an account ? <Link to='/login' className='text-accent cursor-pointer'>Login</Link></p>
//                </form>
//           </div>
//     </HomeLayout>
//   )
// }

// export default Signup


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
    avatar: ''
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

    const response = await dispatch(createAccount(formData));
    if (response?.payload?.success) {
      navigate('/login');
    }

    setSignupData({
      fullName: '',
      email: '',
      password: '',
      avatar: ''
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
              className="mt-2 py-2 bg-green-500 hover:bg-green-600 rounded-full text-white font-semibold transition-all duration-300 shadow-md"
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

