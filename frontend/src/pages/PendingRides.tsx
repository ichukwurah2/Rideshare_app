import { useState } from 'react';

interface PendingRide {
  id: string;
  pickup: string;
  dropoff: string;
  distance: number;
  timeAway: number;
  fare: number;
  riderName: string;
  riderRating: number;
  riderImage: string;
  requestTime: string;
  acceptanceDeadline: number;
}

export default function PendingRides() {
  const [rides] = useState<PendingRide[]>([
    {
      id: '1',
      pickup: '123 Main Street',
      dropoff: '456 Park Avenue',
      distance: 8.5,
      timeAway: 3,
      fare: 15.75,
      riderName: 'Sarah Johnson',
      riderRating: 4.9,
      riderImage: '👩',
      requestTime: '2:15 PM',
      acceptanceDeadline: 30,
    },
    {
      id: '2',
      pickup: '789 Oak Lane',
      dropoff: '321 Pine Street',
      distance: 5.2,
      timeAway: 4,
      fare: 12.50,
      riderName: 'Mike Rodriguez',
      riderRating: 4.7,
      riderImage: '👨',
      requestTime: '2:10 PM',
      acceptanceDeadline: 25,
    },
    {
      id: '3',
      pickup: '555 Elm Street',
      dropoff: '777 Maple Avenue',
      distance: 12.3,
      timeAway: 5,
      fare: 22.75,
      riderName: 'Emma Wilson',
      riderRating: 5.0,
      riderImage: '👩',
      requestTime: '2:05 PM',
      acceptanceDeadline: 20,
    },
    {
      id: '4',
      pickup: 'Downtown Station',
      dropoff: 'Airport Terminal',
      distance: 15.8,
      timeAway: 6,
      fare: 28.50,
      riderName: 'John Martinez',
      riderRating: 4.8,
      riderImage: '👨',
      requestTime: '2:00 PM',
      acceptanceDeadline: 15,
    },
  ]);

  const [filterByRating, setFilterByRating] = useState('all');
  const [sortBy, setSortBy] = useState<'fare' | 'distance' | 'rating'>('fare');
  const [acceptedRide, setAcceptedRide] = useState<string | null>(null);

  // Filter and sort
  const filteredRides = rides.filter((ride) => {
    if (filterByRating === 'high') return ride.riderRating >= 4.8;
    if (filterByRating === 'low') return ride.riderRating < 4.8;
    return true;
  });

  const sortedRides = [...filteredRides].sort((a, b) => {
    if (sortBy === 'fare') return b.fare - a.fare;
    if (sortBy === 'distance') return b.distance - a.distance;
    if (sortBy === 'rating') return b.riderRating - a.riderRating;
    return 0;
  });

  const handleAccept = (rideId: string) => {
    setAcceptedRide(rideId);
    setTimeout(() => setAcceptedRide(null), 2000);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pending Ride Requests</h1>
          <p className="text-gray-600">Accept rides to start earning. You have 30 seconds to respond.</p>
        </div>

        {/* Success Message */}
        {acceptedRide && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">
              <span className="font-bold">✓ Accepted!</span> Navigate to the pickup location.
            </p>
          </div>
        )}

        {/* Filters & Stats */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Rating</label>
              <select
                value={filterByRating}
                onChange={(e) => setFilterByRating(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Ratings</option>
                <option value="high">High Rated (4.8+)</option>
                <option value="low">All Riders</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="fare">Highest Fare</option>
                <option value="distance">Longest Distance</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>

            <div className="flex items-end">
              <div className="w-full p-3 bg-blue-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">Available Requests</p>
                <p className="text-2xl font-bold text-blue-600">{sortedRides.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Rides List */}
        <div className="space-y-4">
          {sortedRides.length > 0 ? (
            sortedRides.map((ride) => (
              <div
                key={ride.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border-l-4 border-blue-500"
              >
                <div className="p-6">
                  {/* Acceptance Timer */}
                  <div className="mb-4 flex items-center gap-2 text-sm">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    <p className="text-red-600 font-semibold">
                      ⏱️ {ride.acceptanceDeadline}s remaining
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                    {/* Route Info */}
                    <div className="md:col-span-2">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">📍</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-600">From</p>
                          <p className="font-semibold text-gray-900 truncate">{ride.pickup}</p>
                          <p className="text-xs text-gray-500 mt-2">To</p>
                          <p className="font-semibold text-gray-900 truncate">{ride.dropoff}</p>
                        </div>
                      </div>
                    </div>

                    {/* Distance & Time */}
                    <div className="md:col-span-1">
                      <p className="text-sm text-gray-600">Distance</p>
                      <p className="font-bold text-gray-900 text-lg">{ride.distance} km</p>
                      <p className="text-xs text-gray-500 mt-2">📍 {ride.timeAway} min away</p>
                    </div>

                    {/* Fare */}
                    <div className="md:col-span-1">
                      <p className="text-sm text-gray-600">Your Earnings</p>
                      <p className="font-bold text-green-600 text-2xl">${ride.fare}</p>
                    </div>

                    {/* Rider Info */}
                    <div className="md:col-span-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{ride.riderImage}</span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{ride.riderName}</p>
                          <p className="text-xs text-yellow-600">⭐ {ride.riderRating}/5</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleAccept(ride.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                      ✓ Accept Ride
                    </button>
                    <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-4 rounded-lg transition-colors">
                      ✕ Decline
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-2xl mb-2">📭</p>
              <p className="text-gray-600 text-lg">No pending ride requests</p>
              <p className="text-gray-500 text-sm mt-2">Go online or check back in a few moments</p>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '⚡', title: 'Quick Response', desc: 'Accept within 30 seconds' },
            { icon: '💰', title: 'Great Earnings', desc: 'Higher ratings = better rates' },
            { icon: '🏆', title: 'Build Rating', desc: 'Great service earns 5 stars' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
