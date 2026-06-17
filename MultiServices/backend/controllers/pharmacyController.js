const Pharmacy = require("../models/pharmacyModel");

// 1. Register New Pharmacy (Create)
exports.createPharmacy = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.create(req.body);
    res.status(201).json({ success: true, message: "Pharmacy registered successfully", data: pharmacy });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Get All Pharmacies (Read All)
exports.getAllPharmacies = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find().sort({ createdAt: -1 });
    res.json({ success: true, pharmacies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Get Single Pharmacy By ID (Read One)
exports.getPharmacyById = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findById(req.params.id);
    if (!pharmacy) return res.status(404).json({ success: false, message: "Pharmacy not found" });
    res.json({ success: true, pharmacy });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Update Pharmacy Details (Update)
exports.updatePharmacy = async (req, res) => {
  try {
    const updatedPharmacy = await Pharmacy.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedPharmacy) return res.status(404).json({ success: false, message: "Pharmacy not found" });
    res.json({ success: true, message: "Pharmacy updated successfully", pharmacy: updatedPharmacy });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5. Delete Pharmacy (Delete)
exports.deletePharmacy = async (req, res) => {
  try {
    const deletedPharmacy = await Pharmacy.findByIdAndDelete(req.params.id);
    if (!deletedPharmacy) return res.status(404).json({ success: false, message: "Pharmacy not found" });
    res.json({ success: true, message: "Pharmacy deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};