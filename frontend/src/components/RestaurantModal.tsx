import React from 'react';
import { Restaurant } from '../types/restaurant';

interface RestaurantModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
}

const RestaurantModal: React.FC<RestaurantModalProps> = ({ restaurant, onClose }) => {
  if (!restaurant) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{restaurant.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
          {restaurant.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${restaurant.name} ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          ))}
        </div>

        {/* Details */}
        <div className="p-6 space-y-4">
          {/* Rating & Cost */}
          <div className="flex items-center justify-between pb-4 border-b">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⭐</span>
              <span className="text-xl font-bold text-gray-800">
                {restaurant.rating.toFixed(1)}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Cost for two</p>
              <p className="text-xl font-bold text-gray-800">₹{restaurant.cost_for_two}</p>
            </div>
          </div>

          {/* Cuisines */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Cuisines</h3>
            <div className="flex flex-wrap gap-2">
              {restaurant.cuisines.map((cuisine, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                >
                  {cuisine}
                </span>
              ))}
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Address</h3>
            <p className="text-gray-600">{restaurant.address}</p>
          </div>

          {/* Status */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Status</h3>
            <span
              className={`inline-block px-4 py-2 rounded-full font-semibold ${
                restaurant.is_open
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {restaurant.is_open ? '🟢 Open Now' : '🔴 Closed'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantModal;