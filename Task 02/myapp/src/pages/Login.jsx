import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Register.css"; 

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const { email, password } = form;


    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }


    const users = JSON.parse(localStorage.getItem("users")) || [];

  
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    // Success
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));

    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">Login</button>
        </form>

        <p onClick={() => navigate("/register")}>
          Don't have an account? Register
        </p>
      </div>
    </div>
  );
}

export default Login;