import React, { useEffect, useState } from 'react'
import HomeLayout from '../../Layout/HomeLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { AiOutlineAim, AiOutlineLeft } from 'react-icons/ai';
import { addLecture } from '../../../Redux/Slices/LectureSlice';

export default function AddLecture() {

    const courseDetails=useLocation().state;
        
    console.log("course details in addLectures", courseDetails._id);
    
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const[userInput,setUserInput]=useState({
        id:courseDetails?._id,
        lecture:undefined,
        title:"",
        description:"",
        videoSrc:""
    });

    function handleInputChange(e){
        const {name,value}=e.target;
          setUserInput({
            ...userInput,
                [name]:value
          })
    }

       function videoHandler(e){
            const video=e.target.files[0];
            const source=window.URL.createObjectURL(video);
            setUserInput({
                ...userInput,
                lecture:video,
                videoSrc:source
            })
       }

       async function onFomrSubmit(e){
            e.preventDefault();
            if (!userInput.description || !userInput.title || !userInput.lecture) {
                toast.error("All fields are mandatory");
                return;
            }
            const response=await dispatch(addLecture(userInput));
             if (response?.payload?.success) {
                navigate(-1 )
                setUserInput({
                    id:courseDetails?._id,
                    lecture:undefined,
                    title:"",
                    description:"",
                    videoSrc:""
                })
             }
       }

          // useEffect(()=>{
          //   navigate('/courses')
          // },[])
  return (
    // <HomeLayout>
    //       <div className='min-h-[90vh] text-white flex flex-col items-center justify-center mx-16 '>
    //             <div className='flex felx-col gap-5 p-2 shadow-[0_0_10px_black] w-26 rounded-3xl'>
    //                 <header className='flex items-center justify-center relative'>
    //                      <button className='absolute  left-2 text-green-500 '><AiOutlineLeft/></button>
    //                     <h1 className='text--xl bg-yellow-500 font-semibold'>Add New Lecture </h1>
    //                 </header>


    //                 <form onSubmit={onFomrSubmit}  
    //                   className='flex flex-col gap-3 '
    //                 >
    //                     <input type="text"
    //                       name='title' 
    //                       placeholder='Enter the title of the lecutre
    //                       '
    //                       onChange={handleInputChange}
    //                        className='bg-transparent px-3 py-1  border'
    //                        value={userInput.title}
    //                        />

    //                 <textarea type="text"
    //                       name='description' 
    //                       placeholder='Enter the title of the lecutre
    //                       '
    //                       onChange={handleInputChange}
    //                        className='bg-transparent px-3 py-1  border overflow-y-scroll  h-36'
    //                        value={userInput.description}
    //                        />
    //                     {userInput.videoSrc ?(
    //                           <video
    //                            src={userInput.videoSrc}
    //                             controls
    //                             controlsList='="nodownload nofullscreen'
    //                             className='object-fill ronded-tl-lg rounded-tr-lg w-full'
    //                            >

    //                           </video>
    //                     ):(
                        
    //                         <div className='h48 borser flex items-center justify-center cursor-pointer'>
    //                             <label htmlFor="lecture" className='font-semibold text-xl cursor-pointer'>Choose your video </label>
    //                             <input type="video"
    //                               id='lecture'
    //                               className='hidden'
    //                                name='lecture'
    //                                onChange={videoHandler}
    //                                accept='' />
    //                         </div>

    //                     )}
    //                     <button type='submit ' className='btn btn-primary py-1 font-semibold text-lg'>Add new Lecture</button>
    //                 </form>
    //             </div>
    //       </div>
    // </HomeLayout>

    <HomeLayout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full max-w-lg bg-gray-800 p-6 shadow-lg rounded-2xl">
        
        {/* Header */}
        <header className="flex items-center justify-between relative mb-4">
          <button className="text-green-500 text-2xl " onClick={()=>navigate(-1)}>
            <AiOutlineLeft />
          </button>
          <h1 className="text-xl font-semibold text-yellow-400">Add New Lecture</h1>
          <div></div> {/* Placeholder for spacing */}
        </header>

        {/* Form */}
        <form onSubmit={onFomrSubmit} className="flex flex-col gap-4">
          
          {/* Title Input */}
          <input
            type="text"
            name="title"
            placeholder="Enter the title of the lecture"
            onChange={handleInputChange}
            className="bg-gray-700 text-white px-4 py-2 border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
            value={userInput.title}
          />

          {/* Description Input */}
          <textarea
            name="description"
            placeholder="Enter the lecture description"
            onChange={handleInputChange}
            className="bg-gray-700 text-white px-4 py-2 border border-gray-600 rounded-lg h-36 resize-none outline-none focus:ring-2 focus:ring-yellow-400"
            value={userInput.description}
          />

          {/* Video Upload Section */}
          {userInput.videoSrc ? (
            <video
              src={userInput.videoSrc}
              controls
              controlsList="nodownload nofullscreen"
              className="w-full rounded-lg"
            />
          ) : (
            <div className="h-48 border border-dashed border-gray-500 flex flex-col items-center justify-center rounded-lg cursor-pointer">
              <label htmlFor="lecture" className="font-semibold text-lg cursor-pointer">
                Choose your video
              </label>
              <input
                type="file"
                id="lecture"
                className="hidden"
                name="lecture"
                onChange={videoHandler}
                accept="video/*"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded-lg text-lg transition"
          >
            Add New Lecture
          </button>

        </form>
      </div>
    </div>
    </HomeLayout>
  )
}
