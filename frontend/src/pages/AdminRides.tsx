import { useEffect, useState } from 'react';
import { rides } from '../utils/api';

interface Ride {
  id: number;
  date: string;
  time: string;
  rider: string;
  driver: string;
  pickup: string;
  dropoff: string;
  distance: string;
  fare: string;
  commission: string;
  status: 'Completed' | 'In Progress' | 'Cancelled';
}

function formatDateTime(rawDate?: string) {
  if (!rawDate) return { date: '-', time: '-' };
  const date = new Date(rawDate);
  if (Number.isNaN(date.getTime())) return { date: '-', time: '-' };
  return {
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
  };
}

export default function AdminRides() {
  const [allRides, setAllRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Completed' | 'In Progress' | 'Cancelled'>('all');
  const [filterRider, setFilterRider] = useState('');
  const [filterDriver, setFilterDriver] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'fare'>('newest');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    rides
      .list()
      .then((response) => {
        const data = response.data.data || [];
        setAllRides(
          data.map((item: any) => {
            const dateTime = formatDateTime(item.request_time);
            const fareValue = Number(item.fare) || 0;
            return {
              id: item.ride_id,
              date: dateTime.date,
              time: dateTime.time,
              rider: item.rider_id ? `Rider ${item.rider_id}` : 'Unassigned',
              driver: item.driver_id ? `Driver ${item.driver_id}` : 'Unassigned',
              pickup: item.pickup_location || 'Unknown pickup',
              dropoff: item.dropoff_location || 'Unknown dropoff',
              distance: '—',
              fare: `$${fareValue.toFixed(2)}`,
              commission: `$${(fareValue * 0.2).toFixed(2)}`,
              status:
                item.ride_status === 'completed'
                  ? 'Completed'
                  : item.ride_status === 'cancelled'
                  ? 'Cancelled'
                  : 'In Progress',
            };
          })
        );
      })
      .catch((err) => {
        console.error(err);
        setError('Unable to load rides. Backend may be offline.');
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredRides = allRides.filter((ride) => {
    const matchesStatus = filterStatus === 'all' || ride.status === filterStatus;
    const matchesRider = ride.rider.toLowerCase().includes(filterRider.toLowerCase());
    const matchesDriver = ride.driver.toLowerCase().includes(filterDriver.toLowerCase());
    const matchesSearch = ride.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.dropoff.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesRider && matchesDriver && matchesSearch;
  });

  const sortedRides = [...filteredRides].sort((a, b) => {
    if (sortBy === 'newest') return new Date(`${b.date} ${b.time}`).getTime() - new Date(`${a.date} ${a.time}`).getTime();
    if (sortBy === 'oldest') return new Date(`${a.date} ${a.time}`).getTime() - new Date(`${b.date} ${b.time}`).getTime();
    if (sortBy === 'fare') return parseFloat(b.fare.slice(1)) - parseFloat(a.fare.slice(1));
    return 0;
  });

  const itemsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(sortedRides.length / itemsPerPage));
  const paginatedRides = sortedRides.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const completedCount = allRides.filter((r) => r.status === 'Completed').length;
  const totalCommission = allRides.reduce((sum, ride) => sum + parseFloat(ride.commission.slice(1)), 0);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Rides</h1>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-500">
          <div className="text-gray-500 text-sm font-semibold mb-2">Total Rides</div>
          <div className="text-3xl font-bold text-gray-800">{loading ? 'Loading…' : allRides.length}</div>
          <div className="text-xs text-gray-400 mt-2">Live backend count</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-green-500">
          <div className="text-gray-500 text-sm font-semibold mb-2">Completed</div>
          <div className="text-3xl font-bold text-gray-800">{loading ? 'Loading…' : completedCount}</div>
          <div className="text-xs text-gray-400 mt-2">{loading ? '-' : `${Math.round((completedCount / Math.max(allRides.length, 1)) * 100)}% completion rate`}</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-yellow-500">
          <div className="text-gray-500 text-sm font-semibold mb-2">Platform Revenue</div>
          <div className="text-3xl font-bold text-gray-800">{loading ? 'Loading…' : `$${totalCommission.toFixed(2)}`}</div>
          <div className="text-xs text-gray-400 mt-2">Estimated 20% commission</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-purple-500">
          <div className="text-gray-500 text-sm font-semibold mb-2">Avg Ride Fare</div>
          <div className="text-3xl font-bold text-gray-800">{loading ? 'Loading…' : `$${(allRides.reduce((sum, r) => sum + parseFloat(r.fare.slice(1)), 0) / Math.max(allRides.length, 1)).toFixed(2)}`}</div>
          <div className="text-xs text-gray-400 mt-2">Estimated average fare</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Rides List</h2>
            <input
              type="text"
              placeholder="Search by location..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setFilterStatus('all');
                  setCurrentPage(1);
                }}
                className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                  filterStatus === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => {
                  setFilterStatus('Completed');
                  setCurrentPage(1);
                }}
                className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                  filterStatus === 'Completed'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => {
                  setFilterStatus('In Progress');
                  setCurrentPage(1);
                }}
                className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                  filterStatus === 'In Progress'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => {
                  setFilterStatus('Cancelled');
                  setCurrentPage(1);
                }}
                className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                  filterStatus === 'Cancelled'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Cancelled
              </button>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'fare')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="fare">Sort: Highest Fare</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Filter by rider name..."
              value={filterRider}
              onChange={(e) => {
                setFilterRider(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <input
              type="text"
              placeholder="Filter by driver name..."
              value={filterDriver}
              onChange={(e) => {
                setFilterDriver(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <div className="text-sm text-gray-600 py-2">
              Showing {paginatedRides.length} of {sortedRides.length} ride{sortedRides.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date/Time</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Rider</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Driver</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Route</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Distance</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Fare</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Commission</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRides.map((ride) => (
                <tr key={ride.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {ride.date}<br />
                    <span className="text-xs text-gray-500">{ride.time}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{ride.rider}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{ride.driver}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <div className="text-xs font-semibold">{ride.pickup}</div>
                    <div className="text-xs text-gray-500">↓ {ride.dropoff}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{ride.distance}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{ride.fare}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600">{ride.commission}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      ride.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : ride.status === 'In Progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {ride.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-6 border-t border-gray-200 flex justify-between items-center">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300"
            >
              ← Previous
            </button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
