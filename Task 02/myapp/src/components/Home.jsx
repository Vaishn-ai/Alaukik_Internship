import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/home.css";

function Home() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [taskInput, setTaskInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) { navigate("/login");}
  }, []);


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddOrUpdate = () => {
    if (!taskInput.trim()) return;

    if (editIndex !== null) { const updated = [...tasks];
      updated[editIndex] = taskInput; setTasks(updated); setEditIndex(null);
    } else {
      setTasks([...tasks, taskInput]);
    }

    setTaskInput("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setTaskInput(tasks[index]);
    setEditIndex(index);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="todo-container">
  <div className="todo-card">

    <div className="todo-header">
      <h1>Task Manager 🚀</h1>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>

    <div className="input-section">
      <input
        type="text"
        placeholder="Enter Task"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <button onClick={handleAddOrUpdate}>
        {editIndex !== null ? "Update" : "Add"}
      </button>
    </div>

    <ul className="task-list">
      {tasks.map((task, index) => (
        <li key={index} className="task-item">
          <span className="task-text">{task}</span>

          <div className="btn-group">
            <button className="edit-btn" onClick={() => editTask(index)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => deleteTask(index)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>

  </div>
</div>
  );
}

export default Home;