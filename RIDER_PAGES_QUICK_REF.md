# RideFlow Rider Pages - Quick Reference

## 🎯 Pages Overview

### 1. RiderDashboard (`/rider/dashboard`)
**Purpose**: Home dashboard showing active ride, quick stats, and recent history

**Key Features**:
- Active ride card with driver info
- 4 metric cards (rides, spent, rating, miles)
- Recent rides quick view
- Help/support section

**File**: `src/pages/RiderDashboard.tsx`

---

### 2. RequestRide (`/rider/request-ride`)
**Purpose**: Create and confirm a new ride request

**Key Features**:
- Pickup/dropoff location inputs
- Ride type selector (Standard/Premium/XL)
- Passenger count selector (1-6)
- Live fare calculator
- Payment method display
- Special requests textarea

**Form States**:
- Empty → User fills in
- Valid → Submit button enabled
- Submitted → Shows confirmation
- Auto-reset → Ready for new ride

**File**: `src/pages/RequestRide.tsx`

---

### 3. RiderHistory (`/rider/history`)
**Purpose**: Browse and manage past rides

**Key Features**:
- 12+ ride records with full details
- Search by location/driver name
- Filter by status (All/Completed/Cancelled/No-Show)
- Sort by date/fare/distance
- Pagination (5 rides per page)
- Stats header (total rides, total spent, avg rating)

**Usage**:
1. Type in search box to find rides
2. Use Status dropdown to filter
3. Click Sort to change order
4. Navigate pages with buttons

**File**: `src/pages/RiderHistory.tsx`

---

### 4. RiderProfile (`/rider/profile`)
**Purpose**: Manage profile information and settings

**Sections**:
1. **Personal Information**
   - First/Last Name
   - Email (validated)
   - Phone (required)
   - Address
   - Date of Birth

2. **Emergency Contact**
   - Contact Name
   - Phone Number

3. **Payment Method**
   - Current card display
   - Add/Edit options

**Edit Workflow**:
1. Click Edit on any section
2. Form appears with current data
3. Make changes
4. Click Save or Cancel
5. Success/error messages provided

**File**: `src/pages/RiderProfile.tsx`

---

## 📊 Component Reuse

### StatsWidget
Used in: RiderDashboard, RiderHistory
```tsx
<StatsWidget 
  label="Total Rides"
  value="24"
  icon="🚕"
  trendIcon="↑"
  borderColor="border-blue-500"
/>
```

### RideCard
Used in: RiderDashboard, RiderHistory
```tsx
<RideCard 
  rideMode="full" // or "compact"
  pickup="Downtown Station"
  dropoff="Airport"
  // ... other props
/>
```

---

## 🛠️ State Management Quick Guide

### RiderDashboard
```tsx
const [currentRide] = useState({...})
const [recentRides] = useState([...])
const [stats] = useState({...})
```

### RequestRide
```tsx
const [formData, setFormData] = useState({
  pickup: '',
  dropoff: '',
  rideType: 'standard',
  passengers: 1,
  specialRequests: ''
})
const [submitted, setSubmitted] = useState(false)
```

### RiderHistory
```tsx
const [rides] = useState([...]) // 12 rides
const [searchTerm, setSearchTerm] = useState('')
const [filterStatus, setFilterStatus] = useState('all')
const [sortBy, setSortBy] = useState('recent')
const [currentPage, setCurrentPage] = useState(1)
```

### RiderProfile
```tsx
const [profile, setProfile] = useState({...})
const [editingSection, setEditingSection] = useState(null)
const [formData, setFormData] = useState(profile)
const [errors, setErrors] = useState({})
const [saveSuccess, setSaveSuccess] = useState(false)
```

---

## 🎨 Styling Patterns

### Colors
```tsx
// Primary actions - Blue
bg-blue-600 text-white

// Success feedback - Green
bg-green-50 border-green-200 text-green-900

// Status badges
// Completed: text-green-600
// Cancelled: text-red-600
// No-Show: text-yellow-600

// Neutral backgrounds
bg-gray-50 border-gray-300 text-gray-700
```

### Responsive Breakpoints
```tsx
// Mobile first (default)
// Tablets 640px+
md:grid-cols-2 md:col-span-1

// Desktops 1024px+
lg:grid-cols-3 lg:col-span-2
```

### Common Classes
```tsx
// Buttons
bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg

// Inputs
border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500

// Cards
bg-white rounded-lg shadow-lg p-8

// Text
text-3xl font-bold text-gray-900  // Heading
text-sm text-gray-600             // Secondary
text-gray-900                      // Primary
```

---

## 📐 Mock Data Structure

### Ride Record
```tsx
{
  id: string
  date: string        // "Today", "Yesterday", "Mar 14, 2024"
  time: string        // "2:30 PM"
  pickup: string
  dropoff: string
  distance: number    // km
  duration: string    // "22 min"
  fare: number        // $
  driver: string
  rating: number      // 1-5 stars
  status: 'completed' | 'cancelled' | 'no-show'
  rideType: string    // "🚕 Standard"
}
```

### Profile Record
```tsx
{
  firstName: string
  lastName: string
  email: string       // validated
  phone: string       // required
  address: string     // required
  dateOfBirth: string // "YYYY-MM-DD"
  emergencyContact: string
  emergencyPhone: string
  paymentMethod: string
  paymentLast4: string
  paymentExpiry: string
}
```

---

## 🔧 Common Tasks

### Update Mock Data
1. Find the `useState` hook in the page
2. Modify the initial value array/object
3. Component auto-reloads with changes

### Add Form Validation
1. Add rule to `validateForm()` function
2. Set error in `errors` state
3. Display error below input: `{errors.fieldName && <p>...}`

### Add New Filter/Sort Option
1. Add to filter/sort state options
2. Add handler in form or dropdown
3. Update filter/sort logic in useMemo/filter function

### Change Styling
1. Find Tailwind classes in JSX
2. Update color/spacing/sizing classes
3. Test responsive breakpoints

---

## 🧪 Testing Scenarios

### RiderHistory Filtering
- ✅ Search: "downtown" → finds 2 Downtown Station rides
- ✅ Status: "cancelled" → shows 1 cancelled ride
- ✅ Sort: "highest fare" → $25.40, $22.50, $18.75...
- ✅ Pagination: Page 2 → shows rides 6-10

### RequestRide Fare
- ✅ 1 passenger, standard → ~$6.00
- ✅ 3 passengers, premium → ~$8.50
- ✅ 6 passengers, XL → ~$13.00

### RiderProfile Edit
- ✅ Edit personal → can save changes
- ✅ Empty first name → error on save
- ✅ Invalid email → error on save
- ✅ Cancel → reverts to original

---

## 🚀 Next Steps

1. **Add Router Links**: Connect quick action buttons to pages
2. **API Integration**: Replace mock data with real API calls
3. **Form Submission**: Send form data to backend
4. **User Context**: Load real user data from session
5. **Error Handling**: Add try-catch around API calls
6. **Loading States**: Add spinners during API calls

---

## 📝 Notes

- All pages use localhost:5175 in development
- Hot reload enabled - save file to see changes
- All data is stored in component state only (not persisted)
- No database integration yet
- Forms don't actually submit anywhere
- Payment method cannot be changed (UI only)

---

## 📞 Quick Navigation

| Page | Route | File |
|------|-------|------|
| Dashboard | `/rider/dashboard` | `RiderDashboard.tsx` |
| Request Ride | `/rider/request-ride` | `RequestRide.tsx` |
| Ride History | `/rider/history` | `RiderHistory.tsx` |
| My Profile | `/rider/profile` | `RiderProfile.tsx` |
