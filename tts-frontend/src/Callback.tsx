import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext, User } from "./context/AuthContext";

const Callback = () => {
  const [searchParams] = useSearchParams();
  const { user, setUserHandler } = useContext(AuthContext);
  const code = searchParams.get("code");

  if (code == null) {
    return <Navigate to="/" replace />;
  }
  
  useEffect(() => {
    const getData = async () => {
      //change to post with body
      const { data } = await axios.post<User>(`api/accounts/authenticate`, {code: code});
      if (data) {
        setUserHandler(data);
      }
    };

    if (code) {
      getData();
    }
  }, [code]);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return null;
};

export default Callback;