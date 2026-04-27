const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vaishnavi001:v12avi.81A@cluster0.btleuey.mongodb.net/taskdb"
    );

    console.log("MongoDB Atlas Connected ✅");
  } catch (error) {
    console.error("DB Error ❌", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;