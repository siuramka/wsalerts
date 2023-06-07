import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { LoaderContextProvider } from "./context/LoaderContext.tsx";
import { NotificationContextProvider } from "./context/NotificationContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <NotificationContextProvider>
      <AuthContextProvider>
        <LoaderContextProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </LoaderContextProvider>
      </AuthContextProvider>
    </NotificationContextProvider>
  </BrowserRouter>
);
