import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {

  const cartCount = useSelector(s =>
    s.cart.items.reduce((a, b) => a + b.quantity, 0)
  );

  return (
    <nav className="bg-black text-white px-6 py-3 flex justify-between items-center sticky top-0 z-50">

      <Link to="/" className="text-xl font-bold text-green-400">
        🌿 Paradise Nursery
      </Link>

      <div className="flex gap-6 items-center">

        <Link to="/plants">Plants</Link>

        <Link to="/cart" className="bg-green-500 px-3 py-1 rounded-full">
          Cart ({cartCount})
        </Link>

      </div>

    </nav>
  );
}