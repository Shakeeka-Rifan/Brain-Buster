import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Game from "./components/Game";
import Home from "./Pages/Home";
import Leaderboard from "./components/Leaderboard";
import MainMenu from "./components/MainMenu";
import ChooseDifficulty from "./components/ChooseDifficulty";
import MusicProvider from "./context/Musicprovider";


function App() {
  return (
    <Router>
      <MusicProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/choose-difficulty" element={<ChooseDifficulty />} />
          <Route path="/mainmenu" element={<MainMenu />} />
          <Route path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </MusicProvider>
    </Router>
  );
}


export default App;
