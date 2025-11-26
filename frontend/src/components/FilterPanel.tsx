import React, { useEffect, useState } from 'react';
import { fetchCuisines } from '../api/restaurantApi';

interface FilterPanelProps {
  selectedCuisines: string[];
  onCuisineChange: (cuisines: string[]) => void;
  minRating: number;
  onRatingChange: (rating: number) => void;
  maxCost: number;
  onCostChange: (cost: number) => void;
  isOpen: boolean | null;
  onOpenChange: (isOpen: boolean | null) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedCuisines,
  onCuisineChange,
  minRating,
  onRatingChange,
  maxCost,
  onCostChange,
  isOpen,
  onOpenChange,
}) => {
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [showAllCuisines, setShowAllCuisines] = useState(false);

  useEffect(() => {
    loadCuisines();
  }, []);

  const loadCuisines = async () => {
    try {
      const data = await fetchCuisines();
      setCuisines(data);
    } catch (error) {
      console.error('Error loading cuisines:', error);
    }
  };

  const handleCuisineToggle = (cuisine: string) => {
    if (selectedCuisines.includes(cuisine)) {
      onCuisineChange(selectedCuisines.filter((c) => c !== cuisine));
    } else {
      onCuisineChange([...selectedCuisines, cuisine]);
    }
  };

  const displayedCuisines = showAllCuisines ? cuisines : cuisines.slice(0, 10);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Filters</h2>

      {/* Cuisines */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Cuisines</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {displayedCuisines.map((cuisine) => (
            <label key={cuisine} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCuisines.includes(cuisine)}
                onChange={() => handleCuisineToggle(cuisine)}
                className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
              />
              <span className="text-gray-700">{cuisine}</span>
            </label>
          ))}
        </div>
        {cuisines.length > 10 && (
          <button
            onClick={() => setShowAllCuisines(!showAllCuisines)}
            className="text-orange-500 text-sm mt-2 hover:underline"
          >
            {showAllCuisines ? 'Show Less' : `Show All (${cuisines.length})`}
          </button>
        )}
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Minimum Rating</h3>
        <div className="space-y-2">
          {[0, 3, 3.5, 4, 4.5].map((rating) => (
            <label key={rating} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={minRating === rating}
                onChange={() => onRatingChange(rating)}
                className="w-4 h-4 text-orange-500 focus:ring-orange-500"
              />
              <span className="text-gray-700">
                {rating === 0 ? 'Any' : `${rating}+ ⭐`}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Cost */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Max Cost for Two</h3>
        <input
          type="range"
          min="0"
          max="2000"
          step="100"
          value={maxCost}
          onChange={(e) => onCostChange(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>₹0</span>
          <span className="font-semibold">₹{maxCost}</span>
          <span>₹2000</span>
        </div>
      </div>

      {/* Open Now */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Availability</h3>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isOpen === true}
            onChange={(e) => onOpenChange(e.target.checked ? true : null)}
            className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
          />
          <span className="text-gray-700">Open Now</span>
        </label>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => {
          onCuisineChange([]);
          onRatingChange(0);
          onCostChange(2000);
          onOpenChange(null);
        }}
        className="w-full py-2 text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterPanel;