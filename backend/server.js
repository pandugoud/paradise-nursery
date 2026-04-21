const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

// ✅ HOME ROUTE
app.get("/", (req, res) => {
  res.send("🌿 Backend Running");
});

// ✅ DB CONNECT
mongoose.connect("mongodb://127.0.0.1:27017/plantsDB")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// MODEL
const Plant = require("./models/Plant");

// ✅ GET ALL PLANTS
app.get("/api/plants", async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ADD PLANT (ADMIN)
app.post("/api/plants", async (req, res) => {
  try {
    const plant = await Plant.create(req.body);
    res.json(plant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on 5000 🚀");
});