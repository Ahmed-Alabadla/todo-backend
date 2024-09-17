const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Task Schema
const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Refers to the User model
      ref: "User",
      required: true, // This ensures that every task is associated with a user
    },
  },
  { timestamps: true }
);

// Create Task model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
