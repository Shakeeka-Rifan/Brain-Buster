// ChooseDifficulty.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ChooseDifficulty.css";
import bananaIcon from "../assets/images/banana-human.png";
import { ArrowLeftCircle } from "lucide-react";

function ChooseDifficulty({ onSelect }) {
  const [difficulty, setDifficulty] = useState("Easy");
  const navigate = useNavigate();

  const handleSubmit = () => {
    localStorage.setItem("selectedDifficulty", difficulty);
    if (onSelect) onSelect(difficulty);
    navigate("/game");
  };

  return (
    <div className="choose-difficulty-container">
        <button className="go-back-button" onClick={() => navigate("/mainmenu")}> 
        <ArrowLeftCircle size={32} strokeWidth={3} color="white" />
      </button>


      <div className="overlayC"></div>
      <img src={bananaIcon} alt="Banana Icon" className="banana-icon" />
      <div className="choose-difficulty-box">
        <h2>Choose Difficulty</h2>
        <form>
          <label className="difficulty-option">
            <input
              type="radio"
              value="Easy"
              checked={difficulty === "Easy"}
              onChange={(e) => setDifficulty(e.target.value)}
            />
            🍌 Easy
          </label>
          <label className="difficulty-option">
            <input
              type="radio"
              value="Medium"
              checked={difficulty === "Medium"}
              onChange={(e) => setDifficulty(e.target.value)}
            />
            🚀 Medium
          </label>
          <label className="difficulty-option">
            <input
              type="radio"
              value="Hard"
              checked={difficulty === "Hard"}
              onChange={(e) => setDifficulty(e.target.value)}
            />
            🔥 Hard
          </label>
        </form>
        <button className="cartoonic-button-3ds" onClick={handleSubmit}> Confirm</button>
      </div>
    </div>
  );
}

export default ChooseDifficulty;