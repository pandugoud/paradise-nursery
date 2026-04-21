import { useState } from "react";

export default function Admin() {

  const [form, setForm] = useState({
    name: "",
    price: "",
    img: "",
    category: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: form.name,
        price: Number(form.price),
        img: form.img,
        category: form.category
      })
    });

    alert("Plant Added 🌿");

    // ✅ REDIRECT → PRODUCT PAGE
    window.location.href = "/plants";
  };

  return (
    <div className="p-10 max-w-xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        🌿 Admin Panel
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Plant Name"
          className="border p-2 w-full"
          required
        />

        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          className="border p-2 w-full"
          required
        />

        <input
          name="img"
          value={form.img}
          onChange={handleChange}
          placeholder="Image URL"
          className="border p-2 w-full"
          required
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-2 w-full"
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white w-full p-2 rounded"
        >
          Add Plant
        </button>

      </form>

    </div>
  );
}