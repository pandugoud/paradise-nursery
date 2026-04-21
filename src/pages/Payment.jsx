export default function Payment() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-8 shadow-lg rounded-xl w-96 text-center">

        <h2 className="text-2xl font-bold mb-2">💳 Payment</h2>

        <p className="text-gray-500 mb-6">
          Demo Stripe Checkout
        </p>

        <div className="border p-3 rounded mb-3 text-left">
          <p className="text-sm text-gray-500">Card Number</p>
          <input className="w-full outline-none" placeholder="1234 5678 9012" />
        </div>

        <div className="border p-3 rounded mb-3 text-left">
          <p className="text-sm text-gray-500">Expiry</p>
          <input className="w-full outline-none" placeholder="MM/YY" />
        </div>

        <div className="border p-3 rounded mb-4 text-left">
          <p className="text-sm text-gray-500">CVV</p>
          <input className="w-full outline-none" placeholder="123" />
        </div>

        <button
          onClick={() => alert("Payment Successful ✅")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
        >
          Pay Now
        </button>

      </div>
    </div>
  );
}