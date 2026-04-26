import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { StatsGrid } from '../components/StatsWidget';
import { RideCardList } from '../components/RideCard';
import { DriverCardGrid } from '../components/DriverCard';
import FilterPanel from '../components/FilterPanel';
import { useState } from 'react';

export default function ComponentShowcase() {
  const [_filters, _setFilters] = useState({});
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      <div className="flex pt-0">
        {/* Sidebar */}
        <Sidebar isOpen={true} />

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Component Showcase</h1>
              <p className="text-gray-600">Explore all the layout components for RideFlow</p>
            </div>

            {/* Stats Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Stats Widgets</h2>
              <StatsGrid />
            </section>

            {/* Rides Section with Filter */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Rides</h2>
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  {showFilter ? '✕ Hide Filters' : '🔍 Show Filters'}
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                  {showFilter && <FilterPanel isCompact={true} onApply={_setFilters} />}
                </div>
                <div className="lg:col-span-3">
                  <RideCardList />
                </div>
              </div>
            </section>

            {/* Drivers Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Drivers</h2>
              <DriverCardGrid />
            </section>

            {/* Component Props Documentation */}
            <section className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Component Documentation</h2>

              <div className="space-y-8">
                {/* Navbar */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">📱 Navbar</h3>
                  <p className="text-gray-600 mb-3">
                    Sticky top navigation bar with search, notifications, and profile menu.
                  </p>
                  <div className="bg-gray-50 p-4 rounded border border-gray-200 text-sm font-mono text-gray-700">
                    &lt;Navbar /&gt;
                  </div>
                </div>

                {/* Sidebar */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">🗂️ Sidebar</h3>
                  <p className="text-gray-600 mb-3">
                    Collapsible navigation sidebar with role-based route sections (Rider, Driver, Admin).
                  </p>
                  <div className="bg-gray-50 p-4 rounded border border-gray-200 text-sm font-mono text-gray-700 overflow-auto">
                    &lt;Sidebar isOpen={'{true}'} /&gt;
                  </div>
                </div>

                {/* StatsWidget */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">📊 StatsWidget</h3>
                  <p className="text-gray-600 mb-3">
                    Display metric cards with optional trend indicators. Use `StatsGrid` for multiple widgets.
                  </p>
                  <div className="bg-gray-50 p-4 rounded border border-gray-200 text-sm font-mono text-gray-700 overflow-auto">
{`<StatsWidget
  title="Total Rides"
  value="24"
  subtitle="This month"
  icon="🚕"
  trend={{ value: 12, direction: 'up' }}
  borderColor="border-blue-500"
/>`}
                  </div>
                </div>

                {/* RideCard */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">🚕 RideCard</h3>
                  <p className="text-gray-600 mb-3">
                    Display ride information with pickup/dropoff, fare details, and status. Use `isCompact={'{true}'}` for condensed view.
                  </p>
                  <div className="bg-gray-50 p-4 rounded border border-gray-200 text-sm font-mono text-gray-700 overflow-auto">
{`<RideCard
  pickup="123 Main St"
  dropoff="456 Park Ave"
  distance="2.5 mi"
  duration="12 min"
  fare="$12.50"
  status="completed"
  driver="John D."
  driverRating={4.8}
  onView={() => {}}
/>`}
                  </div>
                </div>

                {/* DriverCard */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">👤 DriverCard</h3>
                  <p className="text-gray-600 mb-3">
                    Display driver profile with rating, vehicle info, and earnings. Use `isCompact={'{true}'}` for condensed view.
                  </p>
                  <div className="bg-gray-50 p-4 rounded border border-gray-200 text-sm font-mono text-gray-700 overflow-auto">
{`<DriverCard
  name="James Miller"
  rating={4.9}
  totalRides={142}
  vehicle="2022 Honda Civic"
  licensePlate="ABC-1234"
  status="online"
  earnings="$3,245.80"
  acceptanceRate={98}
  onMessage={() => {}}
  onRate={() => {}}
/>`}
                  </div>
                </div>

                {/* FilterPanel */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">🔍 FilterPanel</h3>
                  <p className="text-gray-600 mb-3">
                    Filterable panel with price range, vehicle type, status, rating, and sort options. Use `isCompact={'{true}'}` for condensed view.
                  </p>
                  <div className="bg-gray-50 p-4 rounded border border-gray-200 text-sm font-mono text-gray-700 overflow-auto">
{`<FilterPanel
  title="Filters"
  isCompact={false}
  onApply={(filters) => console.log(filters)}
  onReset={() => {}}
/>`}
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-12 text-center text-gray-500 text-sm">
              <p>All components are fully responsive and built with Tailwind CSS</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
