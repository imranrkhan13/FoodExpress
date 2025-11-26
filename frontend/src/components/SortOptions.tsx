import React from 'react';

interface SortOptionsProps {
  value: 'best_match' | 'rating_high' | 'cost_low';
  onChange: (value: 'best_match' | 'rating_high' | 'cost_low') => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-700 font-medium">Sort by:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as any)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 cursor-pointer"
      >
        <option value="best_match">Best Match</option>
        <option value="rating_high">Rating: High to Low</option>
        <option value="cost_low">Cost: Low to High</option>
      </select>
    </div>
  );
};

export default SortOptions;