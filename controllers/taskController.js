const Task = require("../models/Task");

// ========== CREATE TASK ==========
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    // const userId = req.user._id; // Assuming the authenticated user ID is available

    const task = new Task({
      title,
      description,
      status,
      // userId, // Associate task with the logged-in user
    });

    await task.save();

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// ========== GET TASKS ==========
const getTasks = async (req, res) => {
  try {
    // const userId = req.user._id; // Get the logged-in user's ID

    // const tasks = await Task.find({ userId }); // Find tasks only for the logged-in user
    const tasks = await Task.find(); // Find tasks only for the logged-in user

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// ========== UPDATE TASK ==========
const updateTask = async (req, res) => {
  try {
    // const userId = req.user._id; // Get the logged-in user's ID
    const { taskId } = req.params;

    // Find the task and ensure it belongs to the user
    // const task = await Task.findOne({ _id: taskId, userId });
    const task = await Task.findByIdAndUpdate(taskId);

    if (!task) {
      return res
        .status(404)
        .json({ error: "Task not found or not authorized" });
    }

    // Update the task
    Object.assign(task, req.body);
    await task.save();

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// ========== DELETE TASK ==========
const deleteTask = async (req, res) => {
  try {
    // const userId = req.user._id; // Get the logged-in user's ID
    const { taskId } = req.params;

    // Find the task and ensure it belongs to the user
    // const task = await Task.findOneAndDelete({ _id: taskId, userId });
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return res
        .status(404)
        .json({ error: "Task not found or not authorized" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
