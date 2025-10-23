import React from "react";
import { Link } from "react-router-dom";
import "./Trial.css";


const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <form className="auth-form">
          <input
            type="email"
            placeholder="Email Address"
            className="auth-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            required
          />
          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <p className="redirect-text">
          Don’t have an account?{" "}
          <Link to="/signup" className="redirect-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
