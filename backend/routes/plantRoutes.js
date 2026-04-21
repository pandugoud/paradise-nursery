const express = require("express");
const router = express.Router();
const Plant = require("../models/Plant");

// 🌿 GET ALL PLANTS (SAFE)
router.get("/", async (req, res) => {
  try {
    const plants = await Plant.find();

    if (!plants || plants.length === 0) {
      return res.json([]);
    }

    res.json(plants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🌱 ADD PLANT
router.post("/", async (req, res) => {
  try {
    const plant = new Plant(req.body);
    await plant.save();
    res.json(plant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;