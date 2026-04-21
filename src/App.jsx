import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Admin from "./pages/Admin";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";   // ⭐ IMPORTANT ADD

import "./App.css";

import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";

export default function App() {

  const [open, setOpen] = useState(false);

  return (
    <div>

      {/* 🌿 NAVBAR */}
      <Navbar setOpen={setOpen} />

      {/* 🛒 CART DRAWER */}
      <CartDrawer open={open} setOpen={setOpen} />

      {/* 📦 ROUTES */}
      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* PRODUCTS */}
        <Route path="/plants" element={<ProductList />} />

        {/* PRODUCT DETAILS */}
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* CART */}
        <Route path="/cart" element={<Cart />} />

        {/* ADMIN */}
        <Route path="/admin" element={<Admin />} />

        {/* CHECKOUT */}
        <Route path="/checkout" element={<Checkout />} />

        {/* PAYMENT */}
        <Route path="/payment" element={<Payment />} />

        {/* 🎉 SUCCESS PAGE (IMPORTANT) */}
        <Route path="/success" element={<OrderSuccess />} />

      </Routes>

    </div>
  );
}