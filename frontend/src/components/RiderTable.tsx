interface Rider {
  rider_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  payment_method: string;
  rating: number;
  status: 'active' | 'deleted';
  createdAt: string;
  updatedAt: string;
}

interface RiderTableProps {
  riders: Rider[];
  loading: boolean;
  onEdit: (rider: Rider) => void;
  onToggleStatus: (rider: Rider) => void;
}

export default function RiderTable({ riders, loading, onEdit, onToggleStatus }: RiderTableProps) {
  if (loading) {
    return (
      <div className="p-8 text-center text-sm text-gray-500">Loading riders from the backend...</div>
    );
  }

  if (riders.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-gray-500">No riders found. Add a new rider to get started.</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-0">
        <thead className="bg-gray-100 text-left text-xs font-semibold uppercase text-gray-600">
          <tr>
            <th className="px-5 py-3">Name</th>
            <th className="px-5 py-3">Email</th>
            <th className="px-5 py-3">Phone</th>
            <th className="px-5 py-3">Payment</th>
            <th className="px-5 py-3">Rating</th>
            <th className="px-5 py-3">Joined</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider) => (
            <tr key={rider.rider_id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-5 py-4 text-sm font-semibold text-gray-900">{rider.first_name} {rider.last_name}</td>
              <td className="px-5 py-4 text-sm text-gray-700">{rider.email}</td>
              <td className="px-5 py-4 text-sm text-gray-700">{rider.phone_number}</td>
              <td className="px-5 py-4 text-sm text-gray-700">{rider.payment_method}</td>
              <td className="px-5 py-4 text-sm text-gray-700">{rider.rating.toFixed(1)}</td>
              <td className="px-5 py-4 text-sm text-gray-700">{new Date(rider.createdAt).toLocaleDateString()}</td>
              <td className="px-5 py-4 text-sm">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${rider.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {rider.status === 'active' ? 'Active' : 'Deleted'}
                </span>
              </td>
              <td className="px-5 py-4 text-sm text-gray-700">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(rider)}
                    className="rounded-xl border border-blue-600 bg-white px-3 py-1 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleStatus(rider)}
                    className={`rounded-xl px-3 py-1 text-sm font-semibold transition ${rider.status === 'active' ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                  >
                    {rider.status === 'active' ? 'Mark Deleted' : 'Restore'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
