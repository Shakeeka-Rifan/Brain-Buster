import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Fetch a new math question
export const fetchQuestion = async () => {
  try {
    const res = await axios.get(`${API_URL}/score/banana`);
    return res.data;
  } catch (error) {
    console.error("Error fetching question", error);
    throw error;
  }
};

// Save user score
export const saveScore = async (updatedScore) => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const difficulty = localStorage.getItem("selectedDifficulty") || "Easy";

    if (!token || !userId) {
      console.error("User ID or Token not found");
      return;
    }

    await axios.post(`${API_URL}/score/save`, { userId, score: updatedScore, difficulty }, { headers: { Authorization: token } });
  } catch (error) {
    console.error("Error saving score", error);
    throw error;
  }
};

export const fetchTotalScore = async (userId) => {
    const response = await axios.get(`${API_URL}/score/total-score/${userId}`);
    return response.data;
  };
