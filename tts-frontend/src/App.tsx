import { CssBaseline, Switch, ThemeProvider, createTheme } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link, Route, Router, Routes, useNavigate } from "react-router-dom";
import Callback from "./Callback";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import PublicRoute from "./components/PublicRoute";
import Dashboard from "./pages/Dashboard";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/callback" element={<Callback />}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
        </Route>
        
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
