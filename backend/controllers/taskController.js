const Task = require("../models/Task");
const User = require("../models/User");

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private (Admin only)
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    // Validate input
    if (!title || !description || !assignedTo) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Check if assigned employee exists
    const employee = await User.findById(assignedTo);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (employee.role !== "employee") {
      return res
        .status(400)
        .json({ message: "Tasks can only be assigned to employees" });
    }

    // Create task
    const task = await Task.create({
      title,
      description,
      assignedTo,
      assignedBy: req.user.id,
    });

    // Populate the task with user details
    await task.populate("assignedTo", "name email");
    await task.populate("assignedBy", "name email");

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private (Admin only)
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("assignedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get tasks assigned to logged-in employee
// @route   GET /api/tasks/mytasks
// @access  Private (Employee only)
exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id })
      .populate("assignedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update task status
// @route   PUT /api/tasks/:id/status
// @access  Private (Employee only)
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status
    const validStatuses = ["Pending", "In Progress", "Completed"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        message:
          "Please provide a valid status (Pending, In Progress, or Completed)",
      });
    }

    // Find task
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if task is assigned to the logged-in employee
    if (task.assignedTo.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this task" });
    }

    // Update status
    task.status = status;
    await task.save();

    // Populate the task
    await task.populate("assignedTo", "name email");
    await task.populate("assignedBy", "name email");

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get a single task by ID
// @route   GET /api/tasks/:id
// @access  Private
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("assignedBy", "name email");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check authorization
    if (
      req.user.role === "employee" &&
      task.assignedTo._id.toString() !== req.user.id
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this task" });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private (Admin only)
exports.updateTask = async (req, res) => {
  try {
    const { title, description, assignedTo, status } = req.body;

    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update fields
    task.title = title || task.title;
    task.description = description || task.description;
    task.assignedTo = assignedTo || task.assignedTo;
    task.status = status || task.status;

    await task.save();

    // Populate the task
    await task.populate("assignedTo", "name email");
    await task.populate("assignedBy", "name email");

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private (Admin only)
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
