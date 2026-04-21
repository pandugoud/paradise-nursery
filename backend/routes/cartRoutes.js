const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// GET CART
router.get("/", async (req, res) => {
  const cart = await Cart.find();
  res.json(cart);
});

// ADD TO CART
router.post("/", async (req, res) => {
  const item = await Cart.create(req.body);
  res.json(item);
});

// UPDATE QTY
router.put("/:id", async (req, res) => {
  const item = await Cart.findById(req.params.id);
  item.quantity = req.body.quantity;
  await item.save();
  res.json(item);
});

// DELETE ITEM
router.delete("/:id", async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;