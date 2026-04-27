const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true, // 🔥 unique email
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email"]
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);