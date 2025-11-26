import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRestaurantById } from "../api/restaurantApi";
import { Restaurant } from "../types/restaurant";
import { ArrowLeft } from "lucide-react";

const RestaurantPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) loadRestaurant();
  }, [id]);

  const loadRestaurant = async () => {
    try {
      setLoading(true);
      const res = await getRestaurantById(id!);
      setRestaurant(res.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center py-20 text-2xl">
        Loading...
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="text-white text-center py-20 text-2xl">
        Restaurant not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      <Link
        to="/"
        className="absolute top-6 left-6 bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition"
      >
        <ArrowLeft className="w-6 h-6" />
      </Link>

      <div className="w-full h-[350px] relative">
        <img
          src={restaurant.images[0]}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      </div>

      <div className="max-w-4xl mx-auto -mt-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-2">{restaurant.name}</h1>

        <p className="text-gray-300 text-lg mb-4">
          {restaurant.cuisines.join(" • ")}
        </p>

        <div className="flex flex-col gap-3 text-lg text-gray-200">
          <p>⭐ <span className="font-bold">{restaurant.rating}</span></p>
          <p>💰 ₹{restaurant.cost_for_two} for two</p>
          <p>📍 {restaurant.address}</p>

          {restaurant.is_open ? (
            <span className="text-green-400 text-lg">🟢 Open Now</span>
          ) : (
            <span className="text-red-400 text-lg">🔴 Closed</span>
          )}
        </div>

        <button className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-lg shadow-lg hover:shadow-orange-500/40 transition">
          Order Now
        </button>
      </div>

      <div className="h-20"></div>
    </div>
  );
};

export default RestaurantPage;
