const Score = require("../models/Score");
const User = require("../models/User");
const axios = require("axios");


// ✅ Save Score (Update if exists, else create new)
const saveScore = async (req, res) => {
    const { userId, score, difficulty } = req.body;
    try {
        const existingScore = await Score.findOne({ userId, difficulty });

        if (existingScore) {
            existingScore.score += score;
            await existingScore.save();
        } else {
            const newScore = new Score({ userId, score, difficulty });
            await newScore.save();
        }

        res.status(200).json({ message: "Score saved successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save score" });
    }
};

// ✅ Get Top 10 Leaderboard
// scoreController.js
// scoreController.js
const getLeaderboard = async (req, res) => {
    try {
      const aggregatedScores = await Score.aggregate([
        {
          $group: {
            _id: "$userId",
            totalScore: { $sum: "$score" }
          }
        },
        { $sort: { totalScore: -1 } },
        { $limit: 10 }
      ]);
  
      const userIds = aggregatedScores.map(doc => doc._id);
      const users = await User.find({ _id: { $in: userIds } }, "username");
      const userMap = {};
      users.forEach(u => {
        userMap[u._id.toString()] = u.username;
      });
  
      const leaderboard = aggregatedScores.map(doc => ({
        userId: doc._id,
        username: userMap[doc._id.toString()],
        score: doc.totalScore
      }));
  
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ error: "Error fetching leaderboard" });
    }
  };
  
  

// ✅ Get Total Score for a User
const getTotalScore = async (req, res) => {
    const { userId } = req.params;

    try {
        const scores = await Score.find({ userId });
        const totalScore = scores.reduce((acc, entry) => acc + entry.score, 0);

        res.json({ totalScore });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching total score" });
    }
};

// ✅ New: Fetch Banana API Question
const getBananaQuestion = async (req, res) => {
  try {
    const response = await axios.get("http://marcconrad.com/uob/banana/api.php?out=json");
    res.json(response.data); // Ensure this returns JSON
  } catch (error) {
    console.error("Error fetching Banana API:", error.message);
    res.status(500).json({ error: "Failed to fetch question" });
  }
};



module.exports = { saveScore, getLeaderboard, getTotalScore, getBananaQuestion };
