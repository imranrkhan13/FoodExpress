import { Flame } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  // Correct cart count (sum of quantities)
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <header
      className="
        sticky top-0 z-50
        backdrop-blur-lg
        bg-black/40
        border-b border-orange-500/20
        px-4 py-3    /* mobile fix */
      "
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="relative">
            <Flame className="w-8 h-8 text-orange-500 fill-orange-500" />
            <div
              className="
                absolute inset-0
                bg-orange-500/40
                blur-xl
                rounded-full
                -z-10
              "
            ></div>
          </div>

          <h1
            className="
              text-2xl md:text-3xl font-extrabold
              bg-gradient-to-r
              from-orange-400
              via-red-500
              to-orange-600
              bg-clip-text
              text-transparent
            "
          >
            FoodExpress
          </h1>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">

          {/* Login */}
          <button
            onClick={() => navigate("/login")}
            className="
              hidden md:block
              px-4 py-2
              rounded-full
              font-semibold text-sm
              border border-orange-500/50
              bg-orange-500/20
              hover:bg-orange-500/30
              duration-300
            "
          >
            Login
          </button>

          {/* Order Now */}
          <button
            onClick={() => navigate("/cart")}
            className="
              px-4 py-2
              rounded-full
              font-semibold text-sm
              bg-gradient-to-r
              from-orange-500
              to-red-600
              shadow-md shadow-orange-500/30
              hover:shadow-orange-500/60
              hover:-translate-y-1
              duration-300
            "
          >
            Order Now
          </button>

          {/* Cart Icon */}
          <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                {cart.length}
              </span>
            )}
          </div>


        </div>
      </div>
    </header>
  );
};

export default Navbar;
