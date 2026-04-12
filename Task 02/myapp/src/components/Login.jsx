import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";;

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: ""});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const { username, password } = form;

    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No user found. Please register first.");
      return;
    }

    if (
      username === storedUser.username &&
      password === storedUser.password
    ) {
      localStorage.setItem("isLoggedIn", "true");

      alert("Login Successful ✅");
      navigate("/");
    } else {
      alert("Invalid Username or Password ❌");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input type="text" name="username" placeholder="Enter Username"  onChange={handleChange}/>

          <input type="password" name="password" placeholder="Enter Password" onChange={handleChange} />

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