import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../style/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

 
  const handleHomeClick = () => {
    if (!isLoggedIn) {
      alert("Please login first 🔒");
      navigate("/login");
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="navbar">

      <h2 className="logo">Student Task List</h2>


      <div className="nav-links">
        <span onClick={handleHomeClick}>Home</span>

        {!isLoggedIn && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>

 
      <div className="nav-right">
        {isLoggedIn && user && (
          <>
            <span className="username">👤 {user.username}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>

    </nav>
  );
}

export default Navbar;