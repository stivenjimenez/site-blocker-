import { useState, useEffect } from "react";

const Popup = () => {
  const [urls, setUrls] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    chrome.storage.sync.get("blockedUrls", (data) => {
      if (data.blockedUrls) {
        setUrls(data.blockedUrls);
      }
    });
  }, []);

  const handleAddUrl = () => {
    if (inputValue.trim()) {
      const updatedUrls = [...urls, inputValue.trim()];
      setUrls(updatedUrls);
      setInputValue("");
      chrome.storage.sync.set({ blockedUrls: updatedUrls });
    }
  };

  const handleRemoveUrl = (index: number) => {
    const updatedUrls = urls.filter((_, i) => i !== index);
    setUrls(updatedUrls);
    chrome.storage.sync.set({ blockedUrls: updatedUrls });
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        width: "350px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h1
        style={{
          margin: "0 0 16px 0",
          color: "#333",
          fontSize: "24px",
          textAlign: "center",
        }}
      >
        SiteBlocker
      </h1>
      <p
        style={{
          margin: "0 0 12px 0",
          color: "#666",
          fontSize: "14px",
        }}
      >
        Add URLs to block:
      </p>
      <div style={{ marginBottom: "16px", display: "flex" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter URL"
          style={{
            padding: "10px",
            flex: 1,
            marginRight: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        />
        <button
          onClick={handleAddUrl}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Add
        </button>
      </div>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {urls.map((url, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px",
              marginBottom: "8px",
              backgroundColor: "white",
              borderRadius: "4px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <span style={{ fontSize: "14px", color: "#333" }}>{url}</span>
            <button
              onClick={() => handleRemoveUrl(index)}
              style={{
                padding: "6px 12px",
                backgroundColor: "#ff4444",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Popup;
