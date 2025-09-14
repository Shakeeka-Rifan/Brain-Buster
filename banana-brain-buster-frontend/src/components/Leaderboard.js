import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLeaderboard } from "../services/scoreBoardService";
import "../styles/Leaderboard.css";
import { ArrowLeftCircle } from "lucide-react";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const data = await fetchLeaderboard();
      setLeaderboard(data);
    } catch (err) {
      console.error("Error loading leaderboard", err);
    }
  };

  return (
    <div className="leaderboard-container">
      <div className="overlayL"></div>

      <button className="go-back-btn" onClick={() => navigate("/mainmenu")}>
        <ArrowLeftCircle size={40} color="white" />
      </button>

      <h2 className="leaderboard-title">Leaderboard</h2>

      {leaderboard.length > 0 ? (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Score</th>
              
            </tr>
          </thead>
          <tbody>
  {leaderboard.map((entry, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{entry.username}</td>
      <td>{entry.score} points</td>
    </tr>
  ))}
</tbody>

        </table>
      ) : (
        <p className="no-scores">No scores yet.</p>
      )}
    </div>
  );
}

export default Leaderboard;
