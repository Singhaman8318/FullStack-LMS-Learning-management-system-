import React, { useEffect } from 'react'
import HomeLayout from '../../Layout/HomeLayout'
import {Chart as Chartjs , ArcElement , Tooltip , Legend , CategoryScale , LinearScale , BarElement , Title ,} from 'chart.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteCourse, getAllCourse } from '../../../Redux/Slices/courseSlice'
import { getStastData } from '../../../Redux/Slices/Statslice'
import { getAllPaymentsRecrod } from '../../../Redux/Slices/RazorpaySlice'
import {Bar, Pie} from 'react-chartjs-2'
import {FaUsers} from 'react-icons/fa'
import {FcSalesPerformance} from 'react-icons/fc'
import {GiMoneyStack} from 'react-icons/gi'
import { BsCollectionPlayFill, BsTrash } from 'react-icons/bs'
import Swal from 'sweetalert2'
 // chart js object
Chartjs.register(ArcElement,Tooltip , Legend ,CategoryScale , LinearScale , BarElement ,Title)

function AdminDashboard() {

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const {alluserCount , subscribeCount}=useSelector((state)=>state.stat);

    const {allPayments , finalMonths ,monthlySalesRecord}=useSelector((state)=>state.razorpay);

    console.log("All payments in", allPayments);
    
    console.log("Monthly sales record", monthlySalesRecord);
    
  console.log("Final months in admin dashboard ", finalMonths);
  
     // how to show the chart preaper it  

       const userData={
         labels:["Regisred user" ,"Enrooled user "] ,
         fontColor:"white",
         datasets:[
            {
                label:"User Details",
                data:[alluserCount,subscribeCount],
                borderWidth:1,
                borderColor:["black" ,"black"],
                backgroundColor:["yellow" , "green"]
            }
         ]
       }

     const salesData={
         labels:["jan" , "feb" ,"mar" ,"Apr" , "May" , "Jun" ,"Jul" , "Aug" ,"Sep" , "Oct" ,"Nov" ,"Dec"],
         fontColor:"white",
         datasets:[
            {
                label:"Sales / Month",
                data:monthlySalesRecord,
                backgroundColor: ["rgb(255,99,132)"],
                borderColor:["White"],
                borderWidth:2
            }
         ]
     }


      const myCourse=useSelector((state)=>state?.courses?.courseData) ; 

console.log("Mycourse data  in ADMIn Dashboard", myCourse);

         async function onCourseDelete(id){
                // if (window.confirm("Are  You want to delte the course ")) {
                //    const   res=    await dispatch(deleteCourse(id));
                //     if (res?.payload?.success) {
                //           await dispatch(getAllCourse());
                //     }
                // }

                const icon=await Swal.fire({
                    title:"Are you sure ?",
                    text:"You wont able to revert this",
                    icon:"warning",
                    showCancelButton:true,
                    confirmButtonColor: "#d33",
                     cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete it!",
                
                })
                  if (icon.isConfirmed) {
                    const res=  await dispatch(deleteCourse(id))
                      if (res?.payload?.success) {
                         await dispatch(getAllCourse())
                      }
                  }
         }
    useEffect(()=>{
            (
                async()=>{
                    await dispatch(getAllCourse())
                    await dispatch(getStastData())
                    await dispatch(getAllPaymentsRecrod())
                }
            )
            ()
    },[])



return (
    <HomeLayout>
        <div className='min-h-screen p-8 bg-gray-900 text-white'>
        <h1 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400 drop-shadow-lg ">
  Admin Dashboard
</h1>
  
            <div className='grid md:grid-cols-2 gap-8 mt-5'>
                {/* User Stats & Chart */}
                <div className='bg-gray-800 p-6 rounded-xl shadow-lg'>
                    <Pie data={userData} />
                    <div className='grid grid-cols-2 gap-6 mt-6'>
                        <div className='bg-gray-700 p-4 rounded-lg text-center shadow-md'>
                            <FaUsers className='text-yellow-500 text-5xl mx-auto' />
                            <p className='font-semibold mt-2'>Registered Users</p>
                            <h3 className='text-2xl font-bold'>{alluserCount}</h3>
                        </div>
                        <div className='bg-gray-700 p-4 rounded-lg text-center shadow-md'>
                            <FaUsers className='text-green-500 text-5xl mx-auto' />
                            <p className='font-semibold mt-2'>Subscribed Users</p>
                            <h3 className='text-2xl font-bold'>{subscribeCount}</h3>
                        </div>
                    </div>
                </div>

                {/* Sales Chart & Revenue */}
                <div className='bg-gray-800 p-6 rounded-xl shadow-lg'>
                    <Bar data={salesData} />
                    <div className='grid grid-cols-2 gap-6 mt-6'>
                        <div className='bg-gray-700 p-4 rounded-lg text-center shadow-md'>
                            <FcSalesPerformance className='text-green-500 text-5xl mx-auto' />
                            <p className='font-semibold mt-2'>Subscription count</p>
                            <h3 className='text-2xl font-bold text-orange-400'>{allPayments?.count}</h3>
                        </div>
                        <div className='bg-gray-700 p-4 rounded-lg text-center shadow-md'>
                            <GiMoneyStack className='text-green-500 text-5xl mx-auto' />
                            <p className='font-semibold mt-2'>Total Revenue</p>
                            <h3 className='text-2xl font-bold text-orange-400'>₹{allPayments?.count * 499}</h3>
                        </div>

                        <div className='bg-gray-700 p-4 rounded-lg text-center shadow-md'>
                            <FaUsers className='text-yellow-500 text-5xl mx-auto' />
                            <p className='font-semibold mt-2'> Last Month Registerd User   </p>
                            <h3 className='text-2xl font-bold text-orange-400'>{finalMonths?.March}</h3>
                        </div>

                        <div className='bg-gray-700 p-4 rounded-lg text-center shadow-md'>
                            <GiMoneyStack className='text-green-500 text-5xl mx-auto' />
                            <p className='font-semibold mt-2'> Last Month Revenue    </p>
                            
                            <h3 className='text-2xl font-bold text-orange-400'>₹{subscribeCount *499}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Overview */}
            <div className='mt-12 bg-gray-800 p-6 rounded-xl shadow-lg'>
                <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-2xl font-bold'>Course Overview</h2>
                    <button 
                        className='btn btn-success'
                        onClick={() => navigate('/courses/create')}
                    >
                         Create New Course
                    </button>
                </div>
                <div className='overflow-x-auto'>
                    <table className='table w-full text-center bg-gray-900 rounded-lg'>
                        <thead>
                            <tr className='bg-gray-700 text-white'>
                                <th>#</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Instructor</th>
                                <th>Lectures</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myCourse?.map((course, idx) => (
                                <tr key={course._id} className='hover:bg-gray-700'>
                                    <td>{idx + 1}</td>
                                    <td>{course.title}</td>
                                    <td>{course.category}</td>
                                    <td>{course.createdBy}</td>
                                    <td>{course.numberOfLectures}</td>
                                    <td>
                                        <textarea
                                            className='w-full p-1 bg-gray-900 border border-gray-500 rounded-md'
                                            rows='1'
                                            value={course.description}
                                            readOnly
                                        />
                                    </td>
                                    <td className='flex justify-center gap-2'>
                                        <button className='btn btn-primary' onClick={() => navigate('/course/displayLecture')}>
                                            <BsCollectionPlayFill />
                                        </button>
                                        <button className='btn btn-error' onClick={() => onCourseDelete(course._id)}>
                                            <BsTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </HomeLayout>
);



}

export default AdminDashboard
 