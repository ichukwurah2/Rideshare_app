import { useEffect, useState } from 'react';
import { drivers } from '../utils/api';

interface Driver {
  id: number;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  totalRides: number;
  earnings: string;
  rating: number;
  status: 'Active' | 'Deactivated';
  isOnline: boolean;
}

export default function AdminDrivers() {
  const [allDrivers, setAllDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Active' | 'Deactivated'>('all');
  const [filterAvailable, setFilterAvailable] = useState<'all' | 'online' | 'offline'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [adding, setAdding] = useState(false);

  const loadDrivers = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await drivers.list();
      const data = response.data.data || [];
      setAllDrivers(
        data.map((item: any) => ({
          id: item.driver_id,
          name: `${item.first_name} ${item.last_name}`,
          email: item.email,
          phone: item.phone_number,
          vehicle: `${item.vehicle_make} ${item.vehicle_model}`,
          totalRides: 0,
          earnings: '$0.00',
          rating: item.rating ?? 0,
          status: item.status === 'active' ? 'Active' : 'Deactivated',
          isOnline: item.availability_status === 'available',
        }))
      );
    } catch (err) {
      console.error(err);
      setError('Unable to load drivers. Backend may be offline.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  const handleAddDriver = async () => {
    setAdding(true);
    setError('');

    try {
      await drivers.create({
        first_name: 'Test',
        last_name: 'Driver',
        email: `test.driver.${Date.now()}@example.com`,
        phone_number: '555-0100',
        vehicle_make: 'Toyota',
        vehicle_model: 'Corolla',
        license_plate: `TD${Math.floor(Math.random() * 9000) + 1000}`,
        availability_status: 'available',
        rating: 4.5,
        status: 'active',
      });
      await loadDrivers();
    } catch (err) {
      console.error(err);
      setError('Unable to create dummy driver. Please try again.');
    } finally {
      setAdding(false);
    }
  };

  const filteredDrivers = allDrivers.filter((driver) => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || driver.status === filterStatus;
    const matchesAvailable =
      filterAvailable === 'all' ||
      (filterAvailable === 'online' && driver.isOnline) ||
      (filterAvailable === 'offline' && !driver.isOnline);
    return matchesSearch && matchesStatus && matchesAvailable;
  });

  const itemsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(filteredDrivers.length / itemsPerPage));
  const paginatedDrivers = filteredDrivers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const onlineCount = allDrivers.filter((driver) => driver.isOnline).length;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Drivers</h1>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-500">
          <div className="text-gray-500 text-sm font-semibold mb-2">Total Drivers</div>
          <div className="text-3xl font-bold text-gray-800">{loading ? 'Loading…' : allDrivers.length}</div>
          <div className="text-xs text-gray-400 mt-2">Live driver count</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-green-500">
          <div className="text-gray-500 text-sm font-semibold mb-2">Active & Online</div>
          <div className="text-3xl font-bold text-gray-800">{loading ? 'Loading…' : onlineCount}</div>
          <div className="text-xs text-gray-400 mt-2">{loading ? '-' : `${Math.round((onlineCount / Math.max(allDrivers.length, 1)) * 100)}% online`}</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-yellow-500">
          <div className="text-gray-500 text-sm font-semibold mb-2">Avg Rating</div>
          <div className="text-3xl font-bold text-gray-800">{loading ? 'Loading…' : (allDrivers.reduce((sum, d) => sum + d.rating, 0) / Math.max(allDrivers.length, 1)).toFixed(2)}⭐</div>
          <div className="text-xs text-gray-400 mt-2">Driver score</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 space-y-4">
          <div className="flex justify-between items-center gap-4 flex-col sm:flex-row">
            <div className="flex items-center gap-4 flex-wrap">
              <h2 className="text-xl font-bold text-gray-800">Drivers List</h2>
              <button
                onClick={handleAddDriver}
                disabled={adding}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                {adding ? 'Adding…' : 'Add Driver'}
              </button>
            </div>
            <input
              type="text"
              placeholder="Search by name or email..."
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
                  setFilterStatus('Active');
                  setCurrentPage(1);
                }}
                className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                  filterStatus === 'Active'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => {
                  setFilterStatus('Deactivated');
                  setCurrentPage(1);
                }}
                className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                  filterStatus === 'Deactivated'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Deactivated
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setFilterAvailable('all');
                  setCurrentPage(1);
                }}
                className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                  filterAvailable === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Any Status
              </button>
              <button
                onClick={() => {
                  setFilterAvailable('online');
                  setCurrentPage(1);
                }}
                className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                  filterAvailable === 'online'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Online
              </button>
              <button
                onClick={() => {
                  setFilterAvailable('offline');
                  setCurrentPage(1);
                }}
                className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                  filterAvailable === 'offline'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Offline
              </button>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Showing {paginatedDrivers.length} of {filteredDrivers.length} driver{filteredDrivers.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Rides</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Earnings</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Availability</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-sm text-gray-500">
                    Loading drivers...
                  </td>
                </tr>
              ) : filteredDrivers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-sm text-gray-500">
                    No drivers found.
                  </td>
                </tr>
              ) : (
                paginatedDrivers.map((driver) => (
                  <tr key={driver.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">{driver.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{driver.vehicle}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{driver.totalRides}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">⭐ {driver.rating}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-600">{driver.earnings}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        driver.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {driver.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        driver.isOnline
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {driver.isOnline ? '🟢 Online' : '⚪ Offline'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800 font-semibold">View</button>
                        <button className="text-purple-600 hover:text-purple-800 font-semibold">Toggle</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
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
