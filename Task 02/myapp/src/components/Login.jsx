import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Login({ switchToRegister }) {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); 
    navigate("/"); 
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter password" required />
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="switch-link">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;