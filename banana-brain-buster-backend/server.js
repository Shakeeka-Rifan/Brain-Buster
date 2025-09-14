const express = require("express");
const cors = require("cors");
const axios = require("axios");
const connectDB = require("./config/db");

require("dotenv").config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Existing Routes
app.use("/api/users", require("./routes/authRoutes"));
app.use("/api/score", require("./routes/scoreRoutes"));

// ✅ FIXED: Proxy Route for Banana API

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
