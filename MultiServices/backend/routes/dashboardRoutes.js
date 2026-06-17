const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/dashboardController");

// Dashboard stats route map karne
router.route("/stats").get(getDashboardStats);

module.exports = router;