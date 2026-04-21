const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  name: String,
  price: Number,
  img: String,
  category: String
});

module.exports = mongoose.model("Plant", plantSchema);