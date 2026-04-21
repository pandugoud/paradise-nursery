import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { clearCart } from "../redux/CartSlice";
import { useNavigate } from "react-router-dom";

export default function Checkout() {

  const items = useSelector(s => s.cart.items);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const total = items.reduce((a, b) => a + b.price * b.quantity, 0);

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    payment: "card"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🚀 PLACE ORDER (FINAL FIX)
  const placeOrder = () => {

    if (items.length === 0) {
      alert("Cart is empty!");
      return;
    }

    // 🎉 success alert
    alert("🎉 Order Placed Successfully!");

    console.log("ORDER DETAILS:", {
      user: form,
      products: items,
      total
    });

    // 🧹 CLEAR CART
    dispatch(clearCart());

    // 🚀 GO TO SUCCESS PAGE
    nav("/success");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
        🧾 Checkout Page
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT SIDE - FORM */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-bold mb-4">
            📍 Delivery Address
          </h2>

          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded"
          />

          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded"
          />

          <div className="flex gap-3">

            <input
              name="city"
              placeholder="City"
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              name="pincode"
              placeholder="Pincode"
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

          </div>

          {/* PAYMENT */}
          <h2 className="text-xl font-bold mt-4 mb-3">
            💳 Payment Method
          </h2>

          <select
            name="payment"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="card">Credit / Debit Card</option>
            <option value="cod">Cash on Delivery</option>
            <option value="upi">UPI</option>
          </select>

          {/* PLACE ORDER */}
          <button
            onClick={placeOrder}
            className="bg-green-600 text-white w-full py-3 mt-6 rounded hover:bg-green-700"
          >
            Place Order
          </button>

        </div>

        {/* RIGHT SIDE - SUMMARY */}
        <div className="bg-white p-5 rounded-xl shadow sticky top-6 h-fit">

          <h2 className="text-xl font-bold mb-4">
            🛒 Order Summary
          </h2>

          {items.length === 0 ? (
            <p className="text-gray-500">Cart is empty</p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">

              {items.map(i => (
                <div key={i.id} className="flex justify-between text-sm">

                  <span>{i.name} x {i.quantity}</span>

                  <span className="font-semibold text-green-600">
                    ${(i.price * i.quantity).toFixed(2)}
                  </span>

                </div>
              ))}

            </div>
          )}

          <hr className="my-3" />

          <div className="flex justify-between font-bold text-lg">

            <span>Total</span>

            <span className="text-green-600">
              ${total.toFixed(2)}
            </span>

          </div>

        </div>

      </div>
    </div>
  );
}