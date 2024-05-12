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

  return (
    <div className="login">
      <h1>
        Logging in is only for <u>authorised</u> members who want to add
        equipment into the database
      </h1>
      <p>Rest of the features are available to use</p>
      <GoogleButton onClick={handleGoogleSignIn} />
    </div>
  );
};

export default Login;
