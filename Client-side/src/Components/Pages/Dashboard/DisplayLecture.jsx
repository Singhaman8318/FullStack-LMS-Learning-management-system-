
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLectures, removeLecture } from '../../../Redux/Slices/LectureSlice';
import HomeLayout from '../../Layout/HomeLayout'
import { Link } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import {MdArrowBack} from 'react-icons/md'
import {BsPersonCircle} from 'react-icons/bs'
function DisplayLecture() {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const role = useSelector((state) => state?.auth?.role) || '';
  const[currentIndex,setCurrentIndex]=useState(0)

  console.log("User role in display lecture:", role);
  const lectures = useSelector((state) => state.lecture.lectures || []);
console.log("Lectures from Redux:", lectures);

console.log("lecture id when   remove lcture call in  display lecture " , lectures[currentIndex]?._id);

  useEffect(() => {
    if (state?._id) {
      dispatch(getAllLectures(state._id));
    }
  }, [dispatch, state]);

 
  const handleDeleteLecture=async(courseId,lectureId)=>{
     console.log("course id  when del fun call in dispaly lecture " , courseId);
     console.log("lecture id when   remove lcture call in  display lecture " , lectureId);

    //  await dispatch(removeLecture({courseId:courseId,lectureId:lectureId}))
    await  dispatch(removeLecture(courseId,lectureId))
       await dispatch(getAllLectures(courseId))
     
  }
return (


<HomeLayout>
  <div className="flex flex-col min-h-screen bg-gray-900 text-white">
    
  <header className="sticky top-0 z-50 bg-gray-900 border-b border-white px-4 py-3 shadow-lg">
  <nav className="relative flex items-center justify-center">

    {/* Back Icon - Left */}
    <Link to="/course" className="absolute left-4">
      <MdArrowBack size={24} className="text-white cursor-pointer" />
    </Link>

    {/* Logo - 10rem right of back icon */}
    <div className="absolute left-[10rem]">
      <img src="/logo.png" alt="Logo" className="h-8" />
    </div>

    {/* Course Title - Center */}
    <h1 className="text-base sm:text-lg font-semibold text-white">
      Course: <span className="text-orange-500 underline ml-1">{state?.title || "Untitled"}</span>
    </h1>

    {/* Profile Icon - Right */}
    <Link to="/profile" className="absolute right-4 text-2xl text-gray-300 hover:text-cyan-400 transition">
      <BsPersonCircle className="w-8 h-8" />
    </Link>

  </nav>
</header>




    {/* Main Content */}
    <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-850 border-r border-gray-700 p-4 overflow-y-auto">
        <h2 className="text-lg font-bold text-cyan-400 mb-4">Lectures</h2>
        <ul className="space-y-2">
          {lectures.map((item, index) => (
            <li
              key={item._id}
              className={`relative flex items-center p-3 rounded-md cursor-pointer group transition-all ${
                currentIndex === index
                  ? "bg-orange-600 text-white shadow-md font-bold"
                  : "bg-green-700 hover:bg-orange-700 text-black"
              }`}
            >
              <span className="mr-2 text-sm text-gray-300">{index + 1}.</span>
              <span onClick={() => setCurrentIndex(index)} className="flex-1 truncate">
                {item.title}
              </span>
              {role === "ADMIN" && (
                <button
                  onClick={() =>
                    handleDeleteLecture(state._id, item._id)                   }
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-lg transition-all text-red-500 hover:text-red-600"
                  title="Delete Lecture"
                >
                  <AiOutlineDelete size={18} />
                </button>
              )}
            </li>
          ))}
        </ul>
        {role === "ADMIN" && (
          <button
            onClick={() => navigate("/course/addlecture", { state })}
            className="mt-6 w-full py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition"
          >
            + Add Lecture
          </button>
        )}
      </aside>

      {/* Main Viewer */}
      <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-950">
        <div className="bg-gray-800 rounded-lg shadow-lg mb-6 overflow-hidden">
          {lectures[currentIndex]?.lecture?.secure_url ? (
            <video
              src={lectures[currentIndex].lecture.secure_url}
              controls
              disablePictureInPicture
              controlsList="nodownload"
              className="w-full max-h-[360px] sm:max-h-[400px] object-cover bg-black"
            />
          ) : (
            <div className="flex items-center justify-center h-[200px] sm:h-[400px] bg-gray-700 text-gray-400">
              Video not available
            </div>
          )}
          <div className="px-4 py-3 border-t border-gray-700">
            <h2 className="text-lg font-semibold text-green-500">
              {lectures[currentIndex]?.title || "No Title"}
            </h2>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-5 shadow-md">
          <h3 className="text-lg sm:text-xl font-bold text-orange-500 mb-3">Lecture Description</h3>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            {lectures[currentIndex]?.description || "No description available."}
          </p>
        </div>
      </main>
    </div>
  </div>
</HomeLayout>

);
}  
  export default  DisplayLecture;



