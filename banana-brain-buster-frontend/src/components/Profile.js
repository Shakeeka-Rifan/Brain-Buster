import React, { useState, useEffect } from "react";
import { fetchTotalScore } from "../services/gameService"; // Ensure this function is correctly implemented
import "../styles/Profile.css";

function Profile({ onClose }) {
  const [playerName, setPlayerName] = useState("Player");
  const [score, setScore] = useState(0);
  const userId = localStorage.getItem("userId"); // Ensure userId is stored in localStorage after login

  useEffect(() => {
    const storedName = localStorage.getItem("username") || "Player";
    setPlayerName(storedName);

    if (userId) {
      fetchTotalScore(userId)
        .then((data) => {
          setScore(data.totalScore); // Assuming the API returns `{ totalScore: number }`
        })
        .catch((error) => {
          console.error("Error fetching total score:", error);
        });
    }
  }, [userId]);

  return (
    <div className="profile-overlay">
    <div className="profile-modal">
      <div className="profile-content">
        <h2 className="profile-header">Profile Details</h2>
        <p className="profile-text">Player Name: <strong>{playerName}</strong></p>
        <p className="profile-text">Your Score: <strong>{score}</strong></p>
        <button className="close-profile-btn" onClick={onClose}>Close</button>
      </div>
    </div>
    </div>
  );
}

export default Profile;
