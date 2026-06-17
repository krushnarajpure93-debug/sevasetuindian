const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true }, // in years
  contact: { type: String, required: true },
  fees: { type: Number, required: true },
  availableDays: { type: [String], default: ["Monday", "Wednesday", "Friday"] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Doctor", doctorSchema);