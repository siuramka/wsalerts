import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";

const Callback = () => {
  const [searchParams] = useSearchParams();
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const code = searchParams.get("code");

  if (code == null) {
    return <Navigate to="/" replace />;
  }
  
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`api/accounts/authenticate?code=` + code);
      if (data) {
        setAuthenticated(true);
      }
    };

    if (code) {
      getData();
    }
  }, [code]);

  if (authenticated == true) {
    return <Navigate to="/" replace />;
  }

  return null; // Return null or any other content you want to render while waiting for the authentication process.
};

export default Callback;