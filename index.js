const express = require("express");
const mongoose = require("mongoose");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("./controllers/taskController");
const {
  registerUser,
  loginUser,
  getUsers,
  changeName,
  changePassword,
  deleteUser,
} = require("./controllers/userController");

const authMiddleware = require("./middleware/auth");

require("dotenv").config();
const URI = process.env.ATLAS_URI || "";
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

//  ============= CONNECTION TO DB =============
mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected successfully to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

// ================== ENDPOINTS ================

app.get("/", (_req, res) => {
  res.send("Hello 👋");
});

// ============ TASKS ENDPOINT ============
app.post("/api/tasks", authMiddleware, createTask);
app.get("/api/tasks", authMiddleware, getTasks);

app.put("/api/tasks/:taskId", authMiddleware, updateTask); // Protect task updating
app.delete("/api/tasks/:taskId", authMiddleware, deleteTask); // Protect task deleting

// ============ AUTH ENDPOINT ============
app.post("/api/register", registerUser);
app.post("/api/login", loginUser);
app.put("/api/change-name", authMiddleware, changeName);
app.put("/api/change-password", authMiddleware, changePassword);

// ============ USER ENDPOINT ============
app.get("/api/users", getUsers);
app.delete("/api/user", authMiddleware, deleteUser);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
