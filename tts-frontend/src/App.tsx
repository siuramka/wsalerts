import { CssBaseline, Switch, ThemeProvider, createTheme } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import {
  Link,
  Navigate,
  Route,
  Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import Callback from "./Callback";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import PublicRoute from "./components/PublicRoute";
import Voices from "./pages/Voices";
import TtsSettings from "./pages/Settings/TtsSettings";
import NotFound from "./pages/NotFound";

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
        <Route path="*" element={<NotFound />} />
        <Route element={<PublicRoute />}>
          <Route path="/callback" element={<Callback />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Navigate to="/settings/tts" />} />
          {/* <Route path="/voices" element={<Voices />} /> */}
          {/* <Route path="/providers" element={<>providers</>} /> */}
          <Route path="/settings/tts" element={<TtsSettings />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
