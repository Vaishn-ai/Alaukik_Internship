import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = () => {
    const { username, email, password } = form;

    if (!username || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const userData = {
      username,
      email,
      password
    };

    localStorage.setItem("user", JSON.stringify(userData));

    alert("Registration Successful ✅");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>

        <input type="text" name="username" placeholder="Enter Username" onChange={handleChange} />
        <input type="email" name="email" placeholder="Enter Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Enter Password" onChange={handleChange} />

        <button onClick={handleRegister}>Register</button>

        <p onClick={() => navigate("/login")}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

export default Register;