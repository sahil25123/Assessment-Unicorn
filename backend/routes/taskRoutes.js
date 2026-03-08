const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTasks,
  getMyTasks,
  updateTaskStatus,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { protect, admin, employee } = require("../middleware/auth");

// Admin routes
router.post("/", protect, admin, createTask);
router.get("/", protect, admin, getAllTasks);
router.put("/:id", protect, admin, updateTask);
router.delete("/:id", protect, admin, deleteTask);

// Employee routes
router.get("/mytasks", protect, employee, getMyTasks);
router.put("/:id/status", protect, employee, updateTaskStatus);

// Shared routes
router.get("/:id", protect, getTaskById);

module.exports = router;
