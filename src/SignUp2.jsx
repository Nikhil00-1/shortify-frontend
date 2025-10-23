import React from "react";
import { Link } from "react-router-dom";
import "./LogIn2.css";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";


const Signup = () => {
    const navigate = useNavigate();
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [message, setMessage] = useState("");
    const [isError, setError] = useState(Boolean,false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${backendURL}/user/signup`, {
                method: "POST",
                headers: { "content-Type": "application/json", },
                credentials: "include",
                body: JSON.stringify({ name: name, email: email, password: password })
            });
            const data = await response.json()
            setMessage(data.message)
            if (data.flag === 1) {
                setError(false)
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }else{
                setError(true)
            }

        }
        catch (err) {
            setError("True")
            setMessage("Something went wrong. Try again!");
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Sign Up</h2>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        placeholder="Full Name"
                        className="auth-input"
                        required
                        onChange={(e) => { setname(e.target.value) }}
                    />
                    <input
                        type="email"
                        value={email}
                        placeholder="Email Address"
                        className="auth-input"
                        required
                        onChange={(e) => { setemail(e.target.value) }}
                    />
                    <input
                        type="password"
                        value={password}
                        placeholder="Create Password"
                        className="auth-input"
                        required
                        onChange={(e) => { setpassword(e.target.value) }}
                    />
                    <button type="submit" className="auth-btn">
                        Sign Up
                    </button>
                </form>

                <p className="redirect-text">
                    Already have an account?{" "}
                    <Link to="/login" className="redirect-link">
                        Login
                    </Link>
                </p>
                {message && (
                    <p className={`response-msg ${isError ? "error" : "success"}`}>
                        {message}
                    </p>
                )}

            </div>
        </div>
    );
};

export default Signup;
