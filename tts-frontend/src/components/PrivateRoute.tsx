import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardLayout from "./layouts/DashboardLayout";
import { Box, Grid } from "@mui/material";

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </Box>
    </>
  );
};

export default PrivateRoute;
