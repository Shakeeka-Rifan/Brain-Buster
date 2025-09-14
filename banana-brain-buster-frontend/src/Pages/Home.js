import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Home.css';  // Import the Home.css styles
import bananaImage from '../assets/images/wallpaper.jpg';  // Correct relative path to the image
import greenButton from '../assets/images/hhh.png';  // Green button background for Login
import blueButton from '../assets/images/hhh.png';  // Blue button background for Sign Up

function Home() {
    const navigate = useNavigate();

    return (
      <div className="home-container">
        <div className="overlay"></div> {/* Dark overlay */}
        
        {/* Top Right Buttons */}
        <div className="auth-buttons">
          <button className="blue" onClick={() => navigate("/signup")}>
            <img src={blueButton} alt="Sign Up" className="button-bg" />
            <span>Sign Up</span>
          </button>
          <button className="green" onClick={() => navigate("/login")}>
            <img src={greenButton} alt="Log In" className="button-bg" />
            <span>Log In</span>
          </button>
        </div>

        {/* Left Side Content */}
        <div className="content">
          <h1>Welcome to Banana Brain Buster!</h1>
          <p className="description">
          Banana Brain Buster is a fun math game to test your problem-solving skills. Pick a difficulty, beat the clock, and top the leaderboard!🍌🧠
          </p>
        </div>
      </div>
    );
}

export default Home;
