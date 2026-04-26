import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  const riderLinks = [
    { path: '/rider/dashboard', label: 'Dashboard' },
    { path: '/rider/request-ride', label: 'Request Ride' },
    { path: '/rider/history', label: 'History' },
    { path: '/rider/profile', label: 'Profile' },
  ];

  const driverLinks = [
    { path: '/driver/dashboard', label: 'Dashboard' },
    { path: '/driver/pending-rides', label: 'Pending Rides' },
    { path: '/driver/history', label: 'History' },
    { path: '/driver/profile', label: 'Profile' },
  ];

  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/riders', label: 'Riders' },
    { path: '/admin/drivers', label: 'Drivers' },
    { path: '/admin/rides', label: 'Rides' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-blue-900 text-white transition-all duration-300 overflow-y-auto flex flex-col border-r border-blue-800`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-blue-800 flex items-center justify-between">
          <h1 className={`font-bold text-xl ${!sidebarOpen && 'hidden'}`}>
            RideFlow
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-blue-800 rounded transition-colors"
          >
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>

        {/* Home Link */}
        <div className="p-4 border-b border-blue-800">
          <Link
            to="/"
            className={`flex items-center gap-3 p-2 rounded hover:bg-blue-800 transition-colors ${
              location.pathname === '/' ? 'bg-blue-700' : ''
            }`}
          >
            <span className="text-xl">🏠</span>
            {sidebarOpen && <span>Home</span>}
          </Link>
        </div>

        {/* Rider Section */}
        <div className="p-4 border-b border-blue-800">
          {sidebarOpen && <h3 className="text-sm font-semibold text-blue-300 mb-2">RIDER</h3>}
          <nav className="space-y-1">
            {riderLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 p-2 rounded transition-colors ${
                  isActive(link.path)
                    ? 'bg-blue-700'
                    : 'hover:bg-blue-800'
                }`}
              >
                <span className="text-lg">🧑</span>
                {sidebarOpen && <span className="text-sm">{link.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Driver Section */}
        <div className="p-4 border-b border-blue-800">
          {sidebarOpen && <h3 className="text-sm font-semibold text-blue-300 mb-2">DRIVER</h3>}
          <nav className="space-y-1">
            {driverLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 p-2 rounded transition-colors ${
                  isActive(link.path)
                    ? 'bg-blue-700'
                    : 'hover:bg-blue-800'
                }`}
              >
                <span className="text-lg">🚗</span>
                {sidebarOpen && <span className="text-sm">{link.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Admin Section */}
        <div className="p-4 border-b border-blue-800">
          {sidebarOpen && <h3 className="text-sm font-semibold text-blue-300 mb-2">ADMIN</h3>}
          <nav className="space-y-1">
            {adminLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 p-2 rounded transition-colors ${
                  isActive(link.path)
                    ? 'bg-blue-700'
                    : 'hover:bg-blue-800'
                }`}
              >
                <span className="text-lg">⚙️</span>
                {sidebarOpen && <span className="text-sm">{link.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Logout */}
        <div className="p-4 border-t border-blue-800">
          <button className="w-full flex items-center gap-3 p-2 rounded hover:bg-blue-800 transition-colors text-left">
            <span className="text-lg">🚪</span>
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, User</span>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              U
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
