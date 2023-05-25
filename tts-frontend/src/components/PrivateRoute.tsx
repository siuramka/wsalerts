import React, { useContext } from 'react'
import { AuthContext } from "../context/AuthContext";
import { Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    const { authenticated } = useContext(AuthContext)
  
    if(!authenticated) return <Navigate to='/login' replace />
  
    return <div>YEP</div>
  }

export default PrivateRoutes;