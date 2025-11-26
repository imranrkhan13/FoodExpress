import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRestaurantById } from "../api/restaurantApi";
import { Restaurant } from "../types/restaurant";
import { ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const RestaurantPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRestaurant();
  }, [id]);

  const loadRestaurant = async () => {
    try {
      const data = await getRestaurantById(id!);
      setRestaurant(data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-white py-20">Loading...</div>;
  }

  if (!restaurant) {
    return (
      <div className="text-center text-red-400 py-20">Restaurant not found.</div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 🔙 Back */}
      <Link
        to="/"
        className="absolute top-6 left-6 bg-white/10 p-3 rounded-full hover:bg-white/20"
      >
        <ArrowLeft className="w-6 h-6" />
      </Link>

      {/* Banner */}
      <div className="w-full h-[350px] relative">
        <img
          src={restaurant.images[0]}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      </div>

      {/* Main Card */}
      <div className="max-w-4xl mx-auto -mt-20 bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xl">
        <h1 className="text-4xl font-bold">{restaurant.name}</h1>
        <p className="text-gray-300">{restaurant.cuisines.join(" • ")}</p>

        <div className="mt-4 space-y-2 text-lg text-gray-200">
          <p>⭐ {restaurant.rating}</p>
          <p>💰 ₹{restaurant.cost_for_two} for two</p>
          <p>📍 {restaurant.address}</p>
          <p>
            {restaurant.is_open ? (
              <span className="text-green-400">🟢 Open Now</span>
            ) : (
              <span className="text-red-400">🔴 Closed</span>
            )}
          </p>
        </div>

        {/* ⭐ MENU SECTION */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Menu</h2>

          {restaurant.menu?.map((cat, i) => (
            <div key={i} className="mb-10">
              <h3 className="text-2xl font-semibold mb-4">{cat.category}</h3>

              {cat.items.map((item, j) => (
                <div key={j} className="bg-white/5 p-4 rounded-xl mb-3 flex gap-4 justify-between">
                  <div className="flex gap-4">
                    {item.image && (
                      <img src={item.image} className="w-20 h-20 rounded object-cover" />
                    )}

                    <div>
                      <p className="text-xl font-semibold">{item.name}</p>
                      <p className="text-gray-300">{item.description}</p>
                      <p className="text-orange-400 font-bold">₹{item.price}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(item);
                      const el = document.getElementById("bubble-" + item.name);
                      if (el) {
                        el.classList.remove("opacity-0");
                        el.classList.add("opacity-100");
                        setTimeout(() => el.classList.add("opacity-0"), 700);
                      }
                    }}
                    className="relative bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold 
                    px-6 py-2 rounded-full shadow-lg hover:shadow-orange-500/40 
                    hover:-translate-y-0.5 active:scale-95 transition-all"
                  >
                    + Add
                    <span
                      id={"bubble-" + item.name}
                      className="absolute -top-3 -right-3 bg-green-500 text-white text-xs px-2 py-1 
               rounded-full opacity-0 transition-opacity duration-300"
                    >
                      Added!
                    </span>
                  </button>


                </div>
              ))}

            </div>
          ))}
        </div>
      </div>

      <div className="h-20"></div>
    </div>
  );
};

export default RestaurantPage;
