# RideFlow Layout Components

A collection of modern, reusable React components built with Tailwind CSS for the RideFlow rideshare platform.

## 📦 Components

### 1. **Navbar**
Top navigation bar with search, notifications, and profile menu.

**File:** `src/components/Navbar.tsx`

**Features:**
- Sticky positioning at top of page
- Search bar (desktop and mobile)
- Notification dropdown with bell icon
- Profile menu with dropdown options
- Responsive design

**Usage:**
```tsx
import Navbar from '../components/Navbar';

export default function MyPage() {
  return (
    <>
      <Navbar />
      {/* Page content */}
    </>
  );
}
```

### 2. **Sidebar**
Collapsible navigation sidebar with role-based sections.

**File:** `src/components/Sidebar.tsx`

**Features:**
- Expandable/collapsible sidebar
- Organized sections (Rider, Driver, Admin)
- Active route highlighting
- Icon + label for navigation
- Compact mode (collapsed view)
- Logout button at bottom

**Props:**
```tsx
interface SidebarProps {
  isOpen?: boolean; // Default: true
}
```

**Usage:**
```tsx
import Sidebar from '../components/Sidebar';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar isOpen={sidebarOpen} />
      {/* Main content */}
    </div>
  );
}
```

### 3. **StatsWidget**
Metric card component displaying statistics with optional trend indicators.

**File:** `src/components/StatsWidget.tsx`

**Features:**
- Customizable icon and colors
- Trend indicators (up/down)
- Border colors indicate metric type
- Responsive grid layout
- Hover effects

**Props:**
```tsx
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
```

**Usage:**
```tsx
import StatsWidget, { StatsGrid } from '../components/StatsWidget';

// Single widget
<StatsWidget
  title="Total Rides"
  value="24"
  subtitle="This month"
  icon="🚕"
  trend={{ value: 12, direction: 'up' }}
  borderColor="border-blue-500"
/>

// Multiple widgets in grid
<StatsGrid />
```

### 4. **RideCard**
Display ride information with pickup/dropoff locations, fare, and status.

**File:** `src/components/RideCard.tsx`

**Features:**
- Pickup and dropoff details
- Distance, duration, and fare information
- Status badges (completed, in-progress, cancelled, available)
- Driver information with rating
- Estimated time
- Action buttons (Accept, Decline, View)
- Compact mode for list views
- Hover effects

**Props:**
```tsx
interface RideCardProps {
  id?: string | number;
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
```

**Usage:**
```tsx
import RideCard, { RideCardList } from '../components/RideCard';

// Single card
<RideCard
  pickup="123 Main St"
  dropoff="456 Park Ave"
  distance="2.5 mi"
  duration="12 min"
  fare="$12.50"
  status="completed"
  driver="John D."
  driverRating={4.8}
/>

// Multiple cards in list
<RideCardList />

// Compact mode
<RideCard
  pickup="123 Main St"
  dropoff="456 Park Ave"
  distance="2.5 mi"
  fare="$12.50"
  isCompact={true}
/>
```

### 5. **DriverCard**
Display driver profile with rating, vehicle information, and earnings.

**File:** `src/components/DriverCard.tsx`

**Features:**
- Driver profile image or initials
- Status indicator (online/offline/busy)
- Rating display
- Vehicle information
- License plate
- Monthly earnings
- Acceptance rate
- Action buttons (Message, Rate, Select)
- Compact mode for grid views

**Props:**
```tsx
interface DriverCardProps {
  id?: string | number;
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
```

**Usage:**
```tsx
import DriverCard, { DriverCardGrid } from '../components/DriverCard';

// Single card
<DriverCard
  name="James Miller"
  rating={4.9}
  totalRides={142}
  vehicle="2022 Honda Civic"
  status="online"
  earnings="$3,245.80"
  acceptanceRate={98}
/>

// Multiple cards in grid
<DriverCardGrid />

// Compact mode
<DriverCard
  name="James Miller"
  rating={4.9}
  totalRides={142}
  vehicle="2022 Honda Civic"
  isCompact={true}
/>
```

### 6. **FilterPanel**
Filterable panel with price range, vehicle type, status, rating, and sorting options.

**File:** `src/components/FilterPanel.tsx`

**Features:**
- Price range slider
- Vehicle type checkboxes
- Status filters
- Minimum rating selector
- Sort options (recent, price, rating, distance)
- Apply/Reset buttons
- Compact mode for sidebars
- Sticky positioning

**Props:**
```tsx
interface FilterPanelProps {
  title?: string;
  onApply?: (filters: Record<string, any>) => void;
  onReset?: () => void;
  isCompact?: boolean;
}
```

**Usage:**
```tsx
import FilterPanel from '../components/FilterPanel';

const [filters, setFilters] = useState({});

<FilterPanel
  title="Filters"
  isCompact={false}
  onApply={(filters) => {
    setFilters(filters);
    console.log('Applied filters:', filters);
  }}
  onReset={() => {
    setFilters({});
  }}
/>
```

## 🎨 Design System

### Color Palette
- **Primary:** Blue (`#1e40af`, `#1e3a8a`)
- **Success:** Green (`#22c55e`)
- **Warning:** Yellow (`#eab308`)
- **Danger:** Red (`#ef4444`)
- **Background:** White, Gray (`#f9fafb` - `#111827`)

### Typography
- **Headings:** Bold, Dark Gray
- **Body Text:** Medium Gray (`#4b5563`)
- **Labels:** Small, Light Gray (`#9ca3af`)

### Spacing
- Uses standard Tailwind spacing (4px = 1 unit)
- Typical padding: 16px (p-4), 24px (p-6), 32px (p-8)

### Border Radius
- Small: `rounded-lg` (8px)
- Medium: `rounded-2xl` (16px)
- Full: `rounded-full` (50%)

## 📱 Responsive Design

All components are fully responsive using Tailwind CSS breakpoints:
- **Mobile:** `< 640px`
- **Tablet:** `640px - 1024px`
- **Desktop:** `> 1024px`

Example responsive classes used:
```tailwind
grid-cols-1 md:grid-cols-2 lg:grid-cols-4
hidden md:flex
w-full sm:max-w-md
```

## 🧪 Component Showcase

View all components together with examples at: `/showcase`

This page displays:
- Live component previews
- Component documentation
- Code examples for each component
- Mock data demonstrations

## 📦 Example Imports

```tsx
// Modular imports
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import StatsWidget, { StatsGrid } from '../components/StatsWidget';
import RideCard, { RideCardList } from '../components/RideCard';
import DriverCard, { DriverCardGrid } from '../components/DriverCard';
import FilterPanel from '../components/FilterPanel';
```

## 🚀 Usage Example

```tsx
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { StatsGrid } from '../components/StatsWidget';
import { RideCardList } from '../components/RideCard';
import FilterPanel from '../components/FilterPanel';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filters, setFilters] = useState({});

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} />
        <main className="flex-1 ml-64 p-8">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          
          {/* Stats Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Statistics</h2>
            <StatsGrid />
          </section>

          {/* Rides with Filter */}
          <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <FilterPanel onApply={setFilters} />
            </div>
            <div className="lg:col-span-3">
              <RideCardList />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
```

## 🔧 Customization

### Change Brand Colors
Update Tailwind config or add inline style classes:
```tsx
// Using Tailwind classes
<button className="bg-purple-600 hover:bg-purple-700">
  Custom Color
</button>

// Change border colors
<StatsWidget borderColor="border-purple-500" />
```

### Modify Spacing
```tsx
// Update padding in component or in parent
<div className="p-8"> {/* Instead of p-6 */}
  <RideCard />
</div>
```

### Override Styles
```tsx
// Add custom CSS to App.css or component file
.custom-card {
  @apply bg-blue-50 border-2 border-blue-300;
}
```

## 📄 Files Location

```
src/components/
├── Navbar.tsx
├── Sidebar.tsx
├── StatsWidget.tsx
├── RideCard.tsx
├── DriverCard.tsx
└── FilterPanel.tsx

src/pages/
└── ComponentShowcase.tsx
```

## ✅ Testing Components

1. **Local Testing:** Run dev server and navigate to `/showcase`
2. **Individual Components:** Import and use in any page
3. **Mock Data:** All components include mock data for demonstration

## 🎯 Next Steps

1. Connect components to Redux/Context for state management
2. Add API integration for real data
3. Implement animations and transitions
4. Add form validation logic
5. Connect filter functionality to backend queries
6. Implement real-time notifications

---

**Version:** 1.0.0  
**Last Updated:** April 23, 2026  
**Framework:** React 19 + Vite + TypeScript + Tailwind CSS
