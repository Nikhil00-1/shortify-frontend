import React, { useState, useEffect } from "react";
import "./UserProfile1.css";
const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const UserProfile1 = () => {
  const [prof, setProf] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await fetch(`${backendURL}/shortify/profile`, {
          method: "GET",
          credentials: "include",
        });
        const user = await data.json();
        setProf(user);
      } catch (err) {
        console.log(err);
      }
    };
    getProfile();
  }, []);

  if (!prof) {
    return (
      <div className="profile-loading">
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          <span className="avatar-text">
            {prof.name ? prof.name[0].toUpperCase() : "U"}
          </span>
        </div>

        <h2 className="profile-name">{prof.name}</h2>
        <p className="profile-email">{prof.email}</p>

        <div className="profile-divider"></div>

      </div>
    </div>
  );
};

export default UserProfile1;
