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

      <Link to="/" className="home-btn">
          <h1>AF Guide</h1>
      </Link>
        
      <div className="links">
        {user && <Link to="/dbEditor" className="link-btn">Add Data</Link>}
        <Link to="/searchequipment" className="link-btn">Equipment</Link>
        <Link to="/searchgym" className="link-btn">Gyms</Link>
        {user?.displayName ? (
          <div className="user-account">
            <p>Welcome, {user?.displayName}</p>
            <button onClick={handleSignOut} className="logout-btn">Logout</button>
          </div>
          
        ) : (
          <Link to="loginPage" className="login-btn">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
