const Medicine = require("../models/medicineModel");

// 1. Add New Medicine (Create)
exports.createMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.create(req.body);
    res.status(201).json({ success: true, message: "Medicine Added to Inventory", data: medicine });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Get All Medicines (Read All)
exports.getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find().sort({ createdAt: -1 });
    res.json({ success: true, count: medicines.length, medicines });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Get Single Medicine By ID (Read One)
exports.getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ success: false, message: "Medicine Not Found" });
    res.json({ success: true, medicine });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Update Medicine (Update)
exports.updateMedicine = async (req, res) => {
  try {
    const updatedMedicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedMedicine) return res.status(404).json({ success: false, message: "Medicine Not Found" });
    res.json({ success: true, message: "Medicine stock updated successfully", medicine: updatedMedicine });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5. Delete Medicine (Delete)
exports.deleteMedicine = async (req, res) => {
  try {
    const deletedMedicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!deletedMedicine) return res.status(404).json({ success: false, message: "Medicine Not Found" });
    res.json({ success: true, message: "Medicine removed from database" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};