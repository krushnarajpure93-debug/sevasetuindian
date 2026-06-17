const express = require("express");
const router = express.Router();

// =================================================================
// 💾 LIVE FIX: DIRECT SAVE TO MONGO DB (PORT 5003)
// =================================================================
router.post("/", async (req, res) => {
  try {
    console.log("📥 [Routes] Received Appointment Data:", req.body);

    const mongoose = require("mongoose");
    let Appointment;

    try {
      Appointment = require("../models/appointmentModel");
    } catch (e) {
      // जर मॉडेल सापडले नाही, तर तात्पुरते मॉडेल तयार करा जेणेकरून कोड क्रॅश होणार नाही
      const tempSchema = new mongoose.Schema({
        patientName: String,
        doctorName: String,
        date: String,
        fare: String,
        seatNo: String
      }, { timestamps: true });
      Appointment = mongoose.models.Appointment || mongoose.model("Appointment", tempSchema);
    }

    // नवीन डेटा ऑब्जेक्ट तयार करा
    const newAppointment = new Appointment({
      patientName: req.body.patientName || "Unknown Patient",
      doctorName: req.body.doctorName || "General Doctor",
      date: req.body.date || new Date().toISOString(),
      fare: req.body.fare?.toString() || "0",
      seatNo: req.body.seatNo || "Mode: Walk-in"
    });

    // डेटाबेसमध्ये सेव्ह करा
    const savedData = await newAppointment.save();
    console.log("💾 [Routes] Successfully Saved to MongoDB:", savedData);

    res.status(201).json(savedData);
  } catch (error) {
    console.error("❌ [Routes] MongoDB Save Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET endpoint (जर गरज असेल तर)
router.get("/", (req, res) => {
  res.json({ success: true, message: "Appointment routes working fine!" });
});

module.exports = router;