import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardLayout from "./layouts/DashboardLayout";

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;

  return (
    <>
      <Sidebar />
      <DashboardLayout>
         <Outlet />
      </DashboardLayout>
    </>
  );
};

export default PrivateRoute;
