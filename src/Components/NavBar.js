import React, { useState, useEffect, useRef } from "react";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for hamburger menu

const NavBar = () => {
  const { user, logOut } = UserAuth();
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu toggle
  const menuRef = useRef(null); // Ref for the menu element
  const [overlayOpen, setOverlayOpen] = useState(false); // State to manage overlay toggle

  useEffect(() => {
    // Function to close menu when clicked outside
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    // Add event listener to detect clicks outside of the menu
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setOverlayOpen(!overlayOpen); // Toggle overlay state
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setOverlayOpen(false); // Close overlay when menu is closed
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="home-btn" onClick={scrollToTop}>
        <h1>AF Guide</h1>
      </Link>

      <div className={`links ${menuOpen ? "active" : ""}`} ref={menuRef}>
        {user && (
          <Link to="/dbEditor" className="link-btn" onClick={() => { closeMenu(); scrollToTop(); }}>
            Add Data
          </Link>
        )}
        <Link to="/searchequipment" className="link-btn" onClick={() => { closeMenu(); scrollToTop(); }}>
          Equipment
        </Link>
        <Link to="/searchgym" className="link-btn" onClick={() => { closeMenu(); scrollToTop(); }}>
          Gyms
        </Link>
        {user?.displayName ? (
          <div className="user-account-container">
          <div className="user-account">
            <p>Welcome, {user?.displayName}</p>
          </div>
          <button onClick={handleSignOut} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <Link to="loginPage" className="login-btn" onClick={() => { closeMenu(); scrollToTop(); }}>
            Login
          </Link>
        )}
      </div>

      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default NavBar;
