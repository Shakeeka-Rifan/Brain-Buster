import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import backgroundMusic from "../assets/background.mp3";

const MusicContext = createContext();

const MusicProvider = ({ children }) => {
  const [music, setMusic] = useState(null);
  const [isMusicOn, setIsMusicOn] = useState(() => {
    return localStorage.getItem("isMusicOn") === "true";
  });

  const location = useLocation();

  useEffect(() => {
    if (isMusicOn) {
      if (!music) {
        const newMusic = new Audio(backgroundMusic);
        newMusic.loop = true;
        newMusic.play();
        setMusic(newMusic);
      } else {
        music.play();
      }
    } else if (music) {
      music.pause();
    }
  }, [isMusicOn, music]); // Added `music` to dependencies
  

  // Stop music when navigating to the Home page
  useEffect(() => {
    if (location.pathname === "/" && music) {
      music.pause();
    }
  }, [location, music]); // Added `music` to dependencies
  
  const toggleMusic = () => {
    setIsMusicOn((prev) => {
      const newState = !prev;
      localStorage.setItem("isMusicOn", newState);
      return newState;
    });
  };

  return (
    <MusicContext.Provider value={{ isMusicOn, toggleMusic }}>
      {children}
    </MusicContext.Provider>
  );
};

export { MusicContext };
export default MusicProvider;
