const express = require("express");
const mongoose = require("mongoose");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("./controllers/taskController");

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://ahmed:ahmed123@cluster0.mfypw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (_req, res) => {
  res.send("Hello 👋");
});

// ============ TASKS ENDPOINT ============
app.post("/api/tasks", createTask);
app.get("/api/tasks", getTasks);

app.put("/api/tasks/:taskId", updateTask); // Protect task updating
app.delete("/api/tasks/:taskId", deleteTask); // Protect task deleting
// app.delete('/tasks/:taskId', auth, deleteTask); // Protect task deleting

app.listen(8000, () => {
  console.log("app listening on port 8000");
});
