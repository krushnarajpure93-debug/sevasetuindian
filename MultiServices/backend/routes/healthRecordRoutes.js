const express = require("express");
const router = express.Router();

// Fallback logic so server doesn't crash
router.post("/", (req, res) => res.json({ success: true, message: "Health Record Route Working" }));
router.get("/:userId", (req, res) => res.json({ success: true, data: [] }));

module.exports = router;