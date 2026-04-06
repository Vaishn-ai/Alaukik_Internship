import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import "./style.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  // Joi Validation Schema
  const schema = Joi.object({
    name: Joi.string().min(3).required().messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters"
    }),

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
      }),

    confirmPassword: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Passwords must match",
        "any.required": "Confirm password is required"
      })
  });

  // Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validate Form
  const validate = () => {
    const { error } = schema.validate(form, { abortEarly: false });

    if (!error) return null;

    const newErrors = {};
    error.details.forEach((err) => {
      newErrors[err.path[0]] = err.message;
    });

    return newErrors;
  };

  // Handle Register
  const handleRegister = () => {
    const validationErrors = validate();

    if (!validationErrors) {
      alert("Registration Successful ✅");
      setErrors({});
      navigate("/");
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>

        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

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
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
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