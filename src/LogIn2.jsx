import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LogIn2.css";
const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const Login = ({setLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendURL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.flag===1) {
        setError(false);
        setMessage(data.message || "Login successful!");
        
        setTimeout(() => {
          navigate("/urlshortner");
          setLogin(true)
        }, 1500);
      } if(data.flag===-1){
        setError(true);
        setMessage(data.message);
        
      }if(data.flag===0){
        setError(true);
        setMessage(data.message);
       
      }
    } catch (err) {
      setError(true);
      setMessage("Something went wrong. Try again!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            placeholder="Email Address"
            className="auth-input"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            className="auth-input"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        {message && (
          <p className={`response-msg ${isError ? "error" : "success"}`}>
            {message}
          </p>
        )}

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
