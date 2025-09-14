const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

// Use controllers for cleaner routes
router.post("/register", register);
router.post("/login", login);

module.exports = router;
