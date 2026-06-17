const express = require("express");
const router = express.Router();
const { 
  createPharmacy, 
  getAllPharmacies, 
  getPharmacyById, 
  updatePharmacy, 
  deletePharmacy 
} = require("../controllers/pharmacyController");

// Sagle pharmacy requests router var map karne
router.route("/").post(createPharmacy).get(getAllPharmacies);
router.route("/:id").get(getPharmacyById).put(updatePharmacy).delete(deletePharmacy);

module.exports = router;