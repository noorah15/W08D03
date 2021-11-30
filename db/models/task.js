const mongoose = require("mongoose");

const task = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  isDel: { type: String, required: true, trim: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("task", task);
