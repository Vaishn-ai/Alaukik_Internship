import React, { useState } from "react";
import "./home.css";

function Home() {

  const [tasks, setTasks] = useState([
    {
      title: "Learn React",
      description: "Understand hooks and components",
      status: "Pending"
    },
    {
      title: "Build Dashboard",
      description: "Create UI using flexbox and grid",
      status: "Completed"
    }
  ]);


  const [showModal, setShowModal] = useState(false);


  const [newTask, setNewTask] = useState({
    title: "",
    description: ""
  });


  const handleChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value
    });
  };


  const handleSave = () => {
    if (newTask.title.trim() && newTask.description.trim()) {
      const task = {
        ...newTask,
        status: "Pending"
      };

      setTasks([...tasks, task]);


      setNewTask({ title: "", description: "" });
      setShowModal(false);
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="dashboard-container">


      <div className="sidebar">
        <h2 className="logo">MyApp</h2>

        <ul className="nav-links">
          <li className="active">Dashboard</li>
          <li>Tasks</li>
          <li className="logout">Logout</li>
        </ul>
      </div>


      <div className="main-content">


        <div className="top-bar">
          <h1>Task Dashboard</h1>
          <button
            className="add-btn"
            onClick={() => setShowModal(true)}
          >
            + Add Task
          </button>
        </div>


        <div className="welcome">
          <h2>Welcome Back 👋</h2>
          <p>Manage your daily tasks efficiently</p>
        </div>


        <div className="task-grid">
          {tasks.map((task, index) => (
            <div className="task-card" key={index}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>

              <span className={`status ${task.status}`}>
                {task.status}
              </span>
            </div>
          ))}
        </div>

      </div>


      {showModal && (
        <div className="modal-overlay">
          <div className="modal">

            <h2>Add New Task</h2>

            <input
              type="text"
              name="title"
              placeholder="Enter title"
              value={newTask.title}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Enter description"
              value={newTask.description}
              onChange={handleChange}
            />

            <div className="modal-buttons">
              <button className="save" onClick={handleSave}>
                Save
              </button>

              <button
                className="cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Home;