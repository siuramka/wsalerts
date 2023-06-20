import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardLayout from "./layouts/DashboardLayout";
import { Box } from "@mui/material";
import Loader from "./Loader";
import AlertNotification from "./AlertNotification";

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;

  return (
    <>
      <AlertNotification/>
      <Loader />
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
