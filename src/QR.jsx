import React, { useState } from "react";
import "./QRPage.css";
const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";


const QRPage = () => {
    const [url, setUrl] = useState("");
    const [qrImg, setQrImg] = useState("");
    const [loading, setLoading] = useState(false);
    const [downloaded, setDownloaded] = useState(false);
    const [message, setMessage] = useState();

    const handleChange = (e) => setUrl(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setDownloaded(false);
        try {
            const response = await fetch(`${backendURL}/shortify/qr`, {
                method: "POST",
                headers: { "content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ url }),
            });

            const data = await response.json();
            setMessage(data.message)
            if (data.qrImg) setQrImg(data.qrImg);
        } catch (err) {
            console.error("Error generating QR:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = qrImg;
        link.download = "SmartLink-QR.png";
        link.click();
        setDownloaded(true);
        setTimeout(() => setDownloaded(false), 2000);
    };

    return (
        <div className="main-bg">
            <div className="main-layout">
                {/* Left Info Section */}
                <div className="info-section">
                    <div className="icon-circle">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/1198/1198343.png"
                            alt="QR Icon"
                            className="web-icon"
                        />
                    </div>
                    <h1>SmartQR</h1>
                    <p>
                        Convert any URL into a stylish QR code — perfect for business cards,
                        posters, or quick sharing.
                    </p>
                    <div className="feature-list">
                        <span>📲 Scan-ready in seconds</span>
                        <span>🎨 Crisp and clear design</span>
                        <span>⬇️ One-click download</span>
                    </div>
                </div>

                <div className="url-section">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="inputField"
                            type="text"
                            placeholder="Paste your URL to generate QR..."
                            value={url}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" className="submitBut" disabled={loading}>
                            {loading ? "Generating..." : "Generate QR"}
                        </button>
                    </form>

                    {qrImg && (
                        <div className="result-area fade-in">
                            <div className="qr-result">
                                <img src={qrImg} alt="Generated QR" className="qr-img1" />
                                <div className="btn-group">
                                    <button
                                        onClick={handleDownload}
                                        className={`copy-btn ${downloaded ? "copied" : ""}`}>
                                        {downloaded ? "Downloaded!" : "Download"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {message && (
                        <div>
                            <p className="response-msg error">
                                {message}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            
            <footer className="footer">
                <p>
                    <span className="highlight"></span> • Scan Smarter,
                    Share Faster
                </p>
            </footer>
        </div>
    );
};

export default QRPage;
