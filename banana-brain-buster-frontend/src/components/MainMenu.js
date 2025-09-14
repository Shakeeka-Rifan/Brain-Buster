import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MainMenu.css";
import { ArrowLeftCircle } from "lucide-react";
import profileImage from "../assets/images/prfl.webp";
import { MusicContext } from "../context/Musicprovider"; 
import Profile from "./Profile";  // Import Profile Component


function MainMenu() {
  const navigate = useNavigate();
  const playerName = localStorage.getItem("username") || "Player";
  const { isMusicOn, toggleMusic } = useContext(MusicContext);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State for Profile Form

  return (
    <div className="main-menu-cartoonic">
      <div className="overlayM"></div>

      <button className="go-back-button" onClick={() => navigate("/")}>
        <ArrowLeftCircle size={32} strokeWidth={3} color="white" />
      </button>

       
     {/* Profile Icon */}
     <div className="profile-container" onClick={() => setIsProfileOpen(true)}>
        <img src={profileImage} alt="Profile" className="profile-icon" />
        <p className="player-name">{playerName}</p>
      </div>

      <h2 className="cartoonic-title"></h2>

      <button className="cartoonic-button-3dd leaderboard-btn" onClick={() => navigate("/leaderboard")}>
        🏆 LEADERBOARD
      </button>

      <button
        className="cartoonic-button-3dd play-btn"
        onClick={() => navigate("/choose-difficulty")}
      >
        🚀 PLAY
      </button>

    

      <button className="cartoonic-button-3dd settings-btn" onClick={() => setIsSettingsOpen(true)}>
        ⚙️ SETTINGS
      </button>

      <button className="cartoonic-button-3dd back-home-btn" onClick={() => navigate("/")}>
        🏡 QUIT
      </button>

       {/* Profile Form Modal */}
       {isProfileOpen && <Profile onClose={() => setIsProfileOpen(false)} />}


      {isSettingsOpen && (
        <div className="settings-modal">
          <div className="settings-content">
            <h3 className="settings-header">Settings</h3>

            <div className="settings-option">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isMusicOn}
                  onChange={toggleMusic}
                />
                <span className="slider round"></span>
              </label>
              <span className="music-label">{isMusicOn ? "Music On 🎵" : "Music Off 🔇"}</span>
            </div>

            <button className="close-settings-btn" onClick={() => setIsSettingsOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainMenu;
