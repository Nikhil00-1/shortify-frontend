import { useEffect, useState } from "react";
import "./pastQrs.css";
const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";


const PastQrs = () => {
  const [qrArr, setQrs] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const data = await fetch(`${backendURL}/shortify/history/qrs`, {
          method: "GET",
          credentials: "include",
        });
        const Qr = await data.json();
        setQrs(Qr);
      } catch (err) {
        console.log(err);
      }
    };
    getHistory();
  }, []);

  const handleDownload = async (url, filename) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob(); // convert to binary
    const blobUrl = window.URL.createObjectURL(blob); // temporary URL

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename || "qr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // cleanup
    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error("Error downloading QR:", err);
  }
};


  return (
    <div className="history-container">
      <h2 className="history-title">Your QR Code History</h2>

      {qrArr.length === 0 ? (
        <p className="no-links">No QR Codes created yet.</p>
      ) : (
        <div className="history-list">
          {qrArr.map((item, index) => {
            const createdDate = new Date(item.createdAt).toLocaleString();
            return (
              <div className="history-row" key={item._id || index}>
                <div className="link-info">
                  <p className="link-number">{index + 1}.</p>
                  <p className="original-url">{item.url}</p>
                </div>

                <div className="qr-section">
                  <img src={item.CloudUrl} alt="QR Code" className="qr-img" />
                  <button
                    className="download-btn"
                    onClick={() =>
                      handleDownload(item.CloudUrl, `qr-${index + 1}.png`)
                    }
                  >
                    Download
                  </button>
                </div>

                <p className="timestamp">Created: {createdDate}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PastQrs;
