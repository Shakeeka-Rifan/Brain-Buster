const express = require("express");
const { saveScore, getLeaderboard, getTotalScore, getBananaQuestion} = require("../controllers/scoreController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Use controllers for cleaner routes
router.post("/save", saveScore);
router.get("/leaderboard", getLeaderboard);
router.get("/total-score/:userId", getTotalScore);
router.get("/banana", getBananaQuestion);  // New route for fetching Banana API questions


module.exports = router;
