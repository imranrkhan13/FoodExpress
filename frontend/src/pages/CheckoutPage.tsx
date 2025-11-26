import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";

const CheckoutPage: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    name: "",
    phone: "",
    address: "",
    instruction: "",
    payment: "cod",
  });

  const [loading, setLoading] = useState(false);

  const deliveryFee = 30;
  const tax = Math.round(totalPrice * 0.05);
  const finalTotal = totalPrice + deliveryFee + tax;

  const placeOrder = async () => {
    if (!details.name || !details.phone || !details.address) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const orderId = `FE-${Date.now().toString().slice(-6)}`;

      clearCart();

      navigate("/order-success", {
        state: {
          orderId,
          name: details.name,
        },
      });

      setLoading(false);
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <p className="text-gray-400">Your cart is empty.</p>
        <Link to="/" className="text-orange-400 mt-4 block">Go back</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-28">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="max-w-3xl mx-auto space-y-8">

        {/* Delivery Information */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name*"
              value={details.name}
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 text-white outline-none placeholder-gray-400"
            />

            <input
              type="text"
              placeholder="Phone Number*"
              value={details.phone}
              onChange={(e) => setDetails({ ...details, phone: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 text-white outline-none"
            />

            <textarea
              placeholder="Full Address*"
              value={details.address}
              onChange={(e) => setDetails({ ...details, address: e.target.value })}
              rows={3}
              className="w-full p-3 rounded-lg bg-white/10 text-white outline-none"
            />

            <textarea
              placeholder="Delivery Instructions (Optional)"
              value={details.instruction}
              onChange={(e) => setDetails({ ...details, instruction: e.target.value })}
              rows={2}
              className="w-full p-3 rounded-lg bg-white/10 text-white outline-none"
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                checked={details.payment === "cod"}
                onChange={() => setDetails({ ...details, payment: "cod" })}
              />
              <span>Cash on Delivery</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                checked={details.payment === "upi"}
                onChange={() => setDetails({ ...details, payment: "upi" })}
              />
              <span>UPI (Google Pay / Paytm)</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                checked={details.payment === "card"}
                onChange={() => setDetails({ ...details, payment: "card" })}
              />
              <span>Debit/Credit Card</span>
            </label>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} × {item.qty}</span>
                <span className="font-semibold">₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Tax (5%)</span>
              <span>₹{tax}</span>
            </div>

            <div className="flex justify-between text-2xl font-bold mt-3">
              <span>Total</span>
              <span>₹{finalTotal}</span>
            </div>
          </div>

          <button
            onClick={placeOrder}
            className="w-full mt-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 font-bold"
            disabled={loading}
          >
            {loading ? "Placing your order..." : `Place Order • ₹${finalTotal}`}
          </button>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
