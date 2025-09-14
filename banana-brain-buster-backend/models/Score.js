const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Score", ScoreSchema);
