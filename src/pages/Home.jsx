import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen">

      {/* HERO SECTION */}
      <div className="bg-green-100 flex flex-col md:flex-row items-center justify-between px-10 py-20">

        <div className="max-w-xl">
          <h1 className="text-5xl font-bold text-green-800">
            Bring Nature Home 🌿
          </h1>

          <p className="mt-4 text-gray-600">
            Premium indoor & outdoor plants delivered fresh to your doorstep.
            Clean air. Fresh life. Modern living.
          </p>

          <button
            onClick={() => nav("/plants")}
            className="mt-6 bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-800"
          >
            Shop Plants
          </button>
        </div>

        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
          className="w-96 rounded-xl shadow-lg mt-10 md:mt-0"
        />

      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-6 p-10">

        <div className="bg-white p-6 rounded-xl shadow text-center">
          🚚 Free Delivery
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          🌱 Fresh Plants
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          💚 Eco Friendly
        </div>

      </div>

    </div>
  );
}