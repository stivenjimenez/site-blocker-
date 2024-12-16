import { useState, useEffect } from "react";
import { Button, Input } from "./components";
import "./styles/popup.css";

const Popup = () => {
  const [urls, setUrls] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    chrome.storage?.sync.get("blockedUrls", (data) => {
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
      chrome.storage?.sync.set({ blockedUrls: updatedUrls });
    }
  };

  const handleRemoveUrl = (index: number) => {
    const updatedUrls = urls.filter((_, i) => i !== index);
    setUrls(updatedUrls);
    chrome.storage?.sync.set({ blockedUrls: updatedUrls });
  };

  return (
    <main className="popup">
      <h1 className="popup__title">SiteBlocker</h1>
      <p className="popup__description">Add URLs to block:</p>

      <div className="popup__input-group">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter URL"
        />
        <Button onClick={handleAddUrl}>Add</Button>
      </div>

      <ul className="popup__card-list">
        {urls.map((url, index) => (
          <li key={index} className="popup__card">
            <span className="popup__card-name">{url}</span>
            <Button variant="danger" onClick={() => handleRemoveUrl(index)}>
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Popup;
