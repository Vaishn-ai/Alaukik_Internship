import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Register() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>

        <div className="input-group">
          <label>Full Name</label>
          <input type="text" placeholder="Enter your name" />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Enter password" />
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm password" />
        </div>

        <button onClick={handleRegister}>Register</button>

        <p className="switch-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/Login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;