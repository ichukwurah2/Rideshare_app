import { useState } from 'react';
import StatsWidget from '../components/StatsWidget';

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [currentRide] = useState({
    id: 'R001',
    pickup: '123 Main Street',
    dropoff: '456 Park Avenue',
    distance: 8.5,
    duration: '18 min',
    fare: 15.75,
    riderName: 'Sarah Johnson',
    riderRating: 4.9,
    riderImage: '👩',
    status: 'in-progress',
    pickupTime: '2:15 PM',
  });

  const [stats] = useState({
    ridestoday: 12,
    earningsToday: 142.5,
    rating: 4.8,
    acceptanceRate: 94,
  });

  const [recentEarnings] = useState([
    { id: 1, time: '2:30 PM', fare: 18.75, distance: 12.5 },
    { id: 2, time: '1:45 PM', fare: 12.50, distance: 8.2 },
    { id: 3, time: '1:00 PM', fare: 22.00, distance: 15.8 },
  ]);

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header with Status Toggle */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Driver Dashboard</h1>
            <p className="text-gray-600">Manage your ride requests and earnings.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <p className="text-lg font-bold text-gray-900">
                  {isOnline ? '🟢 Online' : '🔴 Offline'}
                </p>
              </div>
              <button
                onClick={toggleOnlineStatus}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  isOnline
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isOnline ? 'Go Offline' : 'Go Online'}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Current Ride & Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Ride */}
            {isOnline && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Ride</h2>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 mb-4">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl">{currentRide.riderImage}</span>
                    <div>
                      <p className="text-sm text-gray-600">Rider</p>
                      <p className="font-bold text-gray-900">{currentRide.riderName}</p>
                      <p className="text-sm text-gray-600">⭐ {currentRide.riderRating}/5</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-600">From</p>
                      <p className="font-semibold text-gray-900">{currentRide.pickup}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">To</p>
                      <p className="font-semibold text-gray-900">{currentRide.dropoff}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-blue-600">{currentRide.distance} km</p>
                      <p className="text-xs text-gray-600">Distance</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-blue-600">{currentRide.duration}</p>
                      <p className="text-xs text-gray-600">Time Est.</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-green-600">${currentRide.fare}</p>
                      <p className="text-xs text-gray-600">Fare</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                    ✓ Arrived
                  </button>
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                    ✕ Cancel Ride
                  </button>
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                    📞 Contact
                  </button>
                </div>
              </div>
            )}

            {!isOnline && (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center py-12">
                <p className="text-3xl mb-3">🔴</p>
                <p className="text-xl font-bold text-gray-900 mb-2">You're Offline</p>
                <p className="text-gray-600 mb-6">Go online to receive new ride requests</p>
                <button
                  onClick={toggleOnlineStatus}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                >
                  🟢 Go Online
                </button>
              </div>
            )}

            {/* Today's Stats */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Performance</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatsWidget
                  title="Rides Today"
                  value={stats.ridestoday}
                  icon="🚕"
                  borderColor="border-blue-500"
                />
                <StatsWidget
                  title="Rating"
                  value={`${stats.rating}⭐`}
                  icon="⭐"
                  borderColor="border-yellow-500"
                />
                <StatsWidget
                  title="Earnings Today"
                  value={`$${stats.earningsToday}`}
                  icon="💰"
                  borderColor="border-green-500"
                />
                <StatsWidget
                  title="Acceptance Rate"
                  value={`${stats.acceptanceRate}%`}
                  icon="✓"
                  borderColor="border-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Quick Stats & Actions */}
          <div className="space-y-6">
            {/* Quick Stats Card */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600">Online Time</span>
                  <span className="font-bold text-gray-900">6h 24m</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600">Next Goal</span>
                  <span className="font-bold text-gray-900">2 rides</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600">Bonus Available</span>
                  <span className="font-bold text-green-600">$5.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Cancellations</span>
                  <span className="font-bold text-gray-900">0</span>
                </div>
              </div>
            </div>

            {/* Recent Earnings */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Earnings</h3>
              <div className="space-y-3">
                {recentEarnings.map((earning) => (
                  <div key={earning.id} className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-b-0">
                    <div>
                      <p className="text-sm text-gray-600">{earning.time}</p>
                      <p className="text-xs text-gray-500">{earning.distance} km</p>
                    </div>
                    <p className="font-bold text-green-600">${earning.fare}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-3 px-4 rounded-lg transition-colors text-left">
                  📝 View Documents
                </button>
                <button className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold py-3 px-4 rounded-lg transition-colors text-left">
                  📊 Earnings Report
                </button>
                <button className="w-full bg-red-50 hover:bg-red-100 text-red-700 font-semibold py-3 px-4 rounded-lg transition-colors text-left">
                  ⚙️ Settings
                </button>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>💡 Tip:</strong> Complete more rides to unlock bonus earnings and tier benefits!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
