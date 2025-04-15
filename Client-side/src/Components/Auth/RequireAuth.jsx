import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

function RequireAuth({findRoles}) {

  const { isLoggedIn, role } = useSelector((state) => state.auth);    
  console.log("role ", role);

  console.log("is looed in " , isLoggedIn);
  
  
  return  isLoggedIn && findRoles.find((myRole)=> myRole === role) ?(
    <Outlet/>
  )
:   isLoggedIn ?(<Navigate to="/denied"/> )   : (<Navigate  to="/login"/> )
  
}

export default RequireAuth
