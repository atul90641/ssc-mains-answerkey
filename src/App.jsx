import React, { useState } from "react";
import Results from "./Results";
import './App.css'; // Import the CSS

function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);

  const handleFetchResults = async () => {
    if (!url.trim()) return;
    try {
      const response = await fetch(`/api/fetchQuiz?url=${encodeURIComponent(url)}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }
      const htmlText = await response.text();
      setData(htmlText);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleFetchResults();
    }
  };

  return (
    <div className="container">
      <h1>CGL Mains Answer Key Calculator</h1>
      <input
        type="text"
        placeholder="Enter URL here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyPress={handleKeyPress}  // Listen for Enter key press
      />
      <button onClick={handleFetchResults}>Get Results</button>

      {data && <Results htmlData={data} />}

      {/* Link Button in Top Right Corner */}
      <a href="https://cgl-pre-answerkey.vercel.app" target="_blank" rel="noopener noreferrer">
        <button className="link-button">CGL Pre Answer Key</button>
      </a>

      {/* Footer Section */}
      <footer className="footer">
        Made by Atul Kumar
      </footer>
    </div>
  );
}

export default App;
