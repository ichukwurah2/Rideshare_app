# RideFlow Components Quick Reference

A quick guide to using RideFlow's layout components.

## 🚀 Quick Start

```tsx
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { StatsGrid } from './components/StatsWidget';
import { RideCardList } from './components/RideCard';
import { DriverCardGrid } from './components/DriverCard';
import FilterPanel from './components/FilterPanel';
```

## 📋 Component Cheat Sheet

### Navbar
**Best for:** Main navigation across entire app

```tsx
<Navbar />
```
- Sticky at top
- Search bar (desktop + mobile)
- Notifications dropdown
- Profile menu

---

### Sidebar
**Best for:** Role-based navigation

```tsx
<Sidebar isOpen={true} />
```
- Expandable sections
- Rider/Driver/Admin routes
- Active route highlighting
- Compact mode available

---

### StatsWidget
**Best for:** Displaying key metrics

```tsx
// Single widget
<StatsWidget
  title="Total Rides"
  value="24"
  subtitle="This month"
  icon="🚕"
  borderColor="border-blue-500"
  trend={{ value: 12, direction: 'up' }}
/>

// Grid of multiple
<StatsGrid />
```

**Border Colors:**
- `border-blue-500` - Default/Primary
- `border-green-500` - Positive/Success
- `border-yellow-500` - Warning
- `border-purple-500` - Secondary

---

### RideCard
**Best for:** Displaying ride details

```tsx
// Full card
<RideCard
  pickup="123 Main St"
  dropoff="456 Park Ave"
  distance="2.5 mi"
  duration="12 min"
  fare="$12.50"
  status="completed"
  driver="John D."
  driverRating={4.8}
  vehicleType="Standard"
  estimatedTime="3 min"
  onAccept={() => {}}
  onCancel={() => {}}
/>

// Compact card
<RideCard
  pickup="123 Main St"
  dropoff="456 Park Ave"
  distance="2.5 mi"
  fare="$12.50"
  status="available"
  isCompact={true}
/>

// List of cards
<RideCardList />
```

**Status Options:**
- `'completed'` - Green
- `'in-progress'` - Blue
- `'available'` - Yellow
- `'cancelled'` - Red

---

### DriverCard
**Best for:** Displaying driver profiles

```tsx
// Full card
<DriverCard
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
  onSelect={() => {}}
/>

// Compact card
<DriverCard
  name="James Miller"
  rating={4.9}
  totalRides={142}
  vehicle="2022 Honda Civic"
  status="online"
  isCompact={true}
/>

// Grid of cards
<DriverCardGrid />
```

**Status Options:**
- `'online'` - Green indicator
- `'offline'` - Gray indicator
- `'busy'` - Yellow indicator

---

### FilterPanel
**Best for:** Filtering and sorting results

```tsx
const [filters, setFilters] = useState({});

// Full panel
<FilterPanel
  title="Filters"
  isCompact={false}
  onApply={(filters) => setFilters(filters)}
  onReset={() => setFilters({})}
/>

// Compact panel (for sidebars)
<FilterPanel isCompact={true} />
```

**Includes:**
- Price range slider
- Vehicle type checkboxes
- Status filters
- Rating selector
- Sort options

---

## 🎯 Common Layouts

### Dashboard with Sidebar + Stats
```tsx
<div className="min-h-screen bg-gray-50">
  <Navbar />
  <div className="flex">
    <Sidebar isOpen={true} />
    <main className="flex-1 ml-64 p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <StatsGrid />
    </main>
  </div>
</div>
```

### Rides with Filters
```tsx
<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
  <div className="lg:col-span-1">
    <FilterPanel onApply={setFilters} />
  </div>
  <div className="lg:col-span-3">
    <RideCardList />
  </div>
</div>
```

### Driver Selection
```tsx
<div className="space-y-4">
  <h2 className="text-2xl font-bold">Select a Driver</h2>
  <DriverCardGrid />
</div>
```

---

## 🎨 Tailwind Classes Reference

### Spacing
```tsx
// Padding
p-4   // 16px
p-6   // 24px
p-8   // 32px

// Margin
mb-8  // margin-bottom: 32px
mt-4  // margin-top: 16px
```

### Grid
```tsx
grid grid-cols-1              // 1 column (mobile)
grid grid-cols-1 md:grid-cols-2 // 1 col mobile, 2 col tablet
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 // Responsive
```

### Colors
```tsx
bg-blue-600      // Primary blue
bg-green-600     // Success green
bg-gray-50       // Light background
text-gray-900    // Dark text
border-blue-500  // Blue border
```

### Responsive
```tsx
hidden md:flex        // Hide on mobile, show on tablet+
w-full sm:max-w-md    // Full width on mobile, max on desktop
p-4 sm:p-6 lg:p-8     // Different padding by screen size
```

---

## 📱 Mobile-First Development

All components are mobile-first and responsive:

**Mobile:** `< 640px` - Single column, full width
**Tablet:** `640px - 1024px` - Two columns
**Desktop:** `> 1024px` - Four columns+

Example:
```tsx
// Will display as:
// Mobile: 1 column
// Tablet: 2 columns  
// Desktop: 4 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Content */}
</div>
```

---

## 🔗 Real Examples

### Rider Dashboard
```tsx
import { StatsGrid } from './components/StatsWidget';
import { RideCardList } from './components/RideCard';

export default function RiderDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
      <StatsGrid />
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Recent Rides</h2>
        <RideCardList />
      </section>
    </div>
  );
}
```

### Request Ride with Filters
```tsx
import { useState } from 'react';
import { RideCardList } from './components/RideCard';
import FilterPanel from './components/FilterPanel';

export default function RequestRide() {
  const [filters, setFilters] = useState({});

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-8">
      <div className="lg:col-span-1">
        <FilterPanel onApply={setFilters} />
      </div>
      <div className="lg:col-span-3">
        <h1 className="text-3xl font-bold mb-8">Available Rides</h1>
        <RideCardList />
      </div>
    </div>
  );
}
```

---

## 🧪 Testing

Visit `/showcase` to see all components with examples:
```
http://localhost:5174/showcase
```

This page includes:
- Live component previews
- Full prop examples
- Mock data demonstrations
- Component documentation

---

## ⚡ Performance Tips

1. **Use compact mode** for list views to reduce rendering
2. **Lazy load** components with React.lazy() if list is long
3. **Memoize** RideCardList and DriverCardGrid with React.memo()
4. **Debounce** filter changes with useCallback()

Example:
```tsx
import { useMemo } from 'react';
import { RideCardList } from './components/RideCard';

const MemoizedRideList = React.memo(RideCardList);

export default function MyPage() {
  return <MemoizedRideList />;
}
```

---

## 🚀 Next Steps

1. **State Management:** Connect to Redux/Context
2. **API Integration:** Replace mock data with real API calls
3. **Form Validation:** Add validation to FilterPanel
4. **Animations:** Add Framer Motion for transitions
5. **Accessibility:** Add ARIA labels and keyboard navigation
6. **Theming:** Create theme provider for dark mode

---

**Version:** 1.0.0  
**Last Updated:** April 23, 2026
