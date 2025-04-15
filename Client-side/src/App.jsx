
import { Routes } from 'react-router-dom'
import './App.css'
import { Route } from 'react-router-dom'
import React from 'react';

import HomePage from './Components/Pages/HomePage'
import AboutUs from './Components/Pages/AboutUs';
import NotFound from './Components/Pages/NotFound';
import Signup from './Components/Pages/Signup';
import Login from './Components/Pages/Login';
import Courselist from './Components/Pages/courses/Courselist';
import Contact from './Components/Pages/Contact';
import { MantineProvider } from '@mantine/core';
import Deined from './Components/Pages/Denied';
import CourseDescription from './Components/Pages/courses/CourseDescription';
import RequireAuth from './Components/Auth/RequireAuth';
import CreateCourse from './Components/Pages/courses/CreateCourse';
import Profile from './Components/Pages/User/Profile';
import EditProfile from './Components/Pages/User/EditProfile';
import Checkout from './Components/Pages/Payment/Checkout';
import CheckoutSuccess from './Components/Pages/Payment/CheckoutSuccess';
import CheckoutFail from './Components/Pages/Payment/CheckoutFail';
import DisplayLecture from './Components/Pages/Dashboard/DisplayLecture';
import AddLecture from './Components/Pages/Dashboard/AddLecture';
import AdminDashboard from './Components/Pages/Dashboard/AdminDashboard';
import ChangePassword from './Components/Pages/User/ChangePassword';

// Polyfill Buffer globally for React

function App() {
    
  return (
<MantineProvider withGlobalStyles withNormalizeCSS> 
    <Routes>
       <Route path="/" element={<HomePage/>} />
       <Route path='/about-us' element={<AboutUs/>}></Route>
       <Route path='/signup' element={<Signup/>}></Route>
       <Route path='/courses' element={< Courselist/>}/>
       <Route path='/contact-us' element={<Contact/>}/>
      <Route path='/denied' element={<Deined/>} />
      <Route path='/course/description' element={<CourseDescription/>} />
   

   {/* // protected route    only for ADMIN    */}
       <Route  element={<RequireAuth findRoles={['ADMIN']}/>} >
          <Route path='/courses/create' element={<CreateCourse/>}/>
          <Route   path='/course/addlecture'  element={<AddLecture/>} />
         <Route   path='//admin/dashboard'  element={<AdminDashboard/>}  />
       </Route>

  // profile protected route 
    <Route  element={<RequireAuth findRoles={["ADMIN" ,"USER"]}/>}>
        <Route path='/profile'  element={<Profile/>}/>
        <Route  path='/edit-profile'  element={<EditProfile/>}/>
        <Route  path='/checkout'  element={<Checkout/>} />
        <Route  path='/checkout/success'  element={<CheckoutSuccess/>} />
        <Route  path='/checkout/fail'  element={<CheckoutFail/>} />
        <Route  path='/course/displaylecture'  element={<DisplayLecture/>}/>
        <Route  path='/edit-profile/changepassword' element={ChangePassword}/>

    </Route>



       <Route path='/login' element={<Login/>}></Route>
       <Route  path='*'  element={<NotFound/>}></Route>
    </Routes>
</MantineProvider>
  )
}

export default App
