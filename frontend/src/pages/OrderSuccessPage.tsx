import { useLocation, Link } from "react-router-dom";
import { CheckCircle, Home, Package, Clock, Sparkles, Flame, ChefHat, Truck } from "lucide-react";

const OrderSuccessPage = () => {
  const location = useLocation();
  const { orderId, name } = location.state || { orderId: "FE" + Math.random().toString(36).substr(2, 9).toUpperCase(), name: "Foodie" };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white relative overflow-hidden">
      
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/30 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent"></div>
        
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 blur-[120px] animate-pulse rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-orange-500/15 blur-[120px] animate-pulse delay-700 rounded-full"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      {/* Confetti effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-confetti"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-10%',
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {['🎉', '✨', '🎊', '⭐', '🔥'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-16">
        
        {/* Success Icon with animation */}
        <div className="relative mb-8">
          {/* Glowing ring effect */}
          <div className="absolute inset-0 -z-10">
            <div className="w-32 h-32 rounded-full bg-green-500/30 blur-2xl animate-pulse"></div>
          </div>
          
          {/* Success checkmark */}
          <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-full shadow-2xl shadow-green-500/50 animate-scaleIn">
            <CheckCircle className="w-20 h-20 text-white" strokeWidth={3} />
          </div>
          
          {/* Sparkles */}
          <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-spin-slow" />
          <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-green-400 animate-bounce" />
        </div>

        {/* Success Message */}
        <div className="text-center mb-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 backdrop-blur-sm mb-4">
            <Flame className="w-4 h-4 text-green-400 animate-pulse" />
            <span className="text-sm font-medium text-green-300">Order Confirmed</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-4">
            <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent drop-shadow-2xl">
              Order Placed!
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-xl">
            Thank you{name ? `, ${name}` : ""}! 
            <span className="text-green-400 font-semibold"> Your delicious meal is being prepared with love 🍽️</span>
          </p>
        </div>

        {/* Order Details Card */}
        <div className="w-full max-w-2xl mb-10">
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
            
            <div className="relative bg-gray-900/80 backdrop-blur-xl border border-green-500/30 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Order Details
                </h2>
              </div>

              {/* Order ID */}
              <div className="bg-gray-800/50 rounded-2xl p-6 mb-6 border border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Order ID</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  #{orderId}
                </p>
              </div>

              {/* Status Steps */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 relative">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="font-bold text-white mb-1">Order Confirmed</h3>
                    <p className="text-gray-400 text-sm">We've received your order</p>
                  </div>
                  <span className="text-green-400 text-sm font-semibold">✓ Done</span>
                </div>

                <div className="flex items-start gap-4 relative ml-6">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-orange-500"></div>
                </div>

                <div className="flex items-start gap-4 relative">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center animate-pulse">
                    <ChefHat className="w-6 h-6 text-orange-400" />
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="font-bold text-white mb-1">Being Prepared</h3>
                    <p className="text-gray-400 text-sm">Our chefs are cooking your meal</p>
                  </div>
                  <span className="text-orange-400 text-sm font-semibold animate-pulse">● In Progress</span>
                </div>

                <div className="flex items-start gap-4 relative ml-6">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500/50 to-gray-700"></div>
                </div>

                <div className="flex items-start gap-4 relative opacity-50">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-700/50 border-2 border-gray-600 flex items-center justify-center">
                    <Truck className="w-6 h-6 text-gray-500" />
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="font-bold text-gray-500 mb-1">Out for Delivery</h3>
                    <p className="text-gray-600 text-sm">Your order will be on its way soon</p>
                  </div>
                </div>
              </div>

              {/* Estimated Time */}
              <div className="mt-8 flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl">
                <Clock className="w-5 h-5 text-orange-400" />
                <span className="text-white font-semibold">Estimated Delivery:</span>
                <span className="text-orange-400 font-bold text-lg">30-40 minutes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Link
            to="/"
            className="flex-1 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition"></div>
            <button className="relative w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-bold text-white shadow-lg hover:shadow-orange-500/50 transform hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2">
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
          </Link>

          <button className="flex-1 py-4 px-6 bg-gray-800/80 backdrop-blur-sm border border-gray-700 hover:border-green-500/50 rounded-xl text-white font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 group">
            <Package className="w-5 h-5 group-hover:text-green-400 transition" />
            <span>Track Order</span>
          </button>
        </div>

      </div>

      <style>{`
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .animate-scaleIn {
          animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-confetti {
          animation: confetti linear infinite;
          font-size: 1.5rem;
        }

        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </div>
  );
};

export default OrderSuccessPage;
