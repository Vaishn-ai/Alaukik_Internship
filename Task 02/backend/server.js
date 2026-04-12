const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

let tasks = [];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const newTask = req.body;

  tasks.push(newTask);

  res.json({ message: "Task added", task: newTask });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});