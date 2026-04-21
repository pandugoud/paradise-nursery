import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import { Link } from "react-router-dom";

export default function ProductList() {

  const [plants, setPlants] = useState([]);
  const [addedId, setAddedId] = useState(null); // ⭐ animation state
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:5000/api/plants")
      .then(res => res.json())
      .then(data => {

        const formatted = data.map(p => ({
          id: p._id,
          name: p.name,
          price: p.price,
          img: p.img
        }));

        setPlants(formatted);
      });
  }, []);

  // 🛒 ADD TO CART + UI FEEDBACK
  const handleAdd = (p) => {
    dispatch(addToCart(p));

    setAddedId(p.id);

    setTimeout(() => {
      setAddedId(null);
    }, 1000);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-8 text-center text-green-700">
        🌿 Plants Collection
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {plants.map(p => (
          <div
            key={p.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 overflow-hidden"
          >

            {/* IMAGE */}
            <Link to={`/product/${p.id}`}>
              <img
                src={p.img}
                className="h-52 w-full object-cover hover:scale-110 transition duration-300"
              />
            </Link>

            <div className="p-5">

              {/* NAME */}
              <h2 className="font-bold text-lg text-gray-800">
                {p.name}
              </h2>

              {/* PRICE */}
              <p className="text-green-600 font-semibold text-lg">
                ${p.price}
              </p>

              {/* BUTTON */}
              <button
                onClick={() => handleAdd(p)}
                className={`mt-4 w-full py-2 rounded-lg text-white font-semibold transition duration-300
                ${addedId === p.id
                  ? "bg-green-600 scale-105"
                  : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {addedId === p.id ? "✔ Added!" : "Add to Cart"}
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* 🔔 FLOATING TOAST */}
      {addedId && (
        <div className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
          Added to cart 🛒
        </div>
      )}

    </div>
  );
}