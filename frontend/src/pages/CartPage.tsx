import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();

  const { cart, removeFromCart, clearCart, increaseQty, decreaseQty } = useCart();

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-400 text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-5">

          {cart.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10"
            >
              {/* IMAGE + INFO */}
              <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10 gap-4">

                {item.image && (
                  <img src={item.image} className="w-20 h-20 rounded-lg object-cover" />
                )}

                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-orange-400 font-bold">₹{item.price}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-3 py-1 bg-white/10 rounded-lg text-xl font-bold"
                  >
                    -
                  </button>

                  <span className="font-bold">{item.qty}</span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-3 py-1 bg-white/10 rounded-lg text-xl font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-bold"
                >
                  Remove
                </button>

              </div>



            </div>
          ))}

          {/* TOTAL */}
          <div className="flex justify-between items-center text-2xl font-bold mt-6 px-2">
            <span>Total:</span>
            <span className="text-green-400">₹{total}</span>
          </div>
          {/* Checkout Button */}
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <span>Proceed to Checkout</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>

          {/* CLEAR CART */}
          <button
            onClick={clearCart}
            className="w-full bg-gray-100 hover:bg-red-50 text-red-600 hover:text-red-700 font-semibold py-3 px-6 rounded-xl border-2 border-gray-200 hover:border-red-300 transition-all duration-200"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};
  
export default CartPage;