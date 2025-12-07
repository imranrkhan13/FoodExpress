import { useEffect, useState } from "react";
import { getRestaurants } from "../api/restaurantApi";
import { Search, ChefHat, TrendingUp, MapPin, Clock, Star, Flame, Sparkles, Filter } from "lucide-react";
import { Restaurant } from "../types/restaurant";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("best_match");
  const [minRating, setMinRating] = useState("");
  const [maxCost, setMaxCost] = useState("");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadRestaurants();
  }, [page, sortBy, minRating, maxCost, searchTerm, activeCategory]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, activeCategory]);

  const loadRestaurants = async () => {
    try {
      setLoading(true);

      const res = await getRestaurants(page, 12, {
        search: searchTerm,
        cuisines: activeCategory === "All" ? undefined : activeCategory,
        sortBy,
        minRating,
        maxCost,
      });

      console.log("API RESPONSE:", res);

      setRestaurants(res.data);
      setTotalPages(res.pagination.pages);

    } catch (err) {
      console.error("Error fetching:", err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: "All", icon: "🍽️" },
    { name: "Biryani", icon: "🍛" },
    { name: "Chinese", icon: "🥡" },
    { name: "Pizza", icon: "🍕" },
    { name: "North Indian", icon: "🫓" },
    { name: "South Indian", icon: "🥘" },
    { name: "Healthy", icon: "🥗" },
  ];

  const filteredRestaurants = restaurants;
  const skeletons = Array.from({ length: 6 });

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white relative overflow-hidden">
      <Navbar />

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent"></div>
        
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 blur-[120px] animate-pulse rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-red-500/10 blur-[120px] animate-pulse delay-700 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-yellow-500/5 blur-[100px] animate-pulse delay-1000 rounded-full"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      {/* HERO SECTION - Enhanced */}
      <section className="pt-20 sm:pt-24 pb-16 sm:pb-32 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 space-y-4 sm:space-y-6">
            {/* Floating badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 backdrop-blur-sm mb-4">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-orange-200">Now delivering in 30 minutes</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl animate-gradient">
                Crave.
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">
                Discover. Devour.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
              Your next unforgettable meal is just moments away. 
              <span className="text-orange-400 font-semibold"> Explore, order, enjoy.</span>
            </p>

            {/* Enhanced Search Bar */}
            <div className="max-w-3xl mx-auto mt-6 sm:mt-10 px-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative flex items-center gap-3 sm:gap-4 bg-gray-900/90 border border-orange-500/30 rounded-full px-4 sm:px-8 py-3 sm:py-5 backdrop-blur-xl shadow-2xl">
                  <Search className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search restaurants, cuisines..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-transparent flex-1 outline-none text-white text-sm sm:text-lg placeholder-gray-400"
                  />
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm("")}
                      className="text-gray-400 hover:text-white transition flex-shrink-0"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex justify-center gap-4 sm:gap-8 mt-8 sm:mt-12 flex-wrap px-4">
              <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                <span className="font-semibold">500+ Restaurants</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                <span className="font-semibold">4.5+ Avg Rating</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span className="font-semibold">30 Min Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER - Enhanced & Mobile Responsive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
            <ChefHat className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Explore Cuisines
          </h3>
        </div>

        {/* Grid layout for mobile, horizontal scroll for larger screens */}
        <div className="grid grid-cols-2 sm:flex sm:flex-nowrap gap-3 sm:gap-4 sm:overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`group relative px-4 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold duration-300 whitespace-nowrap transform hover:scale-105 transition-all text-sm sm:text-base
                ${activeCategory === cat.name
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-xl shadow-orange-500/50"
                  : "bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:bg-gray-800 border border-gray-700 hover:border-orange-500/50"
                }`}
            >
              <span className="text-xl sm:text-2xl mr-1 sm:mr-2">{cat.icon}</span>
              <span className="hidden sm:inline">{cat.name}</span>
              <span className="sm:hidden">{cat.name.length > 8 ? cat.name.substring(0, 8) : cat.name}</span>
              {activeCategory === cat.name && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 blur-xl opacity-50 -z-10"></div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* FILTERS BAR - Enhanced */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
              <span className="font-semibold text-base sm:text-lg">Filters</span>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden text-orange-400 text-sm"
            >
              {showFilters ? "Hide" : "Show"}
            </button>
          </div>

          <div className={`${showFilters ? "grid" : "hidden md:grid"} grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4`}>
            {/* Sort */}
            <div className="relative group">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-gray-800/80 border border-gray-700 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl appearance-none cursor-pointer hover:border-orange-500/50 transition focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-sm sm:text-base"
              >
                <option value="best_match">🎯 Best Match</option>
                <option value="rating_high">⭐ Rating High → Low</option>
                <option value="cost_low">💰 Cost Low → High</option>
              </select>
            </div>

            {/* Min Rating */}
            <div className="relative group">
              <select
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                className="w-full bg-gray-800/80 border border-gray-700 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl appearance-none cursor-pointer hover:border-orange-500/50 transition focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-sm sm:text-base"
              >
                <option value="">⭐ Min Rating</option>
                <option value="3">3★ and above</option>
                <option value="4">4★ and above</option>
                <option value="4.5">4.5★ and above</option>
              </select>
            </div>

            {/* Max Cost */}
            <div className="relative group">
              <select
                value={maxCost}
                onChange={(e) => setMaxCost(e.target.value)}
                className="w-full bg-gray-800/80 border border-gray-700 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl appearance-none cursor-pointer hover:border-orange-500/50 transition focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-sm sm:text-base"
              >
                <option value="">💵 Max Cost</option>
                <option value="300">Under ₹300</option>
                <option value="600">Under ₹600</option>
                <option value="900">Under ₹900</option>
              </select>
            </div>

            {/* Clear Filters */}
            {(minRating || maxCost || sortBy !== "best_match") && (
              <button
                onClick={() => {
                  setSortBy("best_match");
                  setMinRating("");
                  setMaxCost("");
                }}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 rounded-xl transition font-medium text-sm sm:text-base"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* RESTAURANT GRID - Enhanced */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg animate-pulse">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Popular Restaurants
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-orange-500/50 to-transparent ml-4"></div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {skeletons.map((_, i) => (
              <div
                key={i}
                className="relative bg-gray-900/50 backdrop-blur-sm h-80 sm:h-96 rounded-3xl overflow-hidden border border-gray-800"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800/50 to-transparent animate-shimmer"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredRestaurants.map((restaurant, idx) => (
              <div
                key={restaurant._id}
                onMouseEnter={() => setHoveredCard(restaurant._id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => navigate(`/restaurant/${restaurant._id}`)}
                className="group relative rounded-3xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 overflow-hidden hover:border-orange-500/50 duration-500 cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`
                }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

                {/* Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={restaurant.images[0]}
                    alt={restaurant.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-white" />
                    {restaurant.rating}
                  </div>

                  {/* Open/Closed Badge */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-20">
                    <span
                      className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-white backdrop-blur-md shadow-lg
                      ${restaurant.is_open
                          ? "bg-green-500/90 shadow-green-500/50"
                          : "bg-red-500/90 shadow-red-500/50"
                        }`}
                    >
                      <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${restaurant.is_open ? "bg-white animate-pulse" : "bg-white"}`}></span>
                      {restaurant.is_open ? "Open Now" : "Closed"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 relative z-20">
                  <h3 className="text-lg sm:text-2xl font-bold mb-2 group-hover:text-orange-400 transition line-clamp-1">
                    {restaurant.name}
                  </h3>
                  
                  <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-1">
                    {restaurant.cuisines.join(" • ")}
                  </p>

                  {/* Info Row */}
                  <div className="flex items-center justify-between py-3 sm:py-4 border-t border-gray-800">
                    <div className="flex items-baseline gap-1.5 sm:gap-2">
                      <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                        ₹{restaurant.cost_for_two}
                      </span>
                      <span className="text-gray-500 text-xs sm:text-sm">for two</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full mt-3 sm:mt-4 py-2.5 sm:py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-red-600 to-pink-600 font-bold text-white text-sm sm:text-base shadow-lg shadow-orange-500/30 hover:shadow-orange-500/60 transform hover:scale-[1.02] active:scale-95 transition-all duration-300 relative overflow-hidden group/btn">
                    <span className="relative z-10">Order Now</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredRestaurants.length === 0 && (
          <div className="text-center py-20 sm:py-32">
            <div className="inline-block p-6 bg-gray-900/50 rounded-3xl border border-gray-800 backdrop-blur-sm">
              <Search className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-base sm:text-lg">No restaurants found</p>
              <p className="text-gray-600 text-xs sm:text-sm mt-2">Try adjusting your filters or search terms</p>
            </div>
          </div>
        )}
      </section>

      {/* PAGINATION - Enhanced */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 sm:gap-6 pb-12 sm:pb-16 px-4">
          <button
            onClick={() => page > 1 && setPage(page - 1)}
            disabled={page === 1}
            className={`px-4 sm:px-8 py-2.5 sm:py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base
              ${page === 1
                ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-lg hover:shadow-orange-500/50"
              }
            `}
          >
            ← Previous
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl font-bold transition-all duration-300 transform hover:scale-110 text-sm sm:text-base
                    ${page === pageNum
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/50"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }
                  `}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => page < totalPages && setPage(page + 1)}
            disabled={page === totalPages}
            className={`px-4 sm:px-8 py-2.5 sm:py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base
              ${page === totalPages
                ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-lg hover:shadow-orange-500/50"
              }
            `}
          >
            Next →
          </button>
        </div>
      )}

      {/* FOOTER - Enhanced */}
      <footer className="relative border-t border-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 animate-pulse" />
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                FoodExpress
              </span>
            </div>
            <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">Crafted with fire & passion for food lovers</p>
            <div className="flex justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-gray-600">
              <span>© 2025 FoodExpress</span>
            </div>
          </div>
        </div>
      </footer>

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

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default HomePage;