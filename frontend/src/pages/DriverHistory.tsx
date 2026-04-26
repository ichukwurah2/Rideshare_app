import { useState } from 'react';

interface CompletedRide {
  id: string;
  date: string;
  time: string;
  riderName: string;
  riderImage: string;
  pickup: string;
  dropoff: string;
  distance: number;
  duration: string;
  fare: number;
  earnings: number;
  rating: number;
  status: 'completed' | 'cancelled';
}

export default function DriverHistory() {
  const [rides] = useState<CompletedRide[]>([
    {
      id: '1',
      date: 'Today',
      time: '3:45 PM',
      riderName: 'Sarah Johnson',
      riderImage: '👩',
      pickup: '123 Main Street',
      dropoff: '456 Park Avenue',
      distance: 8.5,
      duration: '18 min',
      fare: 15.75,
      earnings: 12.33,
      rating: 5,
      status: 'completed',
    },
    {
      id: '2',
      date: 'Today',
      time: '2:20 PM',
      riderName: 'Mike Rodriguez',
      riderImage: '👨',
      pickup: '789 Oak Lane',
      dropoff: '321 Pine Street',
      distance: 5.2,
      duration: '12 min',
      fare: 12.50,
      earnings: 9.75,
      rating: 4,
      status: 'completed',
    },
    {
      id: '3',
      date: 'Today',
      time: '1:05 PM',
      riderName: 'Emma Wilson',
      riderImage: '👩',
      pickup: '555 Elm Street',
      dropoff: '777 Maple Avenue',
      distance: 12.3,
      duration: '22 min',
      fare: 22.75,
      earnings: 17.81,
      rating: 5,
      status: 'completed',
    },
    {
      id: '4',
      date: 'Yesterday',
      time: '6:30 PM',
      riderName: 'John Martinez',
      riderImage: '👨',
      pickup: 'Downtown Station',
      dropoff: 'Airport Terminal',
      distance: 15.8,
      duration: '28 min',
      fare: 28.50,
      earnings: 22.23,
      rating: 5,
      status: 'completed',
    },
    {
      id: '5',
      date: 'Yesterday',
      time: '4:15 PM',
      riderName: 'Lisa Chen',
      riderImage: '👩',
      pickup: 'Central Park',
      dropoff: 'Shopping Mall',
      distance: 6.7,
      duration: '14 min',
      fare: 14.25,
      earnings: 11.13,
      rating: 4,
      status: 'completed',
    },
    {
      id: '6',
      date: 'Mar 21, 2026',
      time: '7:45 PM',
      riderName: 'David Brown',
      riderImage: '👨',
      pickup: 'Train Station',
      dropoff: 'Hotel Grand',
      distance: 11.2,
      duration: '20 min',
      fare: 20.50,
      earnings: 16.00,
      rating: 5,
      status: 'completed',
    },
    {
      id: '7',
      date: 'Mar 21, 2026',
      time: '5:00 PM',
      riderName: 'Jennifer Lee',
      riderImage: '👩',
      pickup: 'Office Building',
      dropoff: 'Residential Area',
      distance: 7.5,
      duration: '15 min',
      fare: 16.75,
      earnings: 13.09,
      rating: 5,
      status: 'completed',
    },
    {
      id: '8',
      date: 'Mar 21, 2026',
      time: '2:30 PM',
      riderName: 'Robert Davis',
      riderImage: '👨',
      pickup: 'Hospital',
      dropoff: 'Pharmacy',
      distance: 3.2,
      duration: '8 min',
      fare: 9.50,
      earnings: 7.41,
      rating: 4,
      status: 'completed',
    },
    {
      id: '9',
      date: 'Mar 20, 2026',
      time: '8:15 PM',
      riderName: 'Amanda White',
      riderImage: '👩',
      pickup: 'Restaurant',
      dropoff: 'Home',
      distance: 5.8,
      duration: '12 min',
      fare: 13.75,
      earnings: 10.73,
      rating: 5,
      status: 'completed',
    },
    {
      id: '10',
      date: 'Mar 20, 2026',
      time: '3:00 PM',
      riderName: 'Chris Taylor',
      riderImage: '👨',
      pickup: 'Airport Terminal',
      dropoff: 'Downtown Hotel',
      distance: 18.5,
      duration: '32 min',
      fare: 32.00,
      earnings: 24.96,
      rating: 5,
      status: 'completed',
    },
    {
      id: '11',
      date: 'Mar 19, 2026',
      time: '9:00 PM',
      riderName: 'Nicole Anderson',
      riderImage: '👩',
      pickup: 'Gym',
      dropoff: 'Home',
      distance: 4.1,
      duration: '9 min',
      fare: 10.25,
      earnings: 8.00,
      rating: 4,
      status: 'completed',
    },
    {
      id: '12',
      date: 'Mar 19, 2026',
      time: '10:30 AM',
      riderName: 'Jason Hall',
      riderImage: '👨',
      pickup: 'Downtown Station',
      dropoff: 'Airport',
      distance: 14.2,
      duration: '25 min',
      fare: 0,
      earnings: 0,
      rating: 0,
      status: 'cancelled',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'cancelled'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'earnings' | 'rating'>('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter rides
  const filteredRides = rides.filter((ride) => {
    const matchesSearch =
      ride.riderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.dropoff.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ride.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Sort rides
  const sortedRides = [...filteredRides].sort((a, b) => {
    if (sortBy === 'earnings') return b.earnings - a.earnings;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // Recent is default
  });

  // Pagination
  const totalPages = Math.ceil(sortedRides.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const displayedRides = sortedRides.slice(startIdx, startIdx + itemsPerPage);

  // Stats
  const completedCount = rides.filter((r) => r.status === 'completed').length;
  const totalEarnings = rides.filter((r) => r.status === 'completed').reduce((sum, r) => sum + r.earnings, 0);
  const avgRating = (rides.filter((r) => r.rating > 0).reduce((sum, r) => sum + r.rating, 0) / rides.filter((r) => r.rating > 0).length).toFixed(1);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ride History</h1>
          <p className="text-gray-600">Track your earnings and ride statistics.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Completed Rides', value: completedCount, icon: '🚕' },
            { label: 'Total Earnings', value: `$${totalEarnings.toFixed(2)}`, icon: '💰' },
            { label: 'Avg Rating', value: avgRating, icon: '⭐' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <span className="text-4xl">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Rider, location..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value as typeof filterStatus);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Rides</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="recent">Most Recent</option>
                <option value="earnings">Highest Earnings</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <div className="w-full p-3 bg-blue-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">Results</p>
                <p className="text-2xl font-bold text-blue-600">{sortedRides.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rides List */}
        <div className="space-y-4 mb-8">
          {displayedRides.length > 0 ? (
            displayedRides.map((ride) => (
              <div key={ride.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    {/* Route */}
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📍</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-600">From</p>
                          <p className="font-semibold text-gray-900 truncate">{ride.pickup}</p>
                          <p className="text-xs text-gray-500 mt-2">To</p>
                          <p className="font-semibold text-gray-900 truncate">{ride.dropoff}</p>
                        </div>
                      </div>
                    </div>

                    {/* Time & Date */}
                    <div className="md:col-span-1">
                      <p className="text-sm text-gray-600">{ride.date}</p>
                      <p className="font-semibold text-gray-900">{ride.time}</p>
                      <p className="text-xs text-gray-500 mt-2">{ride.distance} km</p>
                    </div>

                    {/* Earnings & Status */}
                    <div className="md:col-span-1">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">Fare: ${ride.fare.toFixed(2)}</p>
                        {ride.status === 'completed' ? (
                          <p className="font-bold text-green-600">+ ${ride.earnings.toFixed(2)}</p>
                        ) : (
                          <p className="font-bold text-red-600">Cancelled</p>
                        )}
                      </div>
                    </div>

                    {/* Rider & Rating */}
                    <div className="md:col-span-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{ride.riderImage}</span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{ride.riderName}</p>
                          {ride.status === 'completed' ? (
                            <p className="text-sm text-yellow-600">⭐ {ride.rating}/5</p>
                          ) : (
                            <p className="text-xs text-gray-500">Cancelled</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="md:col-span-0 flex justify-end">
                      {ride.status === 'completed' && (
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-blue-600 hover:text-blue-700">
                          📄 Details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-2xl mb-2">🔍</p>
              <p className="text-gray-600">No rides found matching your search.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              ← Previous
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg transition-all ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
