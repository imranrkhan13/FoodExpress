import React, { useState, useEffect } from 'react';
import { getRestaurants } from '../api/restaurantApi';
import FilterPanel from './FilterPanel';
import RestaurantList from './RestaurantList';
import { Restaurant } from '../types/restaurant';

const RestaurantsPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [maxCost, setMaxCost] = useState(2000);
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const filters = {
        cuisines: selectedCuisines,
        minRating,
        maxCost,
        isOpen,
      };
      const data = await getRestaurants(1, 12, filters);
      setRestaurants(data.data); // your API returns { data, pagination }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setRestaurants([]);
    }
    setLoading(false);
  };

  // Fetch whenever filters change
  useEffect(() => {
    fetchData();
  }, [selectedCuisines, minRating, maxCost, isOpen]);

  const handleRestaurantClick = (restaurant: Restaurant) => {
    console.log('Clicked restaurant:', restaurant.name);
  };

  return (
    <div className="flex gap-6">
      <FilterPanel
        selectedCuisines={selectedCuisines}
        onCuisineChange={setSelectedCuisines}
        minRating={minRating}
        onRatingChange={setMinRating}
        maxCost={maxCost}
        onCostChange={setMaxCost}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
      <div className="flex-1">
        <RestaurantList
          restaurants={restaurants}
          loading={loading}
          onRestaurantClick={handleRestaurantClick}
        />
      </div>
    </div>
  );
};

export default RestaurantsPage;
