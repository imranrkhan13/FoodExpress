import { useLocation, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const OrderSuccessPage = () => {
  const location = useLocation();
  const { orderId, name } = location.state || {};

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      
      {/* Success Icon */}
      <div className="flex flex-col items-center">
        <CheckCircle className="w-24 h-24 text-green-500 animate-bounce" />

        <h1 className="text-4xl font-bold mt-6">Order Placed!</h1>

        <p className="text-gray-300 mt-2 text-lg">
          Thank you{name ? `, ${name}` : ""}! Your food is on its way 🚀
        </p>
      </div>

      {/* Order Card */}
      <div className="
        mt-10 
        bg-white/5 
        border border-white/10 
        p-6 
        rounded-2xl 
        max-w-lg 
        w-full 
        backdrop-blur-xl
        shadow-lg shadow-green-500/20
      ">
        <h2 className="text-2xl font-semibold mb-3">Order Details</h2>

        <p className="text-gray-300 text-lg">
          <span className="font-bold text-white">Order ID:</span> {orderId || "N/A"}
        </p>

        <p className="text-gray-300 mt-1">
          Sit tight! Your delicious food is being prepared 😋
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-10 flex gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-bold shadow-md hover:scale-105 transition"
        >
          Go Home
        </Link>

        <Link
          to="/"
          className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-semibold hover:bg-white/20 transition"
        >
          Track Order (Coming Soon)
        </Link>
      </div>

    </div>
  );
};

export default OrderSuccessPage;
