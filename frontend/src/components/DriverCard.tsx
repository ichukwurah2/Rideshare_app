interface DriverCardProps {
  name: string;
  rating: number;
  totalRides: number;
  vehicle: string;
  licensePlate?: string;
  profileImage?: string;
  status?: 'online' | 'offline' | 'busy';
  earnings?: string;
  acceptanceRate?: number;
  isCompact?: boolean;
  onSelect?: () => void;
  onMessage?: () => void;
  onRate?: () => void;
}

export default function DriverCard({
  name,
  rating,
  totalRides,
  vehicle,
  licensePlate,
  profileImage,
  status = 'online',
  earnings,
  acceptanceRate,
  isCompact = false,
  onSelect,
  onMessage,
  onRate,
}: DriverCardProps) {
  const statusStyles = {
    online: 'bg-green-100 text-green-800',
    offline: 'bg-gray-100 text-gray-800',
    busy: 'bg-yellow-100 text-yellow-800',
  };

  const statusBgDot = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    busy: 'bg-yellow-500',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  if (isCompact) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={onSelect}>
        <div className="flex items-start gap-3 mb-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg relative ${
            !profileImage ? 'bg-gradient-to-br from-blue-400 to-blue-600' : ''
          }`}>
            {profileImage ? <img src={profileImage} alt={name} className="w-full h-full rounded-full object-cover" /> : getInitials(name)}
            <span className={`absolute bottom-0 right-0 w-3 h-3 ${statusBgDot[status]} rounded-full border-2 border-white`}></span>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900">{name}</p>
            <p className="text-sm text-gray-500">{vehicle}</p>
          </div>
        </div>

        <div className="flex justify-between text-sm mb-3">
          <div>
            <p className="text-xs text-gray-500">Rating</p>
            <p className="font-bold text-gray-900">⭐ {rating}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Rides</p>
            <p className="font-bold text-gray-900">{totalRides}</p>
          </div>
        </div>

        {onSelect && (
          <button
            onClick={onSelect}
            className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Select
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border-l-4 border-blue-500 p-6 hover:shadow-md transition-shadow">
      {/* Header with Status */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-4 flex-1">
          {/* Profile Image */}
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl relative flex-shrink-0 ${
            !profileImage ? 'bg-gradient-to-br from-blue-400 to-blue-600' : ''
          }`}>
            {profileImage ? <img src={profileImage} alt={name} className="w-full h-full rounded-full object-cover" /> : getInitials(name)}
            <span className={`absolute bottom-0 right-0 w-4 h-4 ${statusBgDot[status]} rounded-full border-2 border-white`}></span>
          </div>

          {/* Driver Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-gray-900">{name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusStyles[status]}`}>
                {status}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-2">{vehicle}</p>
            {licensePlate && <p className="text-gray-500 text-xs">License: {licensePlate}</p>}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 py-4 border-t border-b border-gray-200 mb-4">
        <div className="text-center">
          <p className="text-xs text-gray-500">Rating</p>
          <p className="text-2xl font-bold text-gray-900">⭐</p>
          <p className="font-bold text-gray-900">{rating}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Total Rides</p>
          <p className="text-2xl font-bold text-gray-900">🚕</p>
          <p className="font-bold text-gray-900">{totalRides}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Acceptance</p>
          <p className="text-2xl font-bold text-gray-900">✓</p>
          <p className="font-bold text-gray-900">{acceptanceRate || '98'}%</p>
        </div>
      </div>

      {/* Additional Info */}
      {earnings && (
        <p className="text-sm text-gray-600 mb-4">
          <span className="text-lg">💰</span> Monthly Earnings: <span className="font-bold text-green-600">{earnings}</span>
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        {onMessage && (
          <button
            onClick={onMessage}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>💬</span> Message
          </button>
        )}
        {onRate && (
          <button
            onClick={onRate}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>⭐</span> Rate
          </button>
        )}
        {onSelect && (
          <button
            onClick={onSelect}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
          >
            Select
          </button>
        )}
      </div>
    </div>
  );
}

// Example component showing multiple driver cards
export function DriverCardGrid() {
  const drivers = [
    {
      id: 1,
      name: 'James Miller',
      rating: 4.9,
      totalRides: 142,
      vehicle: '2022 Honda Civic',
      licensePlate: 'ABC-1234',
      status: 'online' as const,
      earnings: '$3,245.80',
      acceptanceRate: 98,
    },
    {
      id: 2,
      name: 'Lisa Kim',
      rating: 4.7,
      totalRides: 98,
      vehicle: '2023 Toyota Camry',
      licensePlate: 'XYZ-5678',
      status: 'online' as const,
      earnings: '$2,156.40',
      acceptanceRate: 96,
    },
    {
      id: 3,
      name: 'Angela P.',
      rating: 4.95,
      totalRides: 186,
      vehicle: '2023 Hyundai Elantra',
      licensePlate: 'DEF-9012',
      status: 'busy' as const,
      earnings: '$4,521.20',
      acceptanceRate: 99,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {drivers.map((driver) => (
        <DriverCard
          key={driver.id}
          {...driver}
          onMessage={() => console.log('Message', driver.name)}
          onRate={() => console.log('Rate', driver.name)}
          onSelect={() => console.log('Select', driver.name)}
        />
      ))}
    </div>
  );
}
