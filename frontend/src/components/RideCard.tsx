interface RideCardProps {
  pickup: string;
  dropoff: string;
  driver?: string;
  driverRating?: number;
  distance?: string;
  fare?: string;
  duration?: string;
  status?: 'completed' | 'in-progress' | 'cancelled' | 'available';
  vehicleType?: string;
  estimatedTime?: string;
  onAccept?: () => void;
  onCancel?: () => void;
  onView?: () => void;
  isCompact?: boolean;
}

export default function RideCard({
  pickup,
  dropoff,
  driver,
  driverRating,
  distance,
  fare,
  duration,
  status = 'available',
  vehicleType = 'Standard',
  estimatedTime,
  onAccept,
  onCancel,
  onView,
  isCompact = false,
}: RideCardProps) {
  const statusStyles = {
    completed: 'bg-green-100 text-green-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
    available: 'bg-yellow-100 text-yellow-800',
  };

  const statusIcons = {
    completed: '✓',
    'in-progress': '🔄',
    cancelled: '✕',
    available: '⏳',
  };

  if (isCompact) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">{pickup}</p>
            <p className="text-xs text-gray-500">→</p>
            <p className="text-sm font-semibold text-gray-900">{dropoff}</p>
          </div>
          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${statusStyles[status]}`}>
            {statusIcons[status]} {status}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          {distance && <span className="text-gray-600">{distance}</span>}
          {fare && <span className="font-bold text-gray-900">{fare}</span>}
        </div>

        {onView && (
          <button
            onClick={onView}
            className="w-full mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            View Details
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border-l-4 border-blue-500 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">📍</span>
            <div>
              <p className="text-xs text-gray-500 font-semibold">PICKUP</p>
              <p className="font-semibold text-gray-900">{pickup}</p>
            </div>
          </div>

          <div className="ml-5 my-2 border-l-2 border-gray-300 h-6"></div>

          <div className="flex items-center gap-2">
            <span className="text-xl">🎯</span>
            <div>
              <p className="text-xs text-gray-500 font-semibold">DROPOFF</p>
              <p className="font-semibold text-gray-900">{dropoff}</p>
            </div>
          </div>
        </div>

        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusStyles[status]}`}>
          {statusIcons[status]} {status.replace('-', ' ')}
        </span>
      </div>

      {/* Middle Section - Ride Details */}
      <div className="grid grid-cols-3 gap-3 py-4 border-t border-b border-gray-200 mb-4">
        {distance && (
          <div className="text-center">
            <p className="text-xs text-gray-500">Distance</p>
            <p className="font-semibold text-gray-900">{distance}</p>
          </div>
        )}
        {duration && (
          <div className="text-center">
            <p className="text-xs text-gray-500">Duration</p>
            <p className="font-semibold text-gray-900">{duration}</p>
          </div>
        )}
        {fare && (
          <div className="text-center">
            <p className="text-xs text-gray-500">Fare</p>
            <p className="font-bold text-gray-900">{fare}</p>
          </div>
        )}
      </div>

      {/* Driver Section */}
      {driver && (
        <div className="mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {driver.split(' ')[0][0]}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{driver}</p>
                <p className="text-xs text-gray-500">{vehicleType}</p>
              </div>
            </div>
            {driverRating && (
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">⭐ {driverRating}</p>
                <p className="text-xs text-gray-500">Rating</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Additional Info */}
      {estimatedTime && (
        <p className="text-sm text-gray-600 mb-4">
          <span className="text-lg">⏱️</span> Estimated arrival: <span className="font-semibold">{estimatedTime}</span>
        </p>
      )}

      {/* Actions */}
      {(onAccept || onCancel || onView) && (
        <div className="flex gap-3">
          {onAccept && (
            <button
              onClick={onAccept}
              className="flex-1 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
            >
              ✓ Accept
            </button>
          )}
          {onCancel && (
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-lg transition-colors"
            >
              ✕ Decline
            </button>
          )}
          {onView && (
            <button
              onClick={onView}
              className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
            >
              → View
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Example component showing multiple ride cards
export function RideCardList() {
  const rides = [
    {
      id: 1,
      pickup: '123 Main St',
      dropoff: '456 Park Ave',
      distance: '2.5 mi',
      duration: '12 min',
      fare: '$12.50',
      status: 'completed' as const,
      driver: 'John D.',
      driverRating: 4.8,
      vehicleType: 'Honda Civic',
    },
    {
      id: 2,
      pickup: '789 Oak Ln',
      dropoff: '321 Pine St',
      distance: '4.2 mi',
      duration: '18 min',
      fare: '$18.75',
      status: 'in-progress' as const,
      driver: 'Sarah M.',
      driverRating: 4.9,
      vehicleType: 'Toyota Camry',
      estimatedTime: '3 min',
    },
    {
      id: 3,
      pickup: '555 Elm St',
      dropoff: '777 Maple Ave',
      distance: '1.8 mi',
      duration: '8 min',
      fare: '$9.25',
      status: 'available' as const,
      onAccept: () => console.log('Ride accepted'),
      onCancel: () => console.log('Ride declined'),
    },
  ];

  return (
    <div className="space-y-4">
      {rides.map((ride) => (
        <RideCard key={ride.id} {...ride} />
      ))}
    </div>
  );
}
