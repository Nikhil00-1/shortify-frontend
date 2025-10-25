import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./Navbar.css";
const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const Navbar = ({checkLogin,setLogin}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  // const [checkLogin, setLogin] = useState();
  const navigate = useNavigate();
  const profileRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  // useEffect(() => {
  //   const validateLogin = async () => {
  //     try {
  //       const res = await fetch("http://localhost:3000/user/logStatus", {
  //         method: "GET",
  //         credentials: "include",
  //       });
  //       const data = await res.json();

  //       if (data.logedIn) {
  //         setLogin(true);
  //       } else {
  //         setLogin(false);
  //       }
  //     } catch (err) {
  //       console.error("Error checking login status:", err);
  //     }
  //   };

  //   validateLogin();
  // }, []);
  console.log(checkLogin);
  // Logout function
  const handleLogout = async () => {
    try {
      const res = await fetch(`${backendURL}/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.flag === 1) {
        setLogin(false);
        navigate("/login");
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="navbar" style={{position:"sticky"}}>
      {/* Left Side: Logo + Links */}
      <div className="nav-left">
        <div className="logo">Shortify</div>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/urlshortner" onClick={() => setMenuOpen(false)}>URL Shortner</Link>
          </li>
          <li>
            <Link to="/qrgenerator" onClick={() => setMenuOpen(false)}>QR Generator</Link>
          </li>
          <li>
            <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
          </li>
        </ul>
      </div>

      {/* Right Side: Profile or Login */}
      <div className="nav-right">
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </div>

        {checkLogin ? (
          <div className="profile" ref={profileRef}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="User"
              onClick={() => setProfileOpen(!profileOpen)}
            />
            {profileOpen && (
              <div className="dropdown">
                <button onClick={() => navigate("/profile")}>Profile</button>
                <button onClick={() => navigate("/pastLinks")}>My Short Links</button>
                <button onClick={() => navigate("/pastQrs")}>My QR Codes</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button className="nav-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
