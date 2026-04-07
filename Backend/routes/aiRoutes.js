const express = require("express");
const router = express.Router();

const { getAIResponse } = require("../Services/aiServices");

router.post("/ai", async (req, res) => {
  try {
    const { prompt } = req.body;

    const reply = await getAIResponse(prompt);

    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: "AI error" });
  }
});

module.exports = router;