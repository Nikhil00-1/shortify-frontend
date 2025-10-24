import { useEffect, useState } from "react";
import "./pastlinks.css";
import { Copy } from "lucide-react";
const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";


const PastLinks = () => {
  const [linksArr, setLinks] = useState([]);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const data = await fetch(`${backendURL}/shortify/history/links`, {
          method: "GET",
          credentials: "include",
        });
        const link = await data.json();
        setLinks(link);
      } catch (err) {
        console.log(err);
      }
    };
    getHistory();
  }, []);

  const handleCopy = async (shortUrl, id) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="history-container">
      <h2 className="history-title">Your Short Link History</h2>

      {linksArr.length === 0 ? (
        <p className="no-links">No links created yet.</p>
      ) : (
        <div className="history-list">
          {linksArr.map((item, index) => {
            const createdDate = new Date(item.createdAt).toLocaleString();
            return (
              <div className="history-row" key={item._id}>
                <div className="link-details">
                  <div className="link-top">
                    <span className="link-number">{index + 1}. </span>
                    <span className="original">{item.url}</span>
                  </div>
                  <a
                    href={`https://shortify-ezjl.onrender.com/${item.shortUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="short"
                  >
                    {`https://shortify-ezjl.onrender.com/${item.shortUrl}`}
                  </a>

                  <p className="timestamp">Created: {createdDate}</p>
                </div>

                <button
                  className={`copy-btn ${copied === item._id ? "copied" : ""}`}
                  onClick={() => handleCopy(item.shortUrl, item._id)}
                >
                  <Copy size={16} />
                  {copied === item._id ? "Copied" : "Copy"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PastLinks;
