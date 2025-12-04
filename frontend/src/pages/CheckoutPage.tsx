import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingBag, MapPin, Phone, User, CreditCard, Wallet, Banknote, Shield, Sparkles, ArrowRight, AlertCircle } from "lucide-react";

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

  const subtotal = totalPrice;
  const deliveryFee = subtotal >= 500 ? 0 : 40; // Free delivery above ₹500
  const tax = Math.round(subtotal * 0.05);
  const finalTotal = subtotal + deliveryFee + tax;

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
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 blur-[120px] animate-pulse rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="inline-block p-8 bg-gray-900/50 rounded-3xl border border-gray-800 backdrop-blur-sm">
            <ShoppingBag className="w-24 h-24 text-gray-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Your cart is empty
            </h1>
            <p className="text-gray-400 mb-8">Add some items to proceed with checkout</p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-bold hover:shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300"
            >
              Browse Restaurants
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white relative overflow-hidden pb-20">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent"></div>
        
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 blur-[120px] animate-pulse rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-red-500/10 blur-[120px] animate-pulse delay-700 rounded-full"></div>
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg shadow-orange-500/30">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                Checkout
              </h1>
              <p className="text-gray-400 mt-1">Complete your order in just a few steps</p>
            </div>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-orange-500/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Delivery Details</h2>
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-400 transition" />
                  <input
                    type="text"
                    placeholder="Full Name*"
                    value={details.name}
                    onChange={(e) => setDetails({ ...details, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-800/50 border border-gray-700 text-white outline-none placeholder-gray-400 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition"
                  />
                </div>

                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-400 transition" />
                  <input
                    type="tel"
                    placeholder="Phone Number*"
                    value={details.phone}
                    onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-800/50 border border-gray-700 text-white outline-none placeholder-gray-400 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition"
                  />
                </div>

                <div className="relative group">
                  <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-orange-400 transition" />
                  <textarea
                    placeholder="Full Delivery Address*"
                    value={details.address}
                    onChange={(e) => setDetails({ ...details, address: e.target.value })}
                    rows={3}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-800/50 border border-gray-700 text-white outline-none placeholder-gray-400 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition resize-none"
                  />
                </div>

                <textarea
                  placeholder="Delivery Instructions (Optional) - e.g., Ring the doorbell, Leave at door"
                  value={details.instruction}
                  onChange={(e) => setDetails({ ...details, instruction: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-4 rounded-xl bg-gray-800/50 border border-gray-700 text-white outline-none placeholder-gray-400 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition resize-none"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-orange-500/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Payment Method</h2>
              </div>

              <div className="space-y-3">
                <label 
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    details.payment === "cod" 
                      ? "bg-orange-500/10 border-orange-500/50" 
                      : "bg-gray-800/30 border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <input
                    type="radio"
                    checked={details.payment === "cod"}
                    onChange={() => setDetails({ ...details, payment: "cod" })}
                    className="w-5 h-5 text-orange-500 focus:ring-orange-500"
                  />
                  <Banknote className="w-5 h-5 text-orange-400" />
                  <div className="flex-1">
                    <span className="font-semibold">Cash on Delivery</span>
                    <p className="text-sm text-gray-400">Pay with cash when your order arrives</p>
                  </div>
                </label>

                <label 
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    details.payment === "upi" 
                      ? "bg-orange-500/10 border-orange-500/50" 
                      : "bg-gray-800/30 border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <input
                    type="radio"
                    checked={details.payment === "upi"}
                    onChange={() => setDetails({ ...details, payment: "upi" })}
                    className="w-5 h-5 text-orange-500 focus:ring-orange-500"
                  />
                  <Wallet className="w-5 h-5 text-orange-400" />
                  <div className="flex-1">
                    <span className="font-semibold">UPI Payment</span>
                    <p className="text-sm text-gray-400">Google Pay, PhonePe, Paytm & more</p>
                  </div>
                </label>

                <label 
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    details.payment === "card" 
                      ? "bg-orange-500/10 border-orange-500/50" 
                      : "bg-gray-800/30 border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <input
                    type="radio"
                    checked={details.payment === "card"}
                    onChange={() => setDetails({ ...details, payment: "card" })}
                    className="w-5 h-5 text-orange-500 focus:ring-orange-500"
                  />
                  <CreditCard className="w-5 h-5 text-orange-400" />
                  <div className="flex-1">
                    <span className="font-semibold">Debit/Credit Card</span>
                    <p className="text-sm text-gray-400">Visa, Mastercard, RuPay accepted</p>
                  </div>
                </label>
              </div>

              <div className="flex items-center gap-2 mt-4 px-4 py-3 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <Shield className="w-5 h-5 text-blue-400" />
                <p className="text-sm text-blue-400 font-medium">
                  Your payment information is secure and encrypted
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
                  <ShoppingBag className="w-6 h-6 text-orange-400" />
                  <h2 className="text-2xl font-bold">Order Summary</h2>
                </div>

                {/* Cart Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-start gap-3 text-sm">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-400">Qty: {item.qty}</p>
                      </div>
                      <span className="font-semibold text-orange-400">₹{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal ({cart.reduce((sum, i) => sum + i.qty, 0)} items)</span>
                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-gray-300">
                    <span>Delivery Fee</span>
                    <span className={`font-semibold ${deliveryFee === 0 ? 'text-green-400 line-through' : ''}`}>
                      {deliveryFee === 0 ? (
                        <span className="flex items-center gap-2">
                          <span className="line-through text-gray-500">₹40</span>
                          <span className="text-green-400 font-bold">FREE</span>
                        </span>
                      ) : (
                        `₹${deliveryFee.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-300">
                    <span>Tax (5%)</span>
                    <span className="font-semibold">₹{tax.toFixed(2)}</span>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

                  <div className="flex justify-between items-center text-2xl font-bold pt-2">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                      ₹{finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Free Delivery Badge */}
                {subtotal >= 500 ? (
                  <div className="flex items-center gap-2 px-4 py-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                    <Sparkles className="w-5 h-5 text-green-400 animate-pulse" />
                    <p className="text-sm text-green-400 font-medium">
                      Yay! You saved ₹40 on delivery
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-3 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-orange-400" />
                    <p className="text-sm text-orange-400 font-medium">
                      Add ₹{(500 - subtotal).toFixed(2)} more for free delivery
                    </p>
                  </div>
                )}

                {/* Place Order Button */}
                <button
                  onClick={placeOrder}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 via-red-600 to-pink-600 hover:from-orange-600 hover:via-red-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/60 transform hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="relative z-10">Placing your order...</span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">Place Order • ₹{finalTotal.toFixed(2)}</span>
                      <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;