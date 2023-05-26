import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext, User } from "./context/AuthContext";
import { DiscordAuthenticateRequest } from "./types/DiscordAuthenticateRequest";

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
      const request: DiscordAuthenticateRequest = {
        code,
      };
      const { data } = await axios.post<User>(
        `api/accounts/authenticate`,
        request
      );
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
