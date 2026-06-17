const express = require("express");
const router = express.Router();
const { 
  createDoctor, 
  getAllDoctors, 
  getDoctorById, 
  updateDoctor, 
  deleteDoctor 
} = require("../controllers/doctorController");

router.route("/").post(createDoctor).get(getAllDoctors);
router.route("/:id").get(getDoctorById).put(updateDoctor).delete(deleteDoctor);

module.exports = router;