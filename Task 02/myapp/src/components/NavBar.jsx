import React from 'react'
import { Link } from "react-router-dom";
import "./style.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">MyApp</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/Login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
