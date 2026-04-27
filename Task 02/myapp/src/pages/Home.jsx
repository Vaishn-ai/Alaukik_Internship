import React, { useState, useEffect } from "react";
import { API } from "../api";
import "../style/home.css";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Pending"
  });

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    if (!form.title.trim()) return alert("Title required");

    setLoading(true);

    try {
      if (editId) {
        const res = await fetch(`${API}/tasks/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });

        const data = await res.json();

        setTasks((prev) =>
          prev.map((t) => (t._id === editId ? data.task : t))
        );

        setEditId(null);
      } else {
        const res = await fetch(`${API}/tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });

        const data = await res.json();
        setTasks((prev) => [data.task, ...prev]);
      }

      setForm({ title: "", description: "", status: "Pending" });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (task) => {
    setForm({
      title: task.title,
      description: task.description,
      status: task.status
    });
    setEditId(task._id);
  };

  const toggleStatus = async (task) => {
    const newStatus =
      task.status === "Pending" ? "Completed" : "Pending";

    try {
      const res = await fetch(`${API}/tasks/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...task, status: newStatus })
      });

      const data = await res.json();

      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? data.task : t))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/tasks/${id}`, {
        method: "DELETE"
      });

      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Student Task List 🚀</h2>

      <div className="form">
        <input
          name="title"
          placeholder="Task title"
          value={form.title}
          onChange={handleChange}
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <select name="status" value={form.status} onChange={handleChange}>
          <option>Pending</option>
          <option>Completed</option>
        </select>

        <button onClick={handleAdd} disabled={loading}>
          {loading ? "Saving..." : editId ? "Update Task" : "Add Task"}
        </button>
      </div>

      <div className="grid">
        {tasks.map((task) => (
          <div className="card" key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>

            <span
              className={`status ${task.status}`}
              onClick={() => toggleStatus(task)}
              style={{ cursor: "pointer" }}
            >
              {task.status}
            </span>

            <div className="actions">
              <button
                className="update-btn"
                onClick={() => startEdit(task)}
              >
                Edit
              </button>

              <button
                className="update-btn"
                onClick={() => toggleStatus(task)}
              >
                Toggle
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;