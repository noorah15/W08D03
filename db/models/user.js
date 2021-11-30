const mongoose = require("mongoose");

const users = new mongoose.Schema({
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

module.exports = mongoose.model("users", users);
