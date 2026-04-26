import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="p-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg shadow-lg p-12 text-white mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to RideFlow</h1>
        <p className="text-lg opacity-90 mb-8">
          Your modern ridesharing platform. Choose your role below to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Rider Card */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-blue-500">
          <div className="text-4xl mb-4">🧑</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Rider</h2>
          <p className="text-gray-600 mb-6">Request rides, view history, and manage your profile</p>
          <Link
            to="/rider/dashboard"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            Go to Rider Dashboard →
          </Link>
        </div>

        {/* Driver Card */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-green-500">
          <div className="text-4xl mb-4">🚗</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Driver</h2>
          <p className="text-gray-600 mb-6">Accept rides, track earnings, and manage your vehicle</p>
          <Link
            to="/driver/dashboard"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            Go to Driver Dashboard →
          </Link>
        </div>

        {/* Admin Card */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-purple-500">
          <div className="text-4xl mb-4">⚙️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin</h2>
          <p className="text-gray-600 mb-6">Manage users, rides, and system analytics</p>
          <Link
            to="/admin/dashboard"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            Go to Admin Dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
}
