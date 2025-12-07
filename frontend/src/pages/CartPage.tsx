import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Package, Sparkles } from "lucide-react";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, increaseQty, decreaseQty } = useCart();

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const deliveryFee = subtotal >= 500 ? 0 : (cart.length > 0 ? 40 : 0); // Free delivery above ₹500
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent"></div>
        
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 blur-[120px] animate-pulse rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-red-500/10 blur-[120px] animate-pulse delay-700 rounded-full"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg shadow-orange-500/30">
              <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                Your Cart
              </h1>
              <p className="text-gray-400 mt-1 text-sm sm:text-base">
                {cart.length === 0 ? "No items yet" : `${cart.length} ${cart.length === 1 ? 'item' : 'items'} in your cart`}
              </p>
            </div>
          </div>
          <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></div>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-16 sm:py-20">
            <div className="inline-block p-6 sm:p-8 bg-gray-900/50 rounded-3xl border border-gray-800 backdrop-blur-sm">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full"></div>
                <ShoppingCart className="w-20 h-20 sm:w-24 sm:h-24 text-gray-600 mx-auto relative" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3">Your cart is empty</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8 max-w-md mx-auto">
                Looks like you haven't added anything to your cart yet. 
                Start exploring delicious meals!
              </p>
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-bold hover:shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
              >
                <span>Browse Restaurants</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, idx) => (
                <div
                  key={item.id}
                  className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 sm:p-6 hover:border-orange-500/50 transition-all duration-300"
                  style={{
                    animation: `fadeInUp 0.4s ease-out ${idx * 0.1}s both`
                  }}
                >
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    {/* Image */}
                    {item.image && (
                      <div className="relative flex-shrink-0 w-full sm:w-28 h-28 mx-auto sm:mx-0">
                        <div className="w-full h-full rounded-xl overflow-hidden bg-gray-800">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                          />
                        </div>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                    )}

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold mb-1 group-hover:text-orange-400 transition line-clamp-1">
                            {item.name}
                          </h3>
                          <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            ₹{item.price}
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 rounded-lg text-red-400 hover:text-red-300 transition-all duration-300 group/btn flex-shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-110 transition-transform" />
                        </button>
                      </div>

                      {/* Quantity Controls & Item Total */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <span className="text-xs sm:text-sm text-gray-400 font-medium">Quantity:</span>
                          <div className="flex items-center gap-2 sm:gap-3 bg-gray-800/50 border border-gray-700 rounded-xl px-2 py-1">
                            <button
                              onClick={() => decreaseQty(item.id)}
                              className="p-1.5 sm:p-2 hover:bg-orange-500/20 rounded-lg text-orange-400 hover:text-orange-300 transition-all duration-300 active:scale-95"
                            >
                              <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>

                            <span className="font-bold text-base sm:text-lg min-w-[2rem] text-center">
                              {item.qty}
                            </span>

                            <button
                              onClick={() => increaseQty(item.id)}
                              className="p-1.5 sm:p-2 hover:bg-orange-500/20 rounded-lg text-orange-400 hover:text-orange-300 transition-all duration-300 active:scale-95"
                            >
                              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="sm:ml-auto text-left sm:text-right">
                          <p className="text-xs sm:text-sm text-gray-400">Item Total</p>
                          <p className="text-lg sm:text-xl font-bold text-green-400">
                            ₹{(item.price * item.qty).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              <button
                onClick={clearCart}
                className="w-full mt-4 sm:mt-6 py-3 sm:py-4 bg-gray-800/50 hover:bg-red-500/10 border-2 border-gray-700 hover:border-red-500/50 text-gray-300 hover:text-red-400 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group text-sm sm:text-base"
              >
                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                <span>Clear Entire Cart</span>
              </button>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-6">
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 sm:p-6 space-y-5 sm:space-y-6">
                  {/* Header */}
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
                    <Package className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                    <h2 className="text-xl sm:text-2xl font-bold">Order Summary</h2>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between text-gray-300 text-sm sm:text-base">
                      <span>Subtotal ({cart.reduce((sum, i) => sum + i.qty, 0)} items)</span>
                      <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-gray-300 text-sm sm:text-base">
                      <span>Delivery Fee</span>
                      <span className={`font-semibold ${deliveryFee === 0 && subtotal >= 500 ? 'text-green-400' : ''}`}>
                        {deliveryFee === 0 && subtotal >= 500 ? (
                          <span className="flex items-center gap-2">
                            <span className="line-through text-gray-500">₹40</span>
                            <span className="text-green-400 font-bold">FREE</span>
                          </span>
                        ) : (
                          `₹${deliveryFee.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-gray-300 text-sm sm:text-base">
                      <span>Tax (5%)</span>
                      <span className="font-semibold">₹{tax.toFixed(2)}</span>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

                    {/* Total */}
                    <div className="flex justify-between items-center text-xl sm:text-2xl font-bold pt-2">
                      <span>Total</span>
                      <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Conditional Delivery Badge */}
                  {subtotal >= 500 ? (
                    <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 animate-pulse flex-shrink-0" />
                      <p className="text-xs sm:text-sm text-green-400 font-medium">
                        Yay! You saved ₹40 on delivery
                      </p>
                    </div>
                  ) : subtotal > 0 ? (
                    <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 flex-shrink-0" />
                      <p className="text-xs sm:text-sm text-orange-400 font-medium">
                        Add ₹{(500 - subtotal).toFixed(2)} more for free delivery
                      </p>
                    </div>
                  ) : null}

                  {/* Checkout Button */}
                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full bg-gradient-to-r from-orange-500 via-red-600 to-pink-600 hover:from-orange-600 hover:via-red-700 hover:to-pink-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/60 transform hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden text-sm sm:text-base"
                  >
                    <span className="relative z-10">Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  {/* Continue Shopping */}
                  <button
                    onClick={() => navigate("/")}
                    className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-orange-500/50 text-gray-300 hover:text-white font-semibold rounded-xl transition-all duration-300 text-sm sm:text-base"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CartPage;