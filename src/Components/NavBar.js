import React from "react";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
const NavBar = () => {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="navbar">
        <Link to="/">
        <h1>The AF Guide</h1>
      </Link>
      <div className="links">
        {user && <Link to="/dbEditor">Add equipment</Link>}
        <Link to="/searchequipment">Search Equipment</Link>
        <Link to="/searchgym">Search Gym</Link>
        {user?.displayName ? (
          <button onClick={handleSignOut}>Logout</button>
        ) : (
          <Link to="loginPage">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
