const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorName: String,
  specialization: String,
  hospital: String,
  fees: Number,
  patientName: String,
  contact: String,
  date: String,
  slot: String,
  mode: String,
  payment: String,
  status: {
    type: String,
    enum: ["Pending", "Approved", "Completed", "Cancelled"],
    default: "Pending"
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Appointment", appointmentSchema);