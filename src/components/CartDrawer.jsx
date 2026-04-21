import { useSelector, useDispatch } from "react-redux";
import { increaseQty, decreaseQty, deleteItem } from "../redux/CartSlice";
import { useNavigate } from "react-router-dom";

export default function CartDrawer({ open, setOpen }) {

  const items = useSelector(s => s.cart.items);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const total = items.reduce((a, b) => a + b.price * b.quantity, 0);

  return (
    <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300
      ${open ? "translate-x-0" : "translate-x-full"}`}>

      {/* HEADER */}
      <div className="p-4 flex justify-between border-b">
        <h2 className="font-bold">🛒 Your Cart</h2>
        <button onClick={() => setOpen(false)}>✖</button>
      </div>

      {/* ITEMS */}
      <div className="p-3 overflow-y-auto h-[75vh] space-y-3">

        {items.length === 0 && (
          <p className="text-center text-gray-400">Cart is empty</p>
        )}

        {items.map(i => (
          <div key={i.id} className="flex gap-2 border p-2 rounded">

            <img src={i.img} className="w-14 h-14 object-cover rounded" />

            <div className="flex-1">

              <p className="text-sm font-semibold">{i.name}</p>
              <p className="text-green-600">${i.price}</p>

              <div className="flex items-center gap-2 mt-1">

                <button onClick={() => dispatch(decreaseQty(i.id))}>-</button>
                <span>{i.quantity}</span>
                <button onClick={() => dispatch(increaseQty(i.id))}>+</button>

              </div>

            </div>

            <button
              onClick={() => dispatch(deleteItem(i.id))}
              className="text-red-500"
            >
              ❌
            </button>

          </div>
        ))}

      </div>

      {/* FOOTER */}
      <div className="p-4 border-t">

        <h3 className="font-bold">Total: ${total}</h3>

        <button
          onClick={() => {
            setOpen(false);
            nav("/payment");
          }}
          className="bg-green-600 text-white w-full py-2 mt-3 rounded"
        >
          Checkout
        </button>

      </div>

    </div>
  );
}