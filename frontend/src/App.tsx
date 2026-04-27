import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import ComponentShowcase from './pages/ComponentShowcase';

// Rider Pages
import RiderDashboard from './pages/RiderDashboard';
import RequestRide from './pages/RequestRide';
import RiderHistory from './pages/RiderHistory';
import RiderProfile from './pages/RiderProfile';

// Driver Pages
import DriverDashboard from './pages/DriverDashboard';
import PendingRides from './pages/PendingRides';
import DriverHistory from './pages/DriverHistory';
import DriverProfile from './pages/DriverProfile';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminRiders from './pages/AdminRiders';
import AdminDrivers from './pages/AdminDrivers';
import AdminRides from './pages/AdminRides';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Main Layout with Sidebar */}
        <Route element={<Layout />}>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Component Showcase */}
          <Route path="/showcase" element={<ComponentShowcase />} />

          {/* Rider Routes */}
          <Route path="/rider/dashboard" element={<RiderDashboard />} />
          <Route path="/rider/request-ride" element={<RequestRide />} />
          <Route path="/rider/history" element={<RiderHistory />} />
          <Route path="/rider/profile" element={<RiderProfile />} />

          {/* Driver Routes */}
          <Route path="/driver/dashboard" element={<DriverDashboard />} />
          <Route path="/driver/pending-rides" element={<PendingRides />} />
          <Route path="/driver/history" element={<DriverHistory />} />
          <Route path="/driver/profile" element={<DriverProfile />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/riders" element={<AdminRiders />} />
          <Route path="/admin/drivers" element={<AdminDrivers />} />
          <Route path="/admin/rides" element={<AdminRides />} />
        </Route>
      </Routes>
    </Router>
  );
}
