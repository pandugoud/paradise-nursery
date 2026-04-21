import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import jsPDF from "jspdf";

// 🪟 CUSTOM WINDOW SIZE HOOK (NO react-use)
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}

export default function OrderSuccess() {

  const nav = useNavigate();
  const { width, height } = useWindowSize();

  const [orderId, setOrderId] = useState("");
  const [items, setItems] = useState([]);

  // 📦 generate order id
  useEffect(() => {
    const id = "ORD-" + Date.now();
    setOrderId(id);

    // load cart items if you want them in PDF
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setItems(savedCart);
  }, []);

  // 🧾 DOWNLOAD RECEIPT (PRO STYLE)
  const downloadReceipt = () => {
    const doc = new jsPDF();

    // HEADER
    doc.setFillColor(34, 197, 94); // green
    doc.rect(0, 0, 210, 40, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text("🌿 Paradise Nursery", 60, 20);
    doc.setFontSize(10);
    doc.text("Order Receipt", 75, 30);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text("ORDER DETAILS", 15, 55);
    doc.setFontSize(11);
    doc.text(`Order ID: ${orderId}`, 15, 70);
    doc.text("Status: Paid ✅", 15, 80);
    doc.text(`Date: ${new Date().toLocaleString()}`, 15, 90);

    // ITEMS
    doc.setFontSize(12);
    doc.text("ITEMS SUMMARY", 15, 110);
    let y = 125;
    items.forEach((item, index) => {
      doc.setFontSize(10);
      doc.text(
        `${index + 1}. ${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`,
        15,
        y
      );
      y += 10;
    });

    // TOTAL
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    doc.setFontSize(12);
    doc.setTextColor(34, 197, 94);
    doc.text(`TOTAL PAID: $${total.toFixed(2)}`, 15, y + 10);

    // FOOTER
    doc.setTextColor(100);
    doc.setFontSize(10);
    doc.text("Thank you for shopping with Paradise Nursery 🌿", 40, 280);

    doc.save("receipt.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center p-4">

      {/* 🎉 CONFETTI */}
      <Confetti width={width} height={height} />

      <h1 className="text-4xl font-bold text-green-700">
        🎉 Order Placed Successfully!
      </h1>

      <p className="mt-3 text-lg text-gray-700">
        Your plants are on the way 🌿
      </p>

      {/* ORDER ID CARD */}
      <div className="bg-white p-5 mt-5 rounded shadow">
        <p className="font-bold">Order ID</p>
        <p className="text-green-600">{orderId}</p>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4 mt-6 flex-wrap justify-center">

        <button
          onClick={() => nav("/plants")}
          className="bg-black text-white px-5 py-2 rounded"
        >
          🛍 Continue Shopping
        </button>

        <button
          onClick={downloadReceipt}
          className="bg-green-600 text-white px-5 py-2 rounded"
        >
          🧾 Download Receipt
        </button>

      </div>

    </div>
  );
}