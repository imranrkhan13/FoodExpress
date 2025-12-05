import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRestaurantById } from "../api/restaurantApi";
import { Restaurant } from "../types/restaurant";
import { ArrowLeft, Star, MapPin, Clock, Phone, DollarSign, ChefHat, Sparkles, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";

const RestaurantPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (id) loadRestaurant();
  }, [id]);

  const loadRestaurant = async () => {
    try {
      setLoading(true);
      const data = await getRestaurantById(id!);
      setRestaurant(data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 blur-[120px] animate-pulse rounded-full"></div>
        </div>

        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl text-gray-400">Loading restaurant details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 blur-[120px] animate-pulse rounded-full"></div>
        </div>

        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center p-8 bg-gray-900/50 rounded-3xl border border-gray-800 backdrop-blur-sm">
            <ChefHat className="w-24 h-24 text-gray-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Restaurant not found
            </h2>
            <p className="text-gray-400 mb-8">The restaurant you're looking for doesn't exist</p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-bold hover:shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent"></div>
        
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 blur-[120px] animate-pulse rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-red-500/10 blur-[120px] animate-pulse delay-700 rounded-full"></div>
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      {/* Back Button */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-50 bg-gray-900/80 hover:bg-gray-800 backdrop-blur-xl border border-gray-700 hover:border-orange-500/50 p-3 rounded-full transition-all duration-300 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </Link>

      {/* Hero Image Section */}
      <div className="relative w-full h-[450px] overflow-hidden">
        <img
          src={restaurant.images[activeImage]}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

        {/* Image Navigation Dots */}
        {restaurant.images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {restaurant.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeImage === idx 
                    ? "bg-orange-500 w-8" 
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-6 right-6">
          <span
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white backdrop-blur-xl shadow-xl border-2 ${
              restaurant.is_open
                ? "bg-green-500/90 border-green-400 shadow-green-500/50"
                : "bg-red-500/90 border-red-400 shadow-red-500/50"
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${restaurant.is_open ? "bg-white animate-pulse" : "bg-white"}`}></span>
            {restaurant.is_open ? "Open Now" : "Closed"}
          </span>
        </div>
      </div>

      {/* Restaurant Info Card */}
      <div className="max-w-5xl mx-auto px-6 -mt-32 relative z-10 pb-20">
        <div 
          className="bg-gray-900/70 backdrop-blur-2xl border border-gray-800 rounded-3xl p-8 md:p-10 shadow-2xl hover:border-orange-500/30 transition-all duration-500"
          style={{ animation: "fadeInUp 0.6s ease-out" }}
        >
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                  {restaurant.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-300 text-lg mb-4">
                  <ChefHat className="w-5 h-5 text-orange-400" />
                  <p>{restaurant.cuisines.join(" • ")}</p>
                </div>
              </div>

              {/* Rating Badge */}
              <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg shadow-green-500/30">
                <Star className="w-6 h-6 fill-white text-white" />
                <span className="text-2xl font-bold text-white">{restaurant.rating}</span>
              </div>
            </div>

            <div className="h-1 w-40 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Cost */}
            <div className="flex items-center gap-4 p-5 bg-gray-800/50 border border-gray-700 rounded-xl hover:border-orange-500/30 transition-all duration-300 group">
              <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl group-hover:scale-110 transition-transform">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Cost for two</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  ₹{restaurant.cost_for_two}
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-4 p-5 bg-gray-800/50 border border-gray-700 rounded-xl hover:border-orange-500/30 transition-all duration-300 group">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-400 mb-1">Location</p>
                <p className="text-base font-semibold text-gray-200 line-clamp-2">
                  {restaurant.address}
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 bg-gray-800/30 rounded-xl border border-gray-700">
              <Clock className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Delivery</p>
              <p className="font-bold">30-40 min</p>
            </div>

            <div className="text-center p-4 bg-gray-800/30 rounded-xl border border-gray-700">
              <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Popular</p>
              <p className="font-bold">Top Rated</p>
            </div>

            <div className="text-center p-4 bg-gray-800/30 rounded-xl border border-gray-700">
              <Phone className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Contact</p>
              <p className="font-bold">Available</p>
            </div>

            <div className="text-center p-4 bg-gray-800/30 rounded-xl border border-gray-700">
              <ChefHat className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Cuisines</p>
              <p className="font-bold">{restaurant.cuisines.length}+</p>
            </div>
          </div>
        </div>

        {/* MENU SECTION */}
        {restaurant.menu && restaurant.menu.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-4xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Menu
              </h2>
            </div>

            {restaurant.menu.map((cat, i) => (
              <div key={i} className="mb-10">
                <h3 className="text-2xl font-bold mb-6 text-gray-200">{cat.category}</h3>

                <div className="space-y-4">
                  {cat.items.map((item, j) => (
                    <div 
                      key={j}
                      className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-orange-500/30 transition-all duration-300 group"
                      style={{
                        animation: `fadeInUp 0.4s ease-out ${j * 0.05}s both`
                      }}
                    >
                      <div className="flex gap-6 items-start">
                        {/* Item Image */}
                        {item.image && (
                          <div className="relative flex-shrink-0">
                            <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-800">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                              />
                            </div>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/60 to-transparent"></div>
                          </div>
                        )}

                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xl font-bold mb-2 group-hover:text-orange-400 transition">
                            {item.name}
                          </h4>
                          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                            {item.description}
                          </p>
                          <p className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            ₹{item.price}
                          </p>
                        </div>

                        {/* Add Button */}
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
                          className="relative flex-shrink-0 bg-gradient-to-r from-orange-500 via-red-600 to-pink-600 
                                    hover:from-orange-600 hover:via-red-700 hover:to-pink-700
                                    text-white font-bold px-6 py-3 rounded-xl h-fit
                                    shadow-lg shadow-orange-500/30 hover:shadow-orange-500/60 
                                    hover:scale-105 active:scale-95 
                                    transition-all duration-300
                                    border-2 border-orange-400/30
                                    overflow-hidden group/btn"
                        >
                          {/* Animated shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                          translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>

                          <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                            <Plus className="w-5 h-5 group-hover/btn:rotate-180 transition-transform duration-500" />
                            ADD
                          </span>
                        </button>

                        {/* Success notification */}
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
                          <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          ADDED!
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="h-20"></div>

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

export default RestaurantPage;
