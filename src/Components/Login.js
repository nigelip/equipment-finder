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
      navigate("/dbEditor");
    }
  }, [user]);

  return <GoogleButton onClick={handleGoogleSignIn} />;
};

export default Login;
