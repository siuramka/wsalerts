import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Callback from "./Callback";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import PublicRoute from "./components/PublicRoute";
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
