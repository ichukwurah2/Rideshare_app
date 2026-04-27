import { useState } from 'react';
import { rides } from '../utils/api';

export default function RequestRide() {
  const [formData, setFormData] = useState({
    pickup: '',
    dropoff: '',
    rideType: 'standard',
    passengers: 1,
    specialRequests: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Mock data for popular locations
  const popularLocations = [
    'Downtown Station',
    'Airport Terminal 1',
    'Central Hospital',
    'City Mall',
    'Central Park',
  ];

  // Calculate estimated fare based on inputs
  const calculateFare = () => {
    const baseFares = { standard: 2.5, premium: 3.5, xl: 4.0 };
    const baseFare = baseFares[formData.rideType as keyof typeof baseFares];
    const distanceCost = 1.5 * (formData.passengers * 0.5); // Mock distance calculation
    const timeCost = 2.0;
    
    return {
      baseFare: baseFare.toFixed(2),
      distanceFare: distanceCost.toFixed(2),
      timeFare: timeCost.toFixed(2),
      total: (baseFare + distanceCost + timeCost).toFixed(2),
    };
  };

  const fare = calculateFare();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'passengers' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      await rides.create({
        rider_id: 1, // replace with the actual rider ID from auth/user context
        pickup_location: formData.pickup,
        dropoff_location: formData.dropoff,
        request_time: new Date().toISOString(),
        fare: Number(fare.total),
        ride_status: 'requested',
      });

      console.log('Ride requested:', formData);
    } catch (error) {
      console.error('Failed to request ride:', error);
      setSubmitted(false);
      return;
    }

    // Reset after 2 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        pickup: '',
        dropoff: '',
        rideType: 'standard',
        passengers: 1,
        specialRequests: '',
      });
    }, 2000);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Request a Ride</h1>
          <p className="text-gray-600">Choose your pickup and dropoff locations to get started.</p>
        </div>

        {submitted && (
          <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl">✓</span>
              <div>
                <h3 className="font-bold text-green-900">Ride Requested Successfully!</h3>
                <p className="text-green-800 text-sm">
                  We're finding the best driver for your journey. You'll see driver details shortly.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Request Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Ride Details</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Pickup Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    📍 Pickup Location
                  </label>
                  <input
                    type="text"
                    name="pickup"
                    value={formData.pickup}
                    onChange={handleInputChange}
                    placeholder="Enter or select pickup address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                  <div className="mt-2 flex flex-wrap gap-2">
                    {popularLocations.slice(0, 3).map((location) => (
                      <button
                        key={location}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, pickup: location }))}
                        className="text-xs px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dropoff Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    🎯 Dropoff Location
                  </label>
                  <input
                    type="text"
                    name="dropoff"
                    value={formData.dropoff}
                    onChange={handleInputChange}
                    placeholder="Enter or select destination address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                  <div className="mt-2 flex flex-wrap gap-2">
                    {popularLocations.slice(3, 5).map((location) => (
                      <button
                        key={location}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, dropoff: location }))}
                        className="text-xs px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ride Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    🚗 Ride Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { value: 'standard', label: 'Standard', icon: '🚕', desc: 'Economy' },
                      { value: 'premium', label: 'Premium', icon: '🚙', desc: 'Comfortable' },
                      { value: 'xl', label: 'XL', icon: '🚌', desc: 'Spacious' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, rideType: option.value }))
                        }
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          formData.rideType === option.value
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-2">{option.icon}</div>
                        <div className="font-semibold text-gray-900">{option.label}</div>
                        <div className="text-xs text-gray-500">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Passengers */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    👥 Number of Passengers
                  </label>
                  <select
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Passenger' : 'Passengers'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    💬 Special Requests (Optional)
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    placeholder="Any special requirements? E.g., Quiet ride, extra luggage space, etc."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitted || !formData.pickup || !formData.dropoff}
                  className={`w-full inline-flex justify-center items-center gap-2 font-bold py-4 px-6 rounded-lg transition-all text-white text-lg ${
                    submitted || !formData.pickup || !formData.dropoff
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                  }`}
                >
                  {submitted ? (
                    <>
                      <span>⏳ Searching for drivers...</span>
                    </>
                  ) : (
                    <>
                      <span>🚕</span> Request Ride - ${fare.total}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Fare Estimate Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Fare Estimate</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600">Ride Type</p>
                    <p className="font-semibold text-gray-900">
                      {formData.rideType.charAt(0).toUpperCase() + formData.rideType.slice(1)}
                    </p>
                  </div>
                  <span className="text-lg">🚗</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-700">Base Fare</span>
                  <span className="font-semibold text-gray-800">${fare.baseFare}</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-700">Distance & Passengers</span>
                  <span className="font-semibold text-gray-800">${fare.distanceFare}</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-700">Time Estimate</span>
                  <span className="font-semibold text-gray-800">${fare.timeFare}</span>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <span className="text-xl font-bold text-gray-900">Total (est.)</span>
                  <span className="text-3xl font-bold text-blue-600">${fare.total}</span>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>💡 Note:</strong> This is an estimate. Final fare may vary based on actual route and traffic conditions.
                </p>
              </div>

              {/* Payment Method */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-3">Payment Method</p>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">💳</span>
                  <div>
                    <p className="font-semibold text-gray-900">Visa</p>
                    <p className="text-xs text-gray-500">•••• 4242</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '⏱️', title: 'Quick Pickup', desc: 'Average wait time is 3-5 minutes' },
            { icon: '🗺️', title: 'Best Route', desc: 'We calculate the fastest route for you' },
            { icon: '🛡️', title: 'Safe & Secure', desc: 'All rides are insured and verified' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
