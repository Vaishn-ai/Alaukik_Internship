import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setErrors({});
  };

  const isStrongPassword = (password) => {
    const regex = /^(?=.*[!@#$%^&*])(?=.*[A-Za-z]).{8,}$/;
    return regex.test(password);
  };

  const validate = () => {
    let newErrors = {};

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (!isStrongPassword(form.password)) {
      newErrors.password =
        "Password must be 8+ chars with a special character";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm password required";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleRegister = () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (user) => user.email === form.email
    );

    if (existingUser) {
      alert("Email already exists. Please login.");
      navigate("/login");
      return;
    }

    const newUser = {
      username: form.username,
      email: form.email,
      password: form.password
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful ✅");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        {errors.username && <p className="error">{errors.username}</p>}

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}

        <button onClick={handleRegister}>Register</button>

        <p onClick={() => navigate("/login")}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

export default Register;