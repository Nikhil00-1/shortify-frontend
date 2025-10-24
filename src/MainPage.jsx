import React, { useState } from "react";
import "./MainPage.css";
const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const MainPage = () => {
  const [url, seturl] = useState("");
  const [shortUrl, setshortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => seturl(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setshortUrl("");
    setMessage("");
    try {
      const response = await fetch(`${backendURL}/shortify`, {
        method: "POST",
        headers: { "content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ url }),
      });
      const short = await response.json();
      setMessage(short.message);
      setshortUrl(short.shorturl);
    } catch {
      setMessage("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="main-bg">
      <div className="main-layout">
        <div className="info-section">
          <div className="icon-circle">
            <img
              src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
              alt="Web icon"
              className="web-icon"
            />
          </div>
          <h1>SmartLink</h1>
          <p>
            Transform long, messy URLs into short, professional links that are
            easy to share and manage.
          </p>
          <div className="feature-list">
            <span>🔗 Streamlined sharing</span>
            <span>💼 Business-ready interface</span>
            <span>📊 Easy tracking integration</span>
          </div>
        </div>

        <div className="url-section">
          <form onSubmit={handleSubmit}>
            <input
              className="inputField"
              type="text"
              placeholder="Paste your long URL here..."
              value={url}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="submitBut"
              disabled={loading}
            >
              {loading ? <span className="loader"></span> : "Generate Link"}
            </button>
          </form>

          {shortUrl && (
            <div className="result-area fade-in">
              <div className="result-box">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="short-link"
                >
                  {shortUrl}
                </a>
                <div className="btn-group">
                  <button
                    onClick={handleCopy}
                    className={`copy-btn ${copied ? "copied" : ""}`}
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          )}
          {message && (
            <div>
              <p className="response-msg error">{message}</p>
            </div>
          )}
        </div>
      </div>

      <footer className="footer">
        <p>
          <span className="highlight"></span> • Empowering Smarter Web Sharing
        </p>
      </footer>
    </div>
  );
};

export default MainPage;
