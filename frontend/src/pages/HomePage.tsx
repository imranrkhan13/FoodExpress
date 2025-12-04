import { useEffect, useState } from "react";
import { getRestaurants } from "../api/restaurantApi";
import { Search, ChefHat, TrendingUp } from "lucide-react";
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
    "All",
    "Biryani",
    "Chinese",
    "Pizza",
    "North Indian",
    "South Indian",
  ];

  const filteredRestaurants = restaurants;
  const skeletons = Array.from({ length: 6 });


  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navbar />

      {/* 🔥 Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-800/20 via-black to-red-800/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-400/10 blur-[140px] animate-pulse rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 blur-[140px] animate-pulse rounded-full delay-1000"></div>
      </div>

      {/* ⭐ HERO SECTION */}
      <section className="pt-16 pb-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Left Section */}
          <div className="flex flex-col gap-6">
            <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent leading-tight">
              Crave. Discover. Devour.
            </h2>

            <p className="text-lg text-gray-300">
              Your next favorite meal is just moments away. Explore top
              restaurants around you.
            </p>

            {/* Search Bar */}
            <div className="flex items-center gap-3 bg-white/5 border border-orange-500/30 rounded-full px-6 py-3 backdrop-blur-md">
              <Search className="w-5 h-5 text-yellow-400" />
              <input
                type="text"
                placeholder="Search restaurants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent flex-1 outline-none text-white placeholder-gray-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ⭐ CATEGORY FILTER */}
      <section className="max-w-6xl mx-auto px-6 pb-8">
        <div className="flex items-center gap-2 mb-4">
          <ChefHat className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold">Explore Cuisines</h3>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-semibold duration-300 whitespace-nowrap
                ${activeCategory === cat
                  ? "bg-orange-500 text-black shadow-md shadow-orange-500/40"
                  : "bg-white/5 text-gray-300 hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>
      {/* ⭐ FILTERS + SORT BAR */}
      <div className="max-w-6xl mx-auto px-6 mb-6 flex flex-wrap gap-4">

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-white/5 border border-gray-700 text-white px-4 py-2 rounded-md"
        >
          <option value="best_match">Best Match</option>
          <option value="rating_high">Rating High → Low</option>
          <option value="cost_low">Cost Low → High</option>
        </select>

        {/* Min Rating */}
        <select
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          className="bg-white/5 border border-gray-700 text-white px-4 py-2 rounded-md"
        >
          <option value="">Min Rating</option>
          <option value="3">3★+</option>
          <option value="4">4★+</option>
          <option value="4.5">4.5★+</option>
        </select>

        {/* Max Cost */}
        <select
          value={maxCost}
          onChange={(e) => setMaxCost(e.target.value)}
          className="bg-white/5 border border-gray-700 text-white px-4 py-2 rounded-md"
        >
          <option value="">Max Cost</option>
          <option value="300">₹300</option>
          <option value="600">₹600</option>
          <option value="900">₹900</option>
        </select>

      </div>

      {/* ⭐ RESTAURANT GRID */}

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-6 h-6 text-yellow-400" />
          <h2 className="text-3xl font-extrabold">Popular Restaurants</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {skeletons.map((_, i) => (
              <div
                key={i}
                className="bg-white/5 h-64 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant._id}
                onClick={() => navigate(`/restaurant/${restaurant._id}`)}
                className="rounded-xl bg-white/5 border border-gray-700 backdrop-blur-md overflow-hidden hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/20 duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={restaurant.images[0]}
                    alt={restaurant.name}
                    className="w-full h-full object-cover duration-500 hover:scale-110"
                  />

                  <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    ⭐ {restaurant.rating}
                  </div>

                  <div className="absolute bottom-3 left-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold text-white
                      ${restaurant.is_open
                          ? "bg-green-500/80"
                          : "bg-red-500/80"
                        }`}
                    >
                      {restaurant.is_open ? "🟢 Open" : "🔴 Closed"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold">{restaurant.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {restaurant.cuisines.join(" • ")}
                  </p>

                  <div className="flex justify-between items-center border-t border-gray-700 mt-4 pt-4">
                    <span className="text-yellow-400 text-lg font-bold">
                      ₹{restaurant.cost_for_two}
                    </span>
                    <span className="text-gray-400 text-sm">for two</span>
                  </div>

                  <button className="w-full mt-4 py-2 rounded-md bg-gradient-to-r from-orange-500 to-red-600 font-semibold shadow-md shadow-orange-500/30 hover:shadow-orange-500/60 hover:-translate-y-1 duration-300">
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredRestaurants.length === 0 && (
          <p className="text-center text-gray-400 py-20">
            No restaurants found.
          </p>
        )}
      </section>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={() => page > 1 && setPage(page - 1)}
          className={`px-4 py-2 rounded-md font-semibold 
            ${page === 1
              ? "bg-gray-700 text-gray-400"
              : "bg-orange-500 hover:bg-orange-600"
            }
          `}
          disabled={page === 1}
        >
          ⬅ Previous
        </button>

        <span className="text-white font-bold text-lg">
          Page {page} / {totalPages}
        </span>

        <button
          onClick={() => page < totalPages && setPage(page + 1)}
          className={`px-4 py-2 rounded-md font-semibold 
            ${page === totalPages
              ? "bg-gray-700 text-gray-400"
              : "bg-orange-500 hover:bg-orange-600"
            }
          `}
          disabled={page === totalPages}
        >
          Next ➡
        </button>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
        © 2025 FoodExpress. Crafted with fire.
      </footer>
    </div>
  );
};

export default HomePage;
