import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRestaurantById } from "../api/restaurantApi";
import { Restaurant } from "../types/restaurant";
import { ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";

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

        {/*  MENU SECTION */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Menu</h2>

          {restaurant.menu?.map((cat, i) => (
            <div key={i} className="mb-10">
              <h3 className="text-2xl font-semibold mb-4">{cat.category}</h3>

              {cat.items.map((item, j) => (
                <div className="bg-white/5 p-4 rounded-xl mb-3 flex gap-4 justify-between relative">
                  <div className="flex gap-4 flex-1">
                    {item.image && (
                      <img src={item.image} className="w-24 h-24 rounded-lg object-cover shadow-lg" />
                    )}

                    <div className="flex-1">
                      <p className="text-xl font-semibold">{item.name}</p>
                      <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                      <p className="text-orange-400 font-bold text-lg mt-2">₹{item.price}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(item);
                      const el = document.getElementById("bubble-" + item.name);
                      if (el) {
                        el.style.display = "flex";
                        setTimeout(() => {
                          el.style.opacity = "1";
                          el.style.transform = "scale(1)";
                        }, 10);
                        setTimeout(() => {
                          el.style.opacity = "0";
                          el.style.transform = "scale(0.8)";
                        }, 1500);
                        setTimeout(() => {
                          el.style.display = "none";
                        }, 1800);
                      }
                    }}
                    className="flex-shrink-0 bg-gradient-to-br from-orange-500 to-red-600 
                              text-white font-bold px-6 py-3 rounded-xl h-fit
                              hover:shadow-2xl hover:shadow-orange-500/40 hover:scale-105
                              active:scale-95 transition-all duration-300
                              border-2 border-orange-400/30
                              group"
                  >
                    {/* Animated shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-xl"></div>

                    <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                      <svg
                        className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                      ADD
                    </span>
                  </button>

                  {/* Success notification - positioned at top right of the entire card */}
                  <div
                    id={"bubble-" + item.name}
                    className="absolute -top-3 -right-3
               bg-gradient-to-br from-green-400 to-green-600
               text-white text-sm font-bold
               px-4 py-2 rounded-full
               shadow-2xl shadow-green-500/60
               items-center gap-2 z-50 whitespace-nowrap"
                    style={{
                      display: 'none',
                      opacity: '0',
                      transform: 'scale(0.8)',
                      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    ADDED!
                  </div>
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
