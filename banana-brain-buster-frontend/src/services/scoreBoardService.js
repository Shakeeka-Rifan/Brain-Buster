import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Fetch leaderboard data
export const fetchLeaderboard = async () => {
  try {
    const res = await axios.get(`${API_URL}/score/leaderboard`);
    return res.data;
  } catch (error) {
    console.error("Error fetching leaderboard", error);
    throw error;
  }
};
