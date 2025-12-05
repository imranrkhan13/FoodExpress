import React from 'react';
import { Restaurant } from '../types/restaurant';
import { Link } from "react-router-dom";


interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurant.images?.[0] || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={restaurant.name || "Restaurant"}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {!restaurant.is_open && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">CLOSED</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">{restaurant.name}</h3>

        {/* Rating & Cost */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500">⭐</span>
            <span className="font-semibold text-gray-700">
              {restaurant.rating?.toFixed(1) || "0.0"}
            </span>
          </div>
          <span className="text-gray-600 font-medium">
            ₹{restaurant.cost_for_two || "N/A"} for two
          </span>
        </div>

        {/* Cuisines */}
        <p className="text-gray-600 text-sm truncate">
          {Array.isArray(restaurant.cuisines)
            ? restaurant.cuisines.join(', ')
            : restaurant.cuisines || "No cuisines"}
        </p>

        {/* Status Badge */}
        <div className="mt-3">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              restaurant.is_open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {restaurant.is_open ? 'Open Now' : 'Closed'}
          </span>
        </div>

        {/* View details button */}
        <Link
          to={`/restaurant/${restaurant._id}`}
          className="mt-4 inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};


export default RestaurantCard;
