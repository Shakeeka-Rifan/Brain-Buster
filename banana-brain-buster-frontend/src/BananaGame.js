import { useState, useEffect } from "react";
import axios from "axios";

function BananaGame({ token }) {
    const [gameData, setGameData] = useState(null);
    const [userAnswer, setUserAnswer] = useState("");
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/api/banana-game", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setGameData(response.data);
            setFeedback("");
        })
        .catch(error => console.error("Error fetching game data:", error));
    }, [token]);

    const checkAnswer = () => {
        if (userAnswer === gameData.solution.toString()) {
            setFeedback("✅ Correct!");
        } else {
            setFeedback("❌ Wrong! Try again.");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Banana Game</h1>
            {gameData ? (
                <div>
                    <img 
                        src={gameData.question} 
                        alt="Math Puzzle" 
                        style={{ width: "300px", border: "2px solid black" }} 
                    />
                    <br />
                    <input 
                        type="number" 
                        placeholder="Enter your answer" 
                        value={userAnswer} 
                        onChange={(e) => setUserAnswer(e.target.value)} 
                        style={{ padding: "5px", margin: "10px" }}
                    />
                    <button onClick={checkAnswer} style={{ padding: "5px 10px" }}>Submit</button>
                    <p>{feedback}</p>
                </div>
            ) : (
                <p>Loading game...</p>
            )}
        </div>
    );
}

export default BananaGame;
