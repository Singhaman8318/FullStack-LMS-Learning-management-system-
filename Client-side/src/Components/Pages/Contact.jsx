// import React from 'react'
// import HomeLayout from '../Layout/HomeLayout'
// import toast from 'react-hot-toast';
// import { useState } from 'react';
// import { isValidEmail } from '../../Helper/rejexValidator';
// import { redirectDocument } from 'react-router-dom';
// import axiosInstance from '../../Helper/axiosInstance';
// function Contact() {
//     const[userInput,setUserInput]=useState({
//         name:"",
//         email:"",
//         message:"",
//       })
//             function handleInputChange(e){
//               const{name,value}=e.target;
    
//               setUserInput({
//                 ...userInput,
//                 [name]:value
//               })
//             }

//             async function onFormSubmit(e) {
//                 e.preventDefault();
//                 if(!userInput.email || !userInput.name || !userInput.message) {
//                     toast.error("All fields are mandatory");
//                     return;
//                 }
        
//                 if(!isValidEmail(userInput.email)) {
//                     toast.error("Invalid email");
//                     return;
//                 }
        
//                 try {
//                     const response = axiosInstance.post("/user/v1/contact-us", userInput);
//                     toast.promise(response, {
//                         loading: "Submitting your message...",
//                         success: "Form submitted successfully",
//                         error: "Failed to submit the form"
//                     });
//                     const contactResponse = await response;
//                     console.log(contactResponse)
//                     if(contactResponse?.data?.success) {
//                         setUserInput({
//                             name: "",
//                             email: "",
//                             message: "",
//                         });
//                     }
//                 } catch (err) {
//                     toast.error("operation failed....")
//                 }
        
//             }
                    
            
//   return (
   
//     <HomeLayout>
//   <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-900 to-gray-900 px-6">
    
//     {/* Contact Form Card */}
//     <div className="bg-white/10 backdrop-blur-md shadow-lg p-6 rounded-2xl w-full max-w-md border border-white/20">
      
//       {/* Form Title */}
//       <h1 className="text-3xl font-bold text-white text-center mb-5">
//         📩 Contact Us
//       </h1>

//       <form onSubmit={onFormSubmit} noValidate className="flex flex-col gap-4">
        
//         {/* Name Field */}
//         <div>
//           <label htmlFor="name" className="text-lg font-semibold text-white">Name</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             placeholder="Enter your name"
//             className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             onChange={handleInputChange}
//             value={userInput.name}
//           />
//         </div>

//         {/* Email Field */}
//         <div>
//           <label htmlFor="email" className="text-lg font-semibold text-white">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             placeholder="Enter your email"
//             className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             onChange={handleInputChange}
//             value={userInput.email}
//           />
//         </div>

//         {/* Message Field */}
//         <div>
//           <label htmlFor="message" className="text-lg font-semibold text-white">Message</label>
//           <textarea
//             id="message"
//             name="message"
//             placeholder="Write your message..."
//             className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 resize-none h-32 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             onChange={handleInputChange}
//             value={userInput.message}
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full py-3 cursor-pointer rounded-xl bg-yellow-400 text-black font-semibold text-lg shadow-md hover:bg-yellow-500 transition-transform transform hover:scale-105"
//         >
//            Submit
//         </button>
//       </form>
//     </div>
//   </div>
// </HomeLayout>

//   )
// }

// export default Contact




import React, { useState } from 'react';
import HomeLayout from '../Layout/HomeLayout';
import toast from 'react-hot-toast';
import { isValidEmail } from '../../Helper/rejexValidator';
import axiosInstance from '../../Helper/axiosInstance';

function Contact() {
    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: "",
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserInput({ ...userInput, [name]: value });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!userInput.email || !userInput.name || !userInput.message) {
            toast.error("All fields are mandatory");
            return;
        }

        if (!isValidEmail(userInput.email)) {
            toast.error("Invalid email");
            return;
        }

        try {
            const response = axiosInstance.post("/user/v1/contact-us", userInput);
            toast.promise(response, {
                loading: "Submitting your message...",
                success: "Form submitted successfully",
                error: "Failed to submit the form"
            });
            const contactResponse = await response;
            if (contactResponse?.data?.success) {
                setUserInput({ name: "", email: "", message: "" });
            }
        } catch (err) {
            console.log("Error in contact us", err);
            toast.error("Operation failed...");
        }
    }

    return (
        <HomeLayout>
            <div className="min-h-screen bg-base-300 flex items-center justify-center px-4" data-theme="dark">
                <div className="max-w-lg w-full bg-base-200 shadow-xl rounded-lg p-6">
                    <h2 className="text-3xl font-bold text-center text-base-content">Get in Touch</h2>
                    <p className="text-center text-base-content/70 mb-4">We'd love to hear from you!</p>
                    <form onSubmit={onFormSubmit} className="space-y-4">
                        <div className="form-control ">
                            <label className=" label-text text-base-content ">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={userInput.name}
                                onChange={handleInputChange}
                                placeholder="your name"
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label-text text-base-content">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={userInput.email}
                                onChange={handleInputChange}
                                placeholder="user@example.com"
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label-text text-base-content">Your Message</label>
                            <textarea
                                name="message"
                                value={userInput.message}
                                onChange={handleInputChange}
                                placeholder="Write your message here..."
                                className="textarea textarea-bordered w-full h-32"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-full">Send Message</button>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Contact;
