import React, { useEffect, useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  //   const [value, setValue] = useState("");
  //   const handleClick = () => {
  //     signInWithPopup(auth, provider).then((data) => {
  //       setValue(data.user.email);
  //       localStorage.setItem("email", data.user.email);
  //     });
  //   };
  //   useEffect(() => {
  //     setValue(localStorage.getItem("email"));
  //   });
  //   return (
  //     <div>
  //       <button onClick={handleClick}>Sign In with Google</button>
  //     </div>
  //   );
};

export default Login;
