const express = require("express");
const router = express.Router();
const {
  login,
  register,
  getMe,
  getEmployees,
} = require("../controllers/authController");
const { protect, admin } = require("../middleware/auth");

// Public routes
router.post("/login", login);
router.post("/register", register);

// Protected routes
router.get("/me", protect, getMe);
router.get("/employees", protect, admin, getEmployees);

module.exports = router;
