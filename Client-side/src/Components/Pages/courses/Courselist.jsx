import React, { useEffect } from 'react'
import { getAllCourse } from '../../../Redux/Slices/courseSlice';
import { useSelector,useDispatch } from 'react-redux';
import HomeLayout from '../../Layout/HomeLayout'
import CourseCard from '../../courseCard/CourseCard';
function Courselist() {

    const dispatch=useDispatch();
    const {courseData=[]}=useSelector((state)=>state?.courses);
      console.log(" whole data",courseData);
      
//  const courseData=[];
            async function loadCourse() {
                 await dispatch(getAllCourse());
            }

    useEffect(()=>{
        loadCourse();
    },[])
  return (
    <HomeLayout>
        <div className='min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white'>

            <h1 className='text-center text-3xl font-semibold mb-5'>
                Explore the courses made by  
                   <span className='font-bold text-yellow-500'>
                    Industry Experts 
                </span>
                </h1>
                   <div className='mb-10 flex flex-wrap gap-14'>
                    {courseData?.map((element)=>(
                        <CourseCard key={element._id} data={element}/>
                    ))}
                   </div>
          
        </div>
    </HomeLayout>
  )
}

export default Courselist
