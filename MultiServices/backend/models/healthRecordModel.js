const mongoose = require("mongoose");

const healthRecordSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  disease: { type: String, required: true },
  prescription: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("HealthRecord", healthRecordSchema);