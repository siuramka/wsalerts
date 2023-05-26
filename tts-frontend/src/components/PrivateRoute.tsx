import React, { useContext } from 'react'
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
    const { user } = useContext(AuthContext)
    
    if(!user) return <Navigate to='/login' replace />
  
    return <Outlet />
  }

export default PrivateRoutes;