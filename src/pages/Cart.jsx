import { useSelector, useDispatch } from "react-redux";
import { increaseQty, decreaseQty, deleteItem } from "../redux/CartSlice";
import { useNavigate } from "react-router-dom";

export default function Cart() {

  const items = useSelector(s => s.cart.items);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const total = items.reduce((a, b) => a + b.price * b.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
        🛒 Your Cart
      </h1>

      <div className="max-w-4xl mx-auto">

        {/* EMPTY STATE */}
        {items.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            <h2 className="text-xl">Cart is empty 😔</h2>
          </div>
        )}

        {/* CART ITEMS */}
        {items.map(i => (
          <div
            key={i.id}
            className="bg-white p-4 mb-4 rounded-xl shadow flex items-center gap-4"
          >

            {/* IMAGE */}
            <img
              src={i.img}
              className="w-20 h-20 object-cover rounded-lg"
            />

            {/* DETAILS */}
            <div className="flex-1">

              <h3 className="font-bold text-lg">{i.name}</h3>

              <p className="text-green-600 font-semibold">
                ${i.price}
              </p>

              {/* QUANTITY */}
              <div className="flex items-center gap-3 mt-2">

                <button
                  onClick={() => dispatch(decreaseQty(i.id))}
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  ➖
                </button>

                <span className="font-bold">{i.quantity}</span>

                <button
                  onClick={() => dispatch(increaseQty(i.id))}
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  ➕
                </button>

              </div>

            </div>

            {/* REMOVE */}
            <button
              onClick={() => dispatch(deleteItem(i.id))}
              className="text-red-500 font-bold"
            >
              ❌
            </button>

          </div>
        ))}

        {/* TOTAL + CHECKOUT */}
        {items.length > 0 && (
          <div className="bg-white p-5 rounded-xl shadow mt-6">

            <div className="flex justify-between text-xl font-bold mb-4">
              <span>Total:</span>
              <span className="text-green-600">
                ${total.toFixed(2)}
              </span>
            </div>

            {/* 🔥 CHECKOUT BUTTON FIX */}
            <button
              onClick={() => nav("/checkout")}
              className="bg-green-600 text-white px-4 py-2 mt-4 rounded w-full hover:bg-green-700 transition"
            >
              Checkout
            </button>

          </div>
        )}

      </div>
    </div>
  );
}