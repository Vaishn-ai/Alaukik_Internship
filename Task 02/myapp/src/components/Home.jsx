import React, { useState } from "react";
import "./home.css";

function Home() {
  // State for input
  const [taskInput, setTaskInput] = useState("");

  // State for task list (array)
  const [tasks, setTasks] = useState([
    "Learn JS",
    "Complete UI",
    "Fix bugs"
  ]);

  // Add Task
  const addTask = () => {
    if (taskInput.trim() === "") return;

    setTasks([...tasks, taskInput]); // push into array
    setTaskInput(""); // clear input
  };

  // Delete Task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container">

      <h1>Task Manager ✅</h1>

      {/* Input + Add Button */}
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter Task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />

        <button onClick={addTask}>Add</button>
      </div>

      {/* Task List */}
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">

            <span>{task}</span>

            <button
              className="delete-btn"
              onClick={() => deleteTask(index)}
            >
              Delete
            </button>

          </li>
        ))}
      </ul>

    </div>
  );
}

export default Home;