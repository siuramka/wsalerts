import { CssBaseline, Switch, ThemeProvider, createTheme } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link, Route, Router, Routes, useNavigate } from "react-router-dom";
import Callback from "./Callback";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import PrivateRoutes from "./components/PrivateRoute";
import Login from "./pages/Login";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {/* <div>
          <Button onClick={() => handleLogin()} variant="contained">
            Authenticate
          </Button>
        </div> */}
        <Routes>
          <Route path="/callback" element={<Callback />}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<>Authorized!</>} />
          </Route>
        </Routes>
    </ThemeProvider>
  );
}

export default App;
