const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = 5000;


connectDB();

app.use(cors());
app.use(express.json());

const taskRoutes = require("./routes/taskRoutes");
app.use("/", taskRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});