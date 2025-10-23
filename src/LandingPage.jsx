import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleurl = () => {
    navigate("/urlshortner")
  }
  const handleqr = () => {
    navigate("/qrgenerator")
  }
  return (
    <div className="landing-container">

      

      <section className="hero">
        <div className="hero-content centered">
          <h1>Shorten Links & Generate Smart QR Codes</h1>
          <p>
            Transform long, messy URLs into sleek short links and QR codes —
            effortless sharing with style and precision.
          </p>
          <h4>
            Get Started With <span className="arrow">→</span>
          </h4>
          <div className="button-group">
            <button
              onClick={handleurl}
              className="get-started-btn"
              style={{ marginRight: "15px" }}
            >
              URL Shortener
            </button>
            <button onClick={handleqr} className="get-started-btn">
              QR Code Generator
            </button>
          </div>

        </div>
      </section>


      <section className="features-section">
        <h2>Why Choose Shortify?</h2>
        <p>Modern, reliable, and made for creators, marketers, and developers.</p>

        <div className="features-grid">
          <div className="feature-card">
            <img src="https://cdn-icons-png.flaticon.com/512/888/888879.png" alt="QR Code" />
            <h3>Instant QR Generation</h3>
            <p>
              Get dynamic, scannable QR codes for every link you create. Perfect
              for print, business, and digital sharing.
            </p>
          </div>

          <div className="feature-card">
            <img src="https://cdn-icons-png.flaticon.com/512/10229/10229731.png" alt="Analytics" />
            <h3>Track & Analyze</h3>
            <p>
              Measure link performance with real-time analytics to understand
              clicks and engagement patterns.
            </p>
          </div>

          <div className="feature-card">
            <img src="https://cdn-icons-png.flaticon.com/512/17777/17777023.png " alt="Secure Links" />
            <h3>Secure & Reliable</h3>
            <p>
              Every link is encrypted and optimized for speed. Your data remains
              private, always.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Start Shortening & Scanning Today</h2>
        <p>
          Join thousands using Shortify to share smarter. No sign-up hassle — just results.
        </p>
        <button className="cta-btn" onClick={handleurl}>Get Started for Free</button>
      </section>

      <footer className="footer">
        <p>© 2025 Shortify. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
