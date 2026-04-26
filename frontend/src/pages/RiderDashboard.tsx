import { useState } from 'react';
import { Link } from 'react-router-dom';
import StatsWidget from '../components/StatsWidget';
import RideCard from '../components/RideCard';

export default function RiderDashboard() {
  const [currentRide] = useState({
    id: 1,
    pickup: '123 Main St, Downtown',
    dropoff: '456 Park Ave, Midtown',
    driver: 'James Miller',
    driverRating: 4.9,
    vehicle: '2022 Honda Civic Blue',
    licensePlate: 'ABC-1234',
    estimatedTime: '5 minutes',
    distance: '2.5 mi',
    duration: '12 min',
    fare: '$12.50',
    status: 'in-progress' as const,
  });

  const recentRides = [
    {
      id: 2,
      pickup: '789 Oak Ln',
      dropoff: '321 Pine St',
      distance: '4.2 mi',
      duration: '18 min',
      fare: '$18.75',
      status: 'completed' as const,
      driver: 'Sarah M.',
      driverRating: 4.9,
      vehicleType: 'Toyota Camry',
    },
    {
      id: 3,
      pickup: '555 Elm St',
      dropoff: '777 Maple Ave',
      distance: '1.8 mi',
      duration: '8 min',
      fare: '$9.25',
      status: 'completed' as const,
      driver: 'Mike R.',
      driverRating: 4.5,
      vehicleType: 'Ford Focus',
    },
    {
      id: 4,
      pickup: '999 Cedar Blvd',
      dropoff: '111 Birch St',
      distance: '3.2 mi',
      duration: '14 min',
      fare: '$14.80',
      status: 'completed' as const,
      driver: 'Emma W.',
      driverRating: 5.0,
      vehicleType: 'Honda Accord',
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rider Dashboard</h1>
          <p className="text-gray-600">Welcome back, John! Here's your ride information.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsWidget
            title="Total Rides"
            value="24"
            subtitle="This month"
            icon="🚕"
            trend={{ value: 12, direction: 'up' }}
            borderColor="border-blue-500"
          />
          <StatsWidget
            title="Total Spent"
            value="$186.50"
            subtitle="This month"
            icon="💰"
            trend={{ value: 8, direction: 'up' }}
            borderColor="border-green-500"
          />
          <StatsWidget
            title="Avg Rating"
            value="4.8"
            subtitle="Out of 5"
            icon="⭐"
            trend={{ value: 2, direction: 'down' }}
            borderColor="border-yellow-500"
          />
          <StatsWidget
            title="Miles"
            value="156"
            subtitle="This month"
            icon="🗺️"
            borderColor="border-purple-500"
          />
        </div>

        {/* Current Ride Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Active Ride</h2>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
              🟢 In Progress
            </span>
          </div>
          <RideCard
            {...currentRide}
            onView={() => console.log('View ride details')}
          />
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/rider/request-ride"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors text-center"
            >
              🚕 Request New Ride
            </Link>
            <button className="bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 px-6 rounded-lg border border-gray-300 transition-colors">
              💬 Contact Driver
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 px-6 rounded-lg border border-gray-300 transition-colors">
              ⭐ Rate Driver
            </button>
          </div>
        </section>

        {/* Recent Rides */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Rides</h2>
            <Link
              to="/rider/history"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {recentRides.map((ride) => (
              <RideCard key={ride.id} {...ride} isCompact={true} />
            ))}
          </div>
        </section>

        {/* Help Section */}
        <section className="mt-12 bg-blue-50 rounded-lg border border-blue-200 p-6">
          <div className="flex items-start gap-4">
            <span className="text-3xl">💡</span>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                Have a question about your ride? Check out our support center or contact our customer service team.
              </p>
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                  Help Center
                </button>
                <button className="px-4 py-2 bg-white hover:bg-gray-50 text-blue-600 font-semibold rounded-lg border border-blue-300 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
