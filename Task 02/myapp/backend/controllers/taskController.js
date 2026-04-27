const mongoose = require("mongoose");
const Task = require("../models/Task");

// GET
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// POST
const addTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newTask = new Task({ title, description, status });
    await newTask.save();

    res.status(201).json({
      message: "Task created",
      task: newTask
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

// ✅ PUT (UPDATE)
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({
      message: "Task updated successfully",
      task: updatedTask
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};

module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask
};