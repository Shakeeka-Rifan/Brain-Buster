import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuestion, saveScore, fetchTotalScore } from "../services/gameService";
import "../styles/Game.css";
import { Menu } from "lucide-react";
import { MusicContext } from "../context/Musicprovider";

function Game() {
  const { isMusicOn, startMusic } = useContext(MusicContext);
  const [difficulty] = useState(localStorage.getItem("selectedDifficulty") || "Easy");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(difficulty === "Easy" ? 90 : difficulty === "Medium" ? 60 : 30);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [hint, setHint] = useState("");
  const [hintUsed, setHintUsed] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!isMusicOn && startMusic) {
      startMusic();
    }

    fetchNewQuestion();
    fetchUserTotalScore();

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isMusicOn, startMusic]);

  const fetchNewQuestion = async () => {
    try {
      const data = await fetchQuestion();
      setQuestion(data.question);
      setAnswer(data.solution);
      setIsCorrect(null);
      setShowPopUp(false);
      setHint(""); // Reset hint
      setHintUsed(false); // Reset hint usage
    } catch (err) {
      console.error("Error fetching question", err);
    }
  };

  const fetchUserTotalScore = async () => {
    if (!userId) return;
    try {
      const data = await fetchTotalScore(userId);
      setTotalScore(data.totalScore);
    } catch (error) {
      console.error("Error fetching total score", error);
    }
  };

  const handleNumberClick = (num) => {
    setUserAnswer((prev) => prev + num.toString());
  };

  const checkAnswer = async () => {
    if (parseInt(userAnswer) === parseInt(answer)) {
      const delta = 10;
      setScore(prev => prev + delta);
      setTotalScore(prev => prev + delta);
      await saveScore(delta);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setShowPopUp(true);
    setUserAnswer("");
    // Removed fetchNewQuestion() call here
  };
  

  const useHint = async () => {
    if (!hintUsed && answer) {
      let lowerBound = Math.max(0, answer - 3);
      let upperBound = answer + 3;
      if (upperBound - lowerBound < 2) {
        upperBound = answer + 2;
      }
  
      setHint(`It's greater than ${lowerBound} but less than ${upperBound}`);
      setHintUsed(true);
      
      // Update local state: deduct 10 points
      setScore((prev) => (prev >= 10 ? prev - 10 : 0));
      setTotalScore((prev) => (prev >= 10 ? prev - 10 : 0));
      
      // Update the backend and re-fetch the updated total score
      await saveScore(-10);
      await fetchUserTotalScore();
    }
  };
  
  const resetGame = () => {
    setIsGameOver(false);
    setScore(0);
    setTimeLeft(difficulty === "Easy" ? 90 : difficulty === "Medium" ? 60 : 30);
    fetchNewQuestion();
    setUserAnswer("");
  };

  return (
    <div className="game-container-cartoonic">
      <div className="overlay"></div>
      <button className="main-menu-btn" onClick={() => navigate("/mainmenu")}>
        <Menu size={36} color="white" />
      </button>

      <h2> FIND THE VALUE OF THE BANANA 🍌</h2>

      <div className="status-block">
        <div className="s1">Time Left: <span>{timeLeft}s</span></div>
        <div className="s2">Total Score: <span>{totalScore}</span></div>
      </div>

      <div className="question-board">
        <img src={question} alt="Math Question" className="question-image" />
      </div>

  

<button className="hint-button" onClick={useHint} disabled={hintUsed}>
  Use Hint
</button>

{hint && <div className="hint-box">{hint}</div>}

      <div className="number-blocks">
        {[...Array(10).keys()].map((num) => (
          <button key={num} className="number-block" onClick={() => handleNumberClick(num)} disabled={isGameOver}>
            {num}
          </button>
        ))}
      </div>

      <button className="cartoonic-button-3da" onClick={checkAnswer} disabled={!userAnswer}>Submit</button>


      

      {showPopUp && (
  <div className="popup">
    {isCorrect ? (
      <>
        <p>🎉 Correct! Great Job! 🎉</p>
        <p>Points earned: {score}</p>
        {/* Fetch a new question only when the answer was correct */}
        <button onClick={fetchNewQuestion}>Next Question</button>
      </>
    ) : (
      <>
        <p>❌ Oops! Try Again! ❌</p>
        {/* Close the popup so the same question remains */}
        <button onClick={() => setShowPopUp(false)}>Try Again</button>
      </>
    )}
  </div>
)}


      {isGameOver && !showPopUp && (
        <div className="popup">
          <p>⏰ Time's up! ⏰</p>
          <p>Your score: {score} points</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default Game;
