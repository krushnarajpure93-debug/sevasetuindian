const express = require("express");
const router = express.Router();

// Temporary logic jyamule server direct green running hoil
router.post("/", (req, res) => res.json({ success: true, message: "Record Route Working" }));
router.get("/:userId", (req, res) => res.json({ success: true, data: [] }));

module.exports = router;