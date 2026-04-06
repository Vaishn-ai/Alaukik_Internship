import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import "./style.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});


  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: false })
      .required()
      .messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email format"
      }),

    password: Joi.string()
      .min(6)
      .pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
      .required()
      .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters",
        "string.pattern.base":
          "Password must include at least 1 uppercase letter and 1 special character"
      })
  });


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const validate = () => {
    const { error } = schema.validate(form, { abortEarly: false });

    if (!error) return null;

    const newErrors = {};
    error.details.forEach((err) => {
      newErrors[err.path[0]] = err.message;
    });

    return newErrors;
  };

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (!validationErrors) {
      alert("Login Successful ✅");
      navigate("/");
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
            />
            {errors.password && (
              <p className="error">{errors.password}</p>
            )}
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