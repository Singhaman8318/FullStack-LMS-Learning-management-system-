import React, { useEffect } from 'react'
import HomeLayout from '../../Layout/HomeLayout'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getAllLectures } from '../../../Redux/Slices/LectureSlice';
import { AiOutlineUser } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';

function DisplayLecture() {

   const {lecture}=useSelector((state)=>state.lecture);
const {role}=useSelector((state)=>state.auth);
  const {state}=useLocation();
   const navigate=useNavigate();
   const dispatch=useDispatch();

   console.log("lecures ",lecture);
   console.log("role", role);
   
   useEffect(()=>{
     console.log("id",state._id);

     console.log("state " , state);
     
      dispatch(getAllLectures(state._id))
        if (!state) {
          navigate('/course')
        }
   },[])
   return (

    <HomeLayout>
      <div className="flex justify-center items-center w-full h-[90vh]">
        {/* Navbar */}
        <div className="top-0 fixed w-full flex flex-row items-center px-6 py-4 bg-gray-800   shadow-md h-18">
          <ul className="flex w-full items-center justify-between">
            <li className="text-lg font-bold ml-25">
               <img src="" alt="logo"
                />
            </li>
            <li className="text-xl font-semibold"> {state.title}</li>
            <Link to='/profile' className='mr-10 '>
            <li className="text-3xl">
              <AiOutlineUser/>
            </li>
            </Link>
          </ul>
        </div>
        <div className="flex h-screen bg-gray-900 text-white">
  {/* Left Section - Fixed Lecture List (30%) */}
  <div className="w-[30%] bg-gray-800 p-6 border-r border-gray-700 fixed h-screen overflow-y-auto">
    <h2 className="text-xl font-semibold mb-4">Lecture List</h2>
    <ul className="space-y-3">
      <li className="p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-blue-500 transition">Lecture 1</li>
      <li className="p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-blue-500 transition">Lecture 2</li>
      <li className="p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-blue-500 transition">Lecture 3</li>
    </ul>
  </div>

  {/* Right Section - Video Player (70%) */}
  <div className="ml-[30%] w-[70%] flex justify-center items-center bg-gray-900 p-10">
    <div className="w-[90%] h-[80%] bg-black rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
      {/* Video Player */}
      <video 
        src="" 
        controls 
        className="w-full h-full object-cover rounded-lg"
      ></video>
    </div>
  </div>
</div>


      </div>
    </HomeLayout>

   
  
  );
  
}

export default DisplayLecture



// import React, { useEffect, useState } from 'react';
// import HomeLayout from '../../Layout/HomeLayout';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllLectures } from '../../../Redux/Slices/LectureSlice';
// import { AiOutlineUser } from 'react-icons/ai';
// import { deleteCourseLecture } from 'c:/Users/paman/OneDrive/Desktop/LMS/lms-frontend-hn/src/Redux/Slices/LectureSlice';

// function DisplayLecture() {
  
  
//   const role=useSelector((state)=>state.auth)
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

  
//     const[currentVideo,setCurrentVideo]=useState(0);

//     const {lectures}=useSelector((state)=>state?.lecture)

//     console.log(lectures);
    
//     // method to delte the lecture 
//       const onLectureDelete=async(courseId,lectureId)=>{
//          await dispatch(deleteCourseLecture({courseId: courseId, lectureId:lectureId}))
//          await dispatch(getAllLectures(courseId))
         
//       }

      
//   useEffect(() => {

//     dispatch(getAllLectures(state._id))
//     if (!state) {
//       navigate('/course');
//     } 
//   }, [ ]);

//   // return (
//     // <HomeLayout>
//     //   <div className="fixed top-0 w-full flex flex-row items-center px-6 py-4 bg-gray-800 shadow-md h-[70px] z-50">
//     //     <ul className="flex w-full items-center justify-between">
//     //       <li className="text-lg font-bold">
//     //         <img src="" alt="logo" className="h-10" />
//     //       </li>
//     //       <li className="text-xl font-semibold">{state?.title || "Course"}</li>
//     //       <Link to="/profile" className="mr-10">
//     //         <li className="text-3xl">
//     //           <AiOutlineUser />
//     //         </li>
//     //       </Link>
//     //     </ul>
//     //   </div>

//     //   <div className="flex  text-white mt-[70px] min-h-screen pb-[60px]">
//     //     <div className="w-[30%]  p-6 border-r border-gray-700 h-screen fixed overflow-y-auto">
//     //       <h2 className="text-xl font-semibold mb-4 ">Lecture List</h2>
//     //       <ul className="space-y-3">
//     //         {lecture?.map((lec, index) => (
//     //           <li key={index} className="p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-blue-500 transition">
//     //             {lec.title}
//     //           </li>
//     //         ))}
//     //       </ul>
//     //     </div>

//     //     <div className="ml-[30%] w-[70%] flex justify-center items-center p-10 h-[70vh]">
//     //       <div className="w-[100%] h-[100%] bg-black rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
//     //         {/* Video Player */}
//     //         <video 
//     //                         src={lecture && lecture[currentIndex]?.lecture?.secure_url}
//     //                         controls
//     //                         disablePictureInPicture
//     //                         controlsList="nodownload" 
//     //           className="w-full object-filled rounded-lg"
//     //         ></video>
//     //       </div>
//     //     </div>
//     //   </div>

      
//     // </HomeLayout>



//     // <HomeLayout>
//     //   <div className="fixed top-0 w-full flex flex-row items-center px-6 py-4 bg-gray-800 shadow-md h-[70px] z-50">
//     //     <ul className="flex w-full items-center justify-between">
//     //       <li className="text-lg font-bold">
//     //         <img src="" alt="logo" className="h-10" />
//     //       </li>
//     //       <li className="text-xl font-semibold"> <span className='text-xl font-semibold'> Course:</span> {state?.title || "Course"}</li>
//     //       <Link to="/profile" className="mr-10">
//     //         <li className="text-3xl">
//     //           <AiOutlineUser />
//     //         </li>
//     //       </Link>
//     //     </ul>
//     //   </div>

//     //   <div className="flex text-white mt-[70px] min-h-screen pb-[60px]">
//     //     <div className="w-[20%] bg-gray-800 p-6 border-r border-gray-700 h-screen fixed overflow-y-auto">
//     //       <h2 className="text-xl font-semibold mb-4">Lecture List</h2>
//     //       <ul className="space-y-3">
//     //         {lectures?.map((lecture, index) => (
//     //           <li
//     //             key={lecture._id}
//     //             className={`p-4 rounded-lg cursor-pointer transition ${
//     //               currentIndex === index ? "bg-blue-500" : "bg-gray-700 hover:bg-blue-500"
//     //             }`}
//     //             onClick={() => setCurrentIndex(index)}
//     //           >
//     //             {lecture.title}
//     //           </li>
//     //         ))}
//     //          <li>lecure</li>
//     //       </ul>

//     //       {role === "ADMIN" && (
//     //         <button
//     //           onClick={() => navigate("/course/addlecture", { state: { ...state } })}
//     //           className="mt-4 w-full bg-orange-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
//     //         >
//     //           Add New Lecture
//     //         </button>
//     //       )}
//     //     </div>

//     //     <div className="ml-[30%] w-[80%] flex flex-col items-center justify-center p-10 h-[75vh]">
//     //       <div className="w-full h-full bg-black rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
//     //         <video
//     //           src={lectures && lectures[currentIndex]?.lecture?.secure_url}
//     //           controls
//     //           disablePictureInPicture
//     //           controlsList="nodownload"
//     //           className="w-full h-full object-cover rounded-lg"
//     //         ></video>
//     //       </div>

//     //       <div className="mt-4 w-full text-left p-4 bg-gray-800 rounded-lg shadow-md">
//     //         <h1 className="text-yellow-500 font-semibold text-lg">
//     //           {/* Title: {lectures && lectures[currentIndex]?.title} */}
//     //         </h1>
//     //         <p className="mt-2 text-gray-300">
//     //           Description: {lectures && lectures[currentIndex]?.description}
//     //         </p>
//     //       </div>
//     //     </div>
//     //   </div>

//     // </HomeLayout>


//     // return (
//     //   <HomeLayout>
//     //   <div className="fixed top-0 w-full flex items-center px-6 py-3 bg-gray-800 shadow-lg h-[65px] z-50">
//     //     <ul className="flex w-full items-center justify-between">
//     //       <li className="text-lg font-bold flex items-center gap-3">
//     //         <img src="/logo.png" alt="Logo" className="h-10" />
//     //         <span className="text-cyan-400 text-xl font-semibold ml-[20rem]">Course:</span>
//     //         <span className="text-white text-lg">{state?.title || "Course"}</span>
//     //       </li>
//     //       <Link to="/profile" className="mr-10 text-3xl text-cyan-300 hover:text-cyan-400 transition">
//     //         <AiOutlineUser />
//     //       </Link>
//     //     </ul>
//     //   </div>

//     //   <div className="flex bg-gray-900 text-white mt-[65px] min-h-screen pb-[60px]">
//     //     <div className="w-[25%] bg-gray-900 h-screen fixed overflow-y-auto">
//     //       <h2 className="text-lg text-cyan-400 font-semibold mb-4"> Lecture List</h2>
//     //       <ul className="space-y-3">
//     //         {lectures?.map((lecture, index) => (
//     //           <li
//     //             key={lecture._id}
//     //             className={`p-4 rounded-lg cursor-pointer transition-all duration-300 border-l-4 ${
//     //               currentIndex === index
//     //                 ? "bg-cyan-600 border-cyan-300 text-white shadow-md"
//     //                 : "bg-gray-700 hover:bg-cyan-500 hover:border-cyan-400 text-gray-300 hover:text-white"
//     //             }`}
//     //             onClick={() => setCurrentIndex(index)}
//     //           >
//     //           {lecture.title}
//     //           </li>
//     //         ))}
//     //       </ul>

//     //       {role === "ADMIN" && (
//     //         <button
//     //           onClick={() => navigate("/course/addlecture", { state: { ...state } })}
//     //           className="mt-6 w-full bg-cyan-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-cyan-400 transition shadow-md"
//     //         >
//     //            Add New Lecture
//     //         </button>
//     //       )}
//     //     </div>

//     //     <div className="ml-[25%] w-[75%] flex flex-col items-center justify-center p-10 min-h-screen">
//     //       <div className="w-full max-w-[800px] h-[400px] bg-black rounded-lg shadow-lg overflow-hidden flex items-center justify-center relative">
//     //         <video
//     //           src={lectures && lectures[currentIndex]?.lecture?.secure_url}
//     //           controls
//     //           disablePictureInPicture
//     //           controlsList="nodownload"
//     //           className="w-full h-full object-contain rounded-lg overflow-hidden"
//     //         ></video>

//     //         <div className="absolute bottom-0 bg-slate-900/75 w-full p-3 flex justify-between items-center">
//     //           <p className="text-cyan-400 font-semibold">
//     //              {lectures && lectures[currentIndex]?.title}
//     //           </p>

//     //           {/* <span className="text-sm text-gray-300">
//     //             {lectures?.length} Lectures
//     //           </span> */}
//     //         </div>
//     //       </div>

//     //       <div className="mt-4 w-full max-w-[900px] text-left p-4 bg-gray-800 rounded-lg shadow-md">
//     //         <h1 className="text-cyan-300 font-semibold text-lg">
//     //           {lectures && lectures[currentIndex]?.title}
//     //         </h1>
//     //         <p className="mt-2 text-gray-300 text-sm">
//     //           {lectures && lectures[currentIndex]?.description}
//     //         </p>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </HomeLayout>
//     // );



//   //   return (
//   //     <HomeLayout>
//   //         <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-wihte mx-[5%]">
//   //             <div className="text-center text-2xl font-semibold text-yellow-500">
//   //                 Course Name: {state?.title}
//   //             </div>

//   //             {(lectures && lectures.length > 0 ) ?  
//   //                 (<div className="flex justify-center gap-10 w-full">
//   //                 {/* left section for playing videos and displaying course details to admin */}
//   //                <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
//   //                     <video 
//   //                         src={lectures && lectures[currentVideo]?.lecture?.secure_url}
//   //                         className="object-fill rounded-tl-lg rounded-tr-lg w-full"   
//   //                         controls
//   //                         disablePictureInPicture
//   //                         muted
//   //                         controlsList="nodownload"

//   //                     >
//   //                     </video>    
//   //                     <div>
//   //                         <h1>
//   //                             <span className="text-yellow-500"> Title: {" "}
//   //                             </span>
//   //                             {lectures && lectures[currentVideo]?.title}
//   //                         </h1>
//   //                         <p>
//   //                             <span className="text-yellow-500 line-clamp-4">
//   //                                 Description: {" "}
//   //                             </span>
//   //                             {lectures && lectures[currentVideo]?.description}
//   //                         </p>
//   //                     </div>
//   //                </div>

//   //                {/* right section for displaying list of lectres */}
//   //                <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
//   //                     <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
//   //                         <p>Lectures list</p>
//   //                         {role === "ADMIN" && (
//   //                             <button onClick={() => navigate("/course/addlecture", {state: {...state}})} className="btn-primary px-2 py-1 rounded-md font-semibold text-sm">
//   //                                 Add new lecture
//   //                             </button>
//   //                         )}
//   //                     </li> 
//   //                     {lectures && 
//   //                         lectures.map((lecture, idx) => {
//   //                             return (
//   //                                 <li className="space-y-2" key={lecture._id} >
//   //                                     <p className="cursor-pointer" onClick={() => setCurrentVideo(idx)}>
//   //                                         <span>
//   //                                             {" "} Lecture {idx + 1} : {" "}
//   //                                         </span>
//   //                                         {lecture?.title}
//   //                                     </p>
//   //                                     {role === "ADMIN" && (
//   //                                         <button onClick={() => onLectureDelete(state?._id, lecture?._id)} className="btn-accent px-2 py-1 rounded-md font-semibold text-sm">
//   //                                             Delete lecture
//   //                                         </button>
//   //                                     )}
//   //                                 </li>
//   //                             )
//   //                         })    
//   //                     }
//   //                </ul>
//   //             </div>) : (
//   //                 role === "ADMIN" && (
//   //                     <button onClick={() => navigate("/course/addlecture", {state: {...state}})} className="btn-primary px-2 py-1 rounded-md font-semibold text-sm">
//   //                         Add new lecture
//   //                     </button>
//   //                 )
//   //             )}
//   //         </div>
//   //     </HomeLayout>
//   // );



//   return (
//     <HomeLayout>
//       <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
//         <div className="text-center text-2xl font-semibold text-yellow-500">
//           Course Name: {state?.title}
//         </div>

//         {lectures && lectures.length > 0 ? (
//           <div className="flex justify-center gap-10 w-full">
//             {/* Left section - Video Player & Details */}
//             <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
//               <video
//                 src={lectures[currentVideo]?.lecture?.secure_url}
//                 className="object-fill rounded-tl-lg rounded-tr-lg w-full"
//                 controls
//                 disablePictureInPicture
//                 muted
//                 controlsList="nodownload"
//               ></video>
//               <div>
//                 <h1>
//                   <span className="text-yellow-500">Title: </span>
//                   {lectures[currentVideo]?.title}
//                 </h1>
//                 <p>
//                   <span className="text-yellow-500">Description: </span>
//                   {lectures[currentVideo]?.description}
//                 </p>
//               </div>
//             </div>

//             {/* Right section - Lecture List */}
//             <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
//               <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
//                 <p>Lectures List</p>
//                 {role === "ADMIN" && (
//                   <button
//                     onClick={() => navigate("/course/addlecture", { state: { ...state } })}
//                     className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
//                   >
//                     Add New Lecture
//                   </button>
//                 )}
//               </li>
//               {lectures.map((lecture, idx) => (
//                 <li className="space-y-2" key={lecture._id}>
//                   <p className="cursor-pointer" onClick={() => setCurrentVideo(idx)}>
//                     <span>Lecture {idx + 1}:</span> {lecture?.title}
//                   </p>
//                   {role === "ADMIN" && (
//                     <button
//                       onClick={() => onLectureDelete(state?._id, lecture?._id)}
//                       className="btn-accent px-2 py-1 rounded-md font-semibold text-sm"
//                     >
//                       Delete Lecture
//                     </button>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ) : (
//           role === "ADMIN" && (
//             <button
//               onClick={() => navigate("/course/addlecture", { state: { ...state } })}
//               className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
//             >
//               Add New Lecture
//             </button>
//           )
//         )}
//       </div>
//     </HomeLayout>
//   );
// }


// export default DisplayLecture;
