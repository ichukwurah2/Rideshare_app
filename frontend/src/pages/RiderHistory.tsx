import { useState } from 'react';

interface RideRecord {
  id: string;
  date: string;
  time: string;
  pickup: string;
  dropoff: string;
  distance: number;
  duration: string;
  fare: number;
  driver: string;
  rating: number;
  status: 'completed' | 'cancelled' | 'no-show';
  rideType: string;
}

export default function RiderHistory() {
  const [rides] = useState<RideRecord[]>([
    {
      id: '1',
      date: 'Today',
      time: '2:30 PM',
      pickup: 'Downtown Station',
      dropoff: 'Central Airport',
      distance: 12.5,
      duration: '22 min',
      fare: 18.75,
      driver: 'James Miller',
      rating: 5,
      status: 'completed',
      rideType: '🚙 Premium',
    },
    {
      id: '2',
      date: 'Today',
      time: '10:15 AM',
      pickup: 'Home - Oak Street',
      dropoff: 'Work - Tech Park',
      distance: 8.2,
      duration: '18 min',
      fare: 12.5,
      driver: 'Lisa Chen',
      rating: 5,
      status: 'completed',
      rideType: '🚕 Standard',
    },
    {
      id: '3',
      date: 'Yesterday',
      time: '6:45 PM',
      pickup: 'Central Park',
      dropoff: 'Downtown Restaurant',
      distance: 5.1,
      duration: '12 min',
      fare: 8.25,
      driver: 'Michael Johnson',
      rating: 4,
      status: 'completed',
      rideType: '🚕 Standard',
    },
    {
      id: '4',
      date: 'Yesterday',
      time: '2:00 PM',
      pickup: 'Mall Center',
      dropoff: 'Hotel Grand',
      distance: 15.8,
      duration: '28 min',
      fare: 22.5,
      driver: 'Sarah Williams',
      rating: 5,
      status: 'completed',
      rideType: '🚌 XL',
    },
    {
      id: '5',
      date: 'Mar 14, 2024',
      time: '11:30 AM',
      pickup: 'Train Station',
      dropoff: 'Shopping Center',
      distance: 6.3,
      duration: '15 min',
      fare: 9.75,
      driver: 'David Brown',
      rating: 4,
      status: 'completed',
      rideType: '🚕 Standard',
    },
    {
      id: '6',
      date: 'Mar 14, 2024',
      time: '3:20 PM',
      pickup: 'Hospital',
      dropoff: 'Home - Oak Street',
      distance: 7.5,
      duration: '16 min',
      fare: 11.0,
      driver: 'Emma Davis',
      rating: 5,
      status: 'completed',
      rideType: '🚕 Standard',
    },
    {
      id: '7',
      date: 'Mar 13, 2024',
      time: '7:00 PM',
      pickup: 'Downtown Station',
      dropoff: 'Airport Terminal',
      distance: 12.0,
      duration: '20 min',
      fare: 0,
      driver: 'Robert Wilson',
      rating: 0,
      status: 'cancelled',
      rideType: '🚕 Standard',
    },
    {
      id: '8',
      date: 'Mar 12, 2024',
      time: '1:45 PM',
      pickup: 'Office Building',
      dropoff: 'Client Meeting - Downtown',
      distance: 4.8,
      duration: '11 min',
      fare: 7.5,
      driver: 'Jennifer Moore',
      rating: 4,
      status: 'completed',
      rideType: '🚕 Standard',
    },
    {
      id: '9',
      date: 'Mar 12, 2024',
      time: '9:30 AM',
      pickup: 'Home - Oak Street',
      dropoff: 'Gym Center',
      distance: 3.2,
      duration: '8 min',
      fare: 5.5,
      driver: 'Alex Taylor',
      rating: 5,
      status: 'completed',
      rideType: '🚕 Standard',
    },
    {
      id: '10',
      date: 'Mar 11, 2024',
      time: '5:15 PM',
      pickup: 'Downtown Station',
      dropoff: 'Home - Oak Street',
      distance: 9.6,
      duration: '19 min',
      fare: 14.25,
      driver: 'Thomas Anderson',
      rating: 4,
      status: 'completed',
      rideType: '🚙 Premium',
    },
    {
      id: '11',
      date: 'Mar 11, 2024',
      time: '12:00 PM',
      pickup: 'Restaurant',
      dropoff: 'Shopping Mall',
      distance: 2.8,
      duration: '7 min',
      fare: 5.0,
      driver: 'Patricia Jackson',
      rating: 5,
      status: 'completed',
      rideType: '🚕 Standard',
    },
    {
      id: '12',
      date: 'Mar 10, 2024',
      time: '8:45 PM',
      pickup: 'Airport Terminal',
      dropoff: 'Home - Oak Street',
      distance: 25.4,
      duration: '35 min',
      fare: 0,
      driver: 'Charles White',
      rating: 0,
      status: 'no-show',
      rideType: '🚙 Premium',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'cancelled' | 'no-show'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'fare' | 'distance'>('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter rides
  const filteredRides = rides.filter((ride) => {
    const matchesSearch =
      ride.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.dropoff.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ride.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Sort rides
  const sortedRides = [...filteredRides].sort((a, b) => {
    if (sortBy === 'fare') return b.fare - a.fare;
    if (sortBy === 'distance') return b.distance - a.distance;
    return 0; // Recent is default order
  });

  // Pagination
  const totalPages = Math.ceil(sortedRides.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const displayedRides = sortedRides.slice(startIdx, startIdx + itemsPerPage);

  // Calculations
  const totalSpent = rides.filter((r) => r.status === 'completed').reduce((sum, r) => sum + r.fare, 0);
  const avgRating = (rides.filter((r) => r.rating > 0).reduce((sum, r) => sum + r.rating, 0) / rides.filter((r) => r.rating > 0).length).toFixed(1);
  const totalRides = rides.filter((r) => r.status === 'completed').length;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ride History</h1>
          <p className="text-gray-600">View and manage your past rides.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Rides', value: totalRides, icon: '🚕' },
            { label: 'Total Spent', value: `$${totalSpent.toFixed(2)}`, icon: '💰' },
            { label: 'Avg Rating', value: avgRating, icon: '⭐' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500">
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
                placeholder="Location, driver name..."
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
                <option value="no-show">No-Show</option>
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
                <option value="fare">Highest Fare</option>
                <option value="distance">Longest Distance</option>
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
                    {/* Route Info */}
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

                    {/* Time & Details */}
                    <div className="md:col-span-1">
                      <p className="text-sm text-gray-600">{ride.date}</p>
                      <p className="font-semibold text-gray-900">{ride.time}</p>
                      <p className="text-xs text-gray-500 mt-2">{ride.rideType}</p>
                    </div>

                    {/* Stats */}
                    <div className="md:col-span-1">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">{ride.distance} km</p>
                        <p className="font-semibold text-gray-900">⏱️ {ride.duration}</p>
                        {ride.status === 'completed' && (
                          <p className="text-sm font-bold text-green-600">${ride.fare.toFixed(2)}</p>
                        )}
                        {ride.status === 'cancelled' && <p className="text-sm font-bold text-red-600">Cancelled</p>}
                        {ride.status === 'no-show' && <p className="text-sm font-bold text-yellow-600">No-Show</p>}
                      </div>
                    </div>

                    {/* Driver & Rating */}
                    <div className="md:col-span-1">
                      {ride.status === 'completed' ? (
                        <div>
                          <p className="text-sm text-gray-600">Driver</p>
                          <p className="font-semibold text-gray-900">{ride.driver}</p>
                          <div className="flex items-center gap-1 mt-2">
                            {'⭐'.repeat(ride.rating)}
                            <span className="text-xs text-gray-500">({ride.rating}/5)</span>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-gray-600">Status</p>
                          <p className="font-semibold text-gray-900 capitalize">{ride.status}</p>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="md:col-span-0 flex justify-end">
                      {ride.status === 'completed' && (
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-blue-600 hover:text-blue-700">
                          📋 Details
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
              <p className="text-gray-600">No rides found matching your search criteria.</p>
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

        {/* Info Box */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-sm text-blue-900">
            <strong>💡 Tip:</strong> Download your receipt, rate your driver, or report an issue for any completed ride by
            clicking the Details button.
          </p>
        </div>
      </div>
    </div>
  );
}
