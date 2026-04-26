import { useState } from 'react';

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

interface FilterPanelProps {
  title?: string;
  onApply?: (filters: Record<string, any>) => void;
  onReset?: () => void;
  isCompact?: boolean;
}

export default function FilterPanel({
  title = 'Filters',
  onApply,
  onReset,
  isCompact = false,
}: FilterPanelProps) {
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [ratingFilter, setRatingFilter] = useState('all');
  const [vehicleType, setVehicleType] = useState<FilterOption[]>([
    { id: 'standard', label: 'Standard', checked: true },
    { id: 'premium', label: 'Premium', checked: false },
    { id: 'xl', label: 'XL', checked: false },
  ]);
  const [status, setStatus] = useState<FilterOption[]>([
    { id: 'available', label: 'Available', checked: true },
    { id: 'completed', label: 'Completed', checked: false },
    { id: 'cancelled', label: 'Cancelled', checked: false },
  ]);
  const [sortBy, setSortBy] = useState('recent');

  const handleVehicleChange = (id: string) => {
    setVehicleType(
      vehicleType.map((v) => (v.id === id ? { ...v, checked: !v.checked } : v))
    );
  };

  const handleStatusChange = (id: string) => {
    setStatus(
      status.map((s) => (s.id === id ? { ...s, checked: !s.checked } : s))
    );
  };

  const handleApply = () => {
    const filters = {
      priceRange,
      rating: ratingFilter,
      vehicleType: vehicleType.filter((v) => v.checked).map((v) => v.id),
      status: status.filter((s) => s.checked).map((s) => s.id),
      sortBy,
    };
    onApply?.(filters);
  };

  const handleReset = () => {
    setPriceRange([0, 50]);
    setRatingFilter('all');
    setVehicleType(vehicleType.map((v) => ({ ...v, checked: v.id === 'standard' })));
    setStatus(status.map((s) => ({ ...s, checked: s.id === 'available' })));
    setSortBy('recent');
    onReset?.();
  };

  if (isCompact) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Filters</h3>

        <div className="space-y-3">
          {/* Sort */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="recent">Most Recent</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Rating</label>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Ratings</option>
              <option value="4.5+">4.5+ Stars</option>
              <option value="4.0+">4.0+ Stars</option>
              <option value="3.5+">3.5+ Stars</option>
            </select>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleApply}
              className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Apply
            </button>
            <button
              onClick={handleReset}
              className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-semibold rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <button
          onClick={handleReset}
          className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
        >
          Reset
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3 text-sm">Price Range</h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">${priceRange[0]}</span>
          <span className="text-sm text-gray-600">${priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className="w-full"
        />
      </div>

      {/* Vehicle Type */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3 text-sm">Vehicle Type</h3>
        <div className="space-y-2">
          {vehicleType.map((type) => (
            <label key={type.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={type.checked}
                onChange={() => handleVehicleChange(type.id)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3 text-sm">Status</h3>
        <div className="space-y-2">
          {status.map((s) => (
            <label key={s.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={s.checked}
                onChange={() => handleStatusChange(s.id)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 capitalize">{s.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3 text-sm">Minimum Rating</h3>
        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Ratings</option>
          <option value="4.5+">4.5+ Stars</option>
          <option value="4.0+">4.0+ Stars</option>
          <option value="3.5+">3.5+ Stars</option>
        </select>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3 text-sm">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="recent">Most Recent</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="distance">Closest Distance</option>
        </select>
      </div>

      {/* Apply Button */}
      <button
        onClick={handleApply}
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
}
