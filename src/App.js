import React, { useState, useEffect, useMemo } from "react";
import Sentiment from "sentiment"; 
import MoodChart from "./MoodChart"; 
import "./App.css"; 

function App() {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState("");
  const [sentimentScore, setSentimentScore] = useState(null);
  const [showEntries, setShowEntries] = useState(false); 
  const sentiment = useMemo(() => new Sentiment(), []);

  const positiveKeywords = ["happy", "excited", "fun", "jolly", "joy", "cheerful", "positive", "wonderful", "energetic", "grateful", "uplifted", "peaceful", "love", "connected"];
  const negativeKeywords = ["sad", "upset", "guilty", "disappointed", "angry", "depressed", "stressed", "anxious", "down", "unmotivated"];

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
    setEntries(savedEntries);
  }, []);

  const handleInputChange = (e) => {
    setCurrentEntry(e.target.value);
  };

  const saveEntry = () => {
    if (currentEntry.trim() === "") return; // Prevent empty entries

    let result = sentiment.analyze(currentEntry);
    let score = result.score; // Base score from the library

    // Additional scoring with custom keywords
    const entryWords = currentEntry.toLowerCase().split(/\W+/);
    entryWords.forEach(word => {
        if (positiveKeywords.includes(word)) {
            score += 2; 
        } else if (negativeKeywords.includes(word)) {
            score -= 2; 
        }
    });

    setSentimentScore(score);
    console.log("Final Sentiment Score:", score); //For checking

    const newEntry = {
      text: currentEntry,
      date: new Date().toLocaleDateString(),
      sentiment: score,
    };
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    localStorage.setItem("diaryEntries", JSON.stringify(updatedEntries));

    // Clear the current entry and reset the sentiment score
    setCurrentEntry(""); 
    setSentimentScore(null);
  };

  const deleteEntry = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    localStorage.setItem("diaryEntries", JSON.stringify(updatedEntries));
  };

  const toggleEntries = () => {
    setShowEntries(!showEntries);
  };

  const getSentimentLabel = (score) => {
    if (score > 3) return "Positive";
    if (score < -3) return "Negative";
    return "Neutral";
  };

  const getSentimentColor = (score) => {
    if (score > 3) return "green";
    if (score < -3) return "red";
    return "gray";
  };

  return (
    <div className="app">
      <header className="header">
        <h1>My Aesthetic Diary</h1>
        <p>Write, reflect, and capture your mood</p>
      </header>

      <section className="header-section">
        <h1>Today's Reflection</h1>
        <textarea
          className="diary-entry"
          placeholder="What's on your mind today?"
          value={currentEntry}
          onChange={handleInputChange}
        />
        <button className="submit-button" onClick={saveEntry}>
          Save Entry
        </button>
      </section>

      {sentimentScore !== null && (
        <div style={{ textAlign: "center", color: "#494949", marginTop: "10px" }}>
          <p>Sentiment Score: {sentimentScore}</p>
          <p style={{ color: sentimentScore > 3 ? "green" : sentimentScore < -3 ? "red" : "gray" }}>
            {getSentimentLabel(sentimentScore)} ({sentimentScore})
          </p>
        </div>
      )}

      <MoodChart entries={entries} />

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button className="toggle-entries-button" onClick={toggleEntries}>
          {showEntries ? "Hide Entries" : "View Entries"}
        </button>
      </div>

      {showEntries && (
        <section className="entries-section">
          <h2>Previous Entries</h2>
          <div className="entries-list">
            {entries.length > 0 ? (
              entries.map((entry, index) => (
                <div key={index} className="entry">
                  <p className="entry-date">{entry.date}</p>
                  <p className="entry-text">{entry.text}</p>
                  <p className="entry-sentiment" style={{ color: getSentimentColor(entry.sentiment) }}>
                    Sentiment: {getSentimentLabel(entry.sentiment)} ({entry.sentiment})
                  </p>
                  <button className="delete-button" onClick={() => deleteEntry(index)}>
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p>No entries yet. Start by adding one above!</p>
            )}
          </div>
        </section>
      )}

      <div className="topics-section">
        <div className="topic">
          <img src="/placeholder1.jpg" alt="Happiness Tips" />
          <h2 className="topic-heading">How to Be Happy</h2>
          <div className="topic-content">
            <p className="topic-description">
              Begin to tell your story in a way that it would relate to your audience.
              Write about your most challenging days and what you learned from them. <br /><br />
              Practice gratitude, stay mindful, and connect with others to foster happiness.
            </p>
            <p className="topic-subheading">
              Topics: Mindfulness, Gratitude, Relationships
            </p>
          </div>
          <div className="topic-line"></div>
        </div>

        <div className="topic2">
          <h2 className="topic-heading2">How to Live a Healthy Life</h2>
          <img src="/placeholder2.png" alt="Healthy Living" />
          <div className="topic-content2">
            <p className="topic-description2">
              Focus on maintaining a balanced diet, staying active, and caring for your mental well-being to live a healthier life. <br /><br />
              Incorporate exercises, stay hydrated, and get enough rest.
            </p>
            <p className="topic-subheading2">
              Topics: Nutrition, Exercise, Sleep
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
