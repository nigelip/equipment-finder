import React, { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { GoogleButton } from "react-google-button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      setTimeout(() => {
        navigate("/dbEditor");
      }, 2000);
    }
  }, [user]);

  return (
    <div className="login-container">
      <h1>
        This feature is only available to <u>authorised</u> users.
      </h1>
      <GoogleButton onClick={handleGoogleSignIn} />
    </div>
  );
};

export default Login;
