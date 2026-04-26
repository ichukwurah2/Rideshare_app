import { useEffect, useState } from 'react';
import { dashboard } from '../utils/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRiders: 0,
    totalDrivers: 0,
    totalRides: 0,
    ridesByStatus: {} as Record<string, number>,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    dashboard
      .stats()
      .then((response) => {
        const payload = response.data.data || {};
        setStats({
          totalRiders: payload.totalRiders ?? 0,
          totalDrivers: payload.totalDrivers ?? 0,
          totalRides: payload.totalRides ?? 0,
          ridesByStatus: payload.ridesByStatus ?? {},
        });
      })
      .catch((err) => {
        console.error(err);
        setError('Unable to load dashboard stats. Backend may be offline.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-500">
          <div className="text-gray-500 text-sm font-semibold mb-2">Total Riders</div>
          <div className="text-3xl font-bold text-gray-800">{loading ? 'Loading…' : stats.totalRiders}</div>
          <div className="text-xs text-gray-400 mt-2">Live backend count</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-green-500">
          <div className="text-gray-500 text-sm font-semibold mb-2">Active Drivers</div>
          <div className="text-3xl font-bold text-gray-800">{loading ? 'Loading…' : stats.totalDrivers}</div>
          <div className="text-xs text-gray-400 mt-2">Live backend count</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-yellow-500">
          <div className="text-gray-500 text-sm font-semibold mb-2">Total Rides</div>
          <div className="text-3xl font-bold text-gray-800">{loading ? 'Loading…' : stats.totalRides}</div>
          <div className="text-xs text-gray-400 mt-2">Live backend count</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-purple-500">
          <div className="text-gray-500 text-sm font-semibold mb-2">Requested Rides</div>
          <div className="text-3xl font-bold text-gray-800">{loading ? 'Loading…' : stats.ridesByStatus.requested ?? 0}</div>
          <div className="text-xs text-gray-400 mt-2">Awaiting driver assignment</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Ride Status Breakdown</h2>
          <div className="space-y-4">
            {['requested', 'assigned', 'completed', 'cancelled'].map((status) => (
              <div key={status} className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                <span className="capitalize text-gray-700">{status.replace('-', ' ')}</span>
                <span className="font-semibold text-gray-900">{loading ? '…' : stats.ridesByStatus[status] ?? 0}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Revenue Analytics</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600">Total Revenue</span>
              <span className="text-2xl font-bold text-green-600">$24,580</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600">Platform Commission (20%)</span>
              <span className="font-semibold text-gray-800">$4,916</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600">Driver Earnings (80%)</span>
              <span className="font-semibold text-gray-800">$19,664</span>
            </div>
            <div className="flex justify-between items-center pt-3">
              <span className="text-gray-600">This Week</span>
              <span className="text-lg font-bold text-blue-600">↑ +12%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">✓</div>
                <div>
                  <p className="font-semibold text-gray-800">New Driver Registered: James M.</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
              <span className="text-blue-600 hover:text-blue-800">View →</span>
            </div>
          </div>
          <div className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">📞</div>
                <div>
                  <p className="font-semibold text-gray-800">Support Ticket Opened #1245</p>
                  <p className="text-sm text-gray-500">4 hours ago</p>
                </div>
              </div>
              <span className="text-blue-600 hover:text-blue-800">View →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
