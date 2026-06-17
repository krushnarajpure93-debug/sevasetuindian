const express = require("express");
const router = express.Router();

// औषधांची यादी देणारा सुरक्षित API
router.get("/", (req, res) => {
    const dummyMedicines = [
        { id: 1, name: "Paracetamol 650mg", price: 30, description: "For fever and pain relief" },
        { id: 2, name: "Amoxicillin 500mg", price: 120, description: "Antibiotic for infections" },
        { id: 3, name: "Cetirizine 10mg", price: 25, description: "For allergy and cold" }
    ];
    res.json({ success: true, data: dummyMedicines });
});

module.exports = router;