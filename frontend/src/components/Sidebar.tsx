import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen?: boolean;
}

export default function Sidebar({ isOpen = true }: SidebarProps) {
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState<string>('rider');

  const isActive = (path: string) => location.pathname.startsWith(path);

  const riderLinks = [
    { path: '/rider/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/rider/request-ride', label: 'Request Ride', icon: '🚕' },
    { path: '/rider/history', label: 'History', icon: '📋' },
    { path: '/rider/profile', label: 'Profile', icon: '👤' },
  ];

  const driverLinks = [
    { path: '/driver/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/driver/pending-rides', label: 'Pending Rides', icon: '⏳' },
    { path: '/driver/history', label: 'History', icon: '📋' },
    { path: '/driver/profile', label: 'Profile', icon: '👤' },
  ];

  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/riders', label: 'Riders', icon: '👥' },
    { path: '/admin/drivers', label: 'Drivers', icon: '🚗' },
    { path: '/admin/rides', label: 'Rides', icon: '🚕' },
  ];

  const SidebarSection = ({
    title,
    links,
    sectionId,
  }: {
    title: string;
    links: typeof riderLinks;
    sectionId: string;
  }) => (
    <div className="mb-2">
      <button
        onClick={() => setExpandedSection(expandedSection === sectionId ? '' : sectionId)}
        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <span>{expandedSection === sectionId ? '▼' : '▶'}</span>
        <span className={!isOpen ? 'hidden' : ''}>{title}</span>
      </button>

      {expandedSection === sectionId && (
        <div className="ml-2 space-y-1 border-l border-gray-200">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-colors ml-2 ${
                isActive(link.path)
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{link.icon}</span>
              {isOpen && <span>{link.label}</span>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  if (!isOpen) {
    return (
      <aside className="w-20 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 overflow-y-auto">
        <div className="flex flex-col items-center gap-2 p-4 border-b border-gray-200">
          <Link to="/" className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
            R
          </Link>
        </div>
        <nav className="mt-4 space-y-2">
          {[
            { icon: '🏠', path: '/' },
            { icon: '👤', path: '/rider/dashboard' },
            { icon: '🚗', path: '/driver/dashboard' },
            { icon: '⚙️', path: '/admin/dashboard' },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-center py-3 text-2xl hover:bg-gray-100 rounded-lg transition-colors ${
                location.pathname === item.path ? 'bg-blue-50 text-blue-600' : 'text-gray-400'
              }`}
              title={item.path}
            >
              {item.icon}
            </Link>
          ))}
        </nav>
      </aside>
    );
  }

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
          R
        </div>
        <div>
          <h1 className="font-bold text-lg text-gray-900">RideFlow</h1>
          <p className="text-xs text-gray-500">Rideshare Platform</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        {/* Home */}
        <Link
          to="/"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors mb-4 ${
            location.pathname === '/'
              ? 'bg-blue-50 text-blue-600 font-semibold'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <span className="text-xl">🏠</span>
          <span>Home</span>
        </Link>

        {/* Rider Section */}
        <SidebarSection title="RIDER" links={riderLinks} sectionId="rider" />

        {/* Driver Section */}
        <SidebarSection title="DRIVER" links={driverLinks} sectionId="driver" />

        {/* Admin Section */}
        <SidebarSection title="ADMIN" links={adminLinks} sectionId="admin" />
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-semibold">
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
