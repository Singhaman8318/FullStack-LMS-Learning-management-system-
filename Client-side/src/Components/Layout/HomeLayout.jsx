import React from 'react'
import {FiMenu} from 'react-icons/fi'
import {AiFillCloseCircle} from 'react-icons/ai'
import Footer from '../Footer';
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { logoutAccount } from '../../Redux/Slices/authSlice';

function HomeLayout({children}) 
{   

  const dispatch=useDispatch();
  const navigate=useNavigate();

      const role=useSelector((state)=>state?.auth?.role);
      const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
      console.log("is login again " , isLoggedIn);
      console.log("user role is " , role);
      
      
function changeWidth(){
      const drawer_side=document.getElementsByClassName("drawer-side ");
       drawer_side[0].style.width='auto';     
}

      function hideDrawer(){
        const hideDrawer=document.getElementsByClassName("drawer-toggle")
        hideDrawer[0].checked=false;

        // changeWidth();
      }
          // logout method 
          const handleLogout=async(e)=>{
            e.preventDefault();
            const response=await dispatch(logoutAccount());

            if (response?.payload?.success) {
              navigate('/')
            }
          }
      
  return (
    <div className='min-h-[90vh]'>
    {/* Drawer */}
    <div className='drawer absolute left-0 z-50 w-fit'>
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className='cursor-pointer relative'>
          <FiMenu
            className="font-bold text-white m-4"
            size={"32px"}
          />
        </label>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-48 h-[90%] sm:w-80 bg-base-200 text-base-content">
          <li className='w-fit absolute right-2 z-50'>
            <button onClick={hideDrawer}>
              <AiFillCloseCircle size={24} />
            </button>
          </li>
          <li><Link to="/">Home</Link></li>

         {isLoggedIn && role === 'ADMIN' &&(
            <li>
              <Link to="/admin/dashboard">Admin Dashboard </Link>
            </li>   
         )}
         {isLoggedIn && role === 'ADMIN' &&(
            <li>
              <Link to="/courses/create">Create Course </Link>
            </li>   
         )}
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/contact-us">Contact</Link></li>
          {!isLoggedIn && (
                            <li className=" absolute bottom-4 ml-5 w-[40%]">
                                <div className="w-full  flex items-center justify-center flex-row">
                                    <button className='bg-green-400 px-4 py-1 font-semibold rounded-md w-full cursor-pointer'>
                                        <Link to="/login">Login</Link>
                                    </button>
                                    <button className='bg-amber-200 px-4 py-1 font-semibold rounded-md w-full cursor-pointer'>
                                        <Link to="/signup">Signup</Link>
                                    </button>
                                </div>
                            </li>
                        )}

                         {isLoggedIn && (
                            <li className=" absolute bottom-4 ml-5 w-[40%]">
                                <div className="w-full flex items-center justify-center flex-row ">
                                    <button className='bg-green-400 px-4 py-1 font-semibold rounded-md w-full cursor-pointer'>
                                        <Link to="/profile">Profile</Link>
                                    </button>
                                    <button 
                                    onClick={handleLogout}
                                    className='bg-amber-200 px-4 py-1 font-semibold rounded-md w-full cursor-pointer'>
                                        <Link to="/logout">Logout</Link>
                                    </button>
                                </div>
                            </li>
                        )}

        </ul>
      </div>
    </div>

    {children}
    <Footer />
  </div>
  )

  
}

export default HomeLayout



