import React, { useState, useEffect } from "react";
import "./home.css";

function Home() {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [taskInput, setTaskInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  const handleAddOrUpdate = () => {
    if (taskInput.trim() === "") return;

    if (editIndex !== null) {

      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = taskInput;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {

      setTasks([...tasks, taskInput]);
    }

    setTaskInput("");
  };


  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };


  const editTask = (index) => {
    setTaskInput(tasks[index]);
    setEditIndex(index);
  };

  return (
    <div className="todo-container">

      <h1>Task Manager 🚀</h1>


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

            <span>{task}</span>

            <div className="btn-group">
              <button
                className="edit-btn"
                onClick={() => editTask(index)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </div>

          </li>
        ))}
      </ul>

    </div>
  );
}

export default Home;