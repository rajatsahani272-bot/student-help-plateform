const express = require("express");
const router = express.Router();

const { 
  getInternships, 
  saveInternship,
  syncInternships
} = require("../Controller/internshipController");

const authMiddleware = require("../middleware/authMiddleware");

// GET ALL
router.get("/internships", getInternships);

// SAVE
router.post("/internships/:id/save", authMiddleware, saveInternship);

// MANUAL SYNC (NEW )
router.get("/internships/sync", async (req, res) => {
  try {
    await syncInternships();
    res.json({ msg: "Internships synced manually" });
  } catch (err) {
    res.status(500).json({ msg: "Sync failed" });
  }
});

module.exports = router;