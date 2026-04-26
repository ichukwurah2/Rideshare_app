interface StatsWidgetProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  backgroundColor?: string;
  borderColor?: string;
}

export default function StatsWidget({
  title,
  value,
  subtitle,
  icon = '📊',
  trend,
  backgroundColor = 'bg-white',
  borderColor = 'border-blue-500',
}: StatsWidgetProps) {
  return (
    <div className={`${backgroundColor} rounded-lg shadow-sm border-l-4 ${borderColor} p-6 transition-all hover:shadow-md`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-sm font-semibold mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
            {trend && (
              <span
                className={`text-sm font-semibold ${
                  trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend.direction === 'up' ? '↑' : '↓'} {trend.value}%
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-gray-400 mt-2">{subtitle}</p>}
        </div>
        <div className="text-4xl opacity-20">{icon}</div>
      </div>
    </div>
  );
}

// Example component showing multiple stats
export function StatsGrid() {
  const stats = [
    {
      title: 'Total Rides',
      value: '24',
      subtitle: 'This month',
      icon: '🚕',
      trend: { value: 12, direction: 'up' as const },
      borderColor: 'border-blue-500',
    },
    {
      title: 'Total Spent',
      value: '$186.50',
      subtitle: 'This month',
      icon: '💰',
      trend: { value: 8, direction: 'up' as const },
      borderColor: 'border-green-500',
    },
    {
      title: 'Avg Rating',
      value: '4.8',
      subtitle: 'Out of 5',
      icon: '⭐',
      trend: { value: 2, direction: 'down' as const },
      borderColor: 'border-yellow-500',
    },
    {
      title: 'Miles Traveled',
      value: '156',
      subtitle: 'This month',
      icon: '🗺️',
      borderColor: 'border-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatsWidget key={index} {...stat} />
      ))}
    </div>
  );
}
