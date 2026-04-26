
# RideFlow Phase 1: Complete Implementation Plan
**Project**: Rideshare Web Application  
**Status**: Initial Design & Planning  
**Timeline**: ~12 days  
**Last Updated**: April 23, 2026

---

## Executive Summary

RideFlow is a full-stack rideshare application built with React (Vite) frontend and Node.js (Express) backend, connected to PostgreSQL. This plan covers Phase 1: building all core features for three user personas (Riders, Drivers, Admins) using Asgardeo for authentication and Render for deployment.

### Key Decisions
- **Scope**: All three personas in one implementation sprint
- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + Sequelize ORM
- **Database**: PostgreSQL
- **Auth**: Asgardeo
- **Architecture**: Separate `frontend/` and `backend/` monorepo folders
- **Code Hosting**: GitHub
- **Deployment**: Render

---

## Overall Problem & Solution

**Problem**: Managing rides, drivers, and ride activity across a rideshare service is difficult without a centralized system.

**Solution**: RideFlow provides a full-stack web application where:
- **Riders** can request rides, view fare estimates, view assigned driver information, and see ride history
- **Drivers** can toggle availability, view ride requests, complete trips, and manage ride history
- **Admins** can monitor platform stats and perform CRUD-style management on riders, drivers, and rides

---

## Users & Personas

### Rider
- Request a ride by entering pickup and dropoff locations
- View a fare estimate before confirming a ride
- View assigned driver information
- View full ride history
- Cancel a pending ride request

### Driver
- Toggle availability status between available and unavailable
- View incoming ride requests
- View rider information before accepting
- Mark a ride as complete upon dropoff
- View ride history

### Admin
- Access a centralized dashboard with platform stats
- View, create, edit, and deactivate rider and driver records
- View, edit, and cancel any ride
- Manually assign a driver to any open ride
- Search and filter rides by status, rider, driver, or ride ID

---

## Authentication

Authentication will be handled through Asgardeo. The application will not implement custom authentication routes or store user credentials in its own database. Asgardeo will manage login, logout, and identity, while the RideFlow database will only store application-specific data for riders, drivers, and rides.

---

## Database Schema (Finalized ERD)

### Riders Table
```sql
CREATE TABLE riders (
  rider_id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  payment_method VARCHAR(100),
  rating DECIMAL(3,2) DEFAULT 5.00,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Drivers Table
```sql
CREATE TABLE drivers (
  driver_id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  vehicle_make VARCHAR(100),
  vehicle_model VARCHAR(100),
  license_plate VARCHAR(20),
  availability_status VARCHAR(20) DEFAULT 'unavailable',
  rating DECIMAL(3,2) DEFAULT 5.00,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Rides Table
```sql
CREATE TABLE rides (
  ride_id SERIAL PRIMARY KEY,
  rider_id INTEGER NOT NULL REFERENCES riders(rider_id) ON DELETE CASCADE,
  driver_id INTEGER REFERENCES drivers(driver_id) ON DELETE SET NULL,
  pickup_location VARCHAR(255) NOT NULL,
  dropoff_location VARCHAR(255) NOT NULL,
  request_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  pickup_time TIMESTAMP,
  dropoff_time TIMESTAMP,
  fare DECIMAL(10,2),
  ride_status VARCHAR(50) DEFAULT 'requested',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Relationships
- One Rider has many Rides
- One Driver has many Rides
- Each Ride belongs to one Rider
- Each Ride belongs to one Driver (nullable until assigned)

---

## Routes & API Specification

### Frontend Routes
Path	Purpose	User
/	Landing page	All
/rider/dashboard	Rider overview	Rider
/rider/request-ride	Request a ride	Rider
/rider/history	Past rides	Rider
/rider/profile	Profile settings	Rider
/driver/dashboard	Driver overview	Driver
/driver/pending-rides	Available requests	Driver
/driver/history	Past rides	Driver
/driver/profile	Driver profile	Driver
/admin/dashboard	Platform stats	Admin
/admin/riders	Rider management	Admin
/admin/riders/:id	Rider detail/edit	Admin
/admin/drivers	Driver management	Admin
/admin/drivers/:id	Driver detail/edit	Admin
/admin/rides	Ride management	Admin
/admin/rides/:id	Ride detail/edit	Admin

### Backend API Routes

#### Rider Endpoints
GET /api/riders
  Response: [{ rider_id, first_name, last_name, email, phone_number, rating, status }]

GET /api/riders/:id
  Response: { rider_id, first_name, last_name, email, phone_number, payment_method, rating, status }

POST /api/riders
  Body: { first_name, last_name, email, phone_number, payment_method }
  Response: { rider_id, ... }

PUT /api/riders/:id
  Body: { first_name?, last_name?, phone_number?, payment_method? }
  Response: { rider_id, ... }

PUT /api/riders/:id/status
  Body: { status: 'active' | 'deleted' }
  Response: { rider_id, status }

#### Driver Endpoints
GET /api/drivers
  Response: [{ driver_id, first_name, last_name, email, availability_status, rating, status }]

GET /api/drivers/:id
  Response: { driver_id, first_name, last_name, email, vehicle_make, vehicle_model, license_plate, availability_status, rating, status }

POST /api/drivers
  Body: { first_name, last_name, email, phone_number, vehicle_make, vehicle_model, license_plate }
  Response: { driver_id, ... }

PUT /api/drivers/:id
  Body: { first_name?, last_name?, phone_number?, vehicle_make?, vehicle_model?, license_plate? }
  Response: { driver_id, ... }

PUT /api/drivers/:id/status
  Body: { status: 'active' | 'deactivated' }
  Response: { driver_id, status }

PUT /api/drivers/:id/availability
  Body: { availability_status: 'available' | 'unavailable' }
  Response: { driver_id, availability_status }

#### Ride Endpoints
GET /api/rides
  Query: ?status=requested&driver_id=5&rider_id=10
  Response: [{ ride_id, rider_id, driver_id, pickup_location, dropoff_location, fare, ride_status, request_time }]

GET /api/rides/:id
  Response: { ride_id, rider_id, driver_id, pickup_location, dropoff_location, fare, ride_status, request_time, pickup_time, dropoff_time }

POST /api/rides
  Body: { rider_id, pickup_location, dropoff_location }
  Response: { ride_id, fare, ride_status: 'requested', request_time }

PUT /api/rides/:id
  Body: { pickup_location?, dropoff_location?, fare?, ride_status? }
  Response: { ride_id, ... }

PUT /api/rides/:id/assign-driver
  Body: { driver_id }
  Response: { ride_id, driver_id, ride_status }

PUT /api/rides/:id/complete
  Response: { ride_id, ride_status: 'completed', dropoff_time, fare }

PUT /api/rides/:id/cancel
  Response: { ride_id, ride_status: 'cancelled' }

#### Admin Dashboard Endpoint
GET /api/dashboard/stats
  Response: {
    active_drivers: 12,
    open_requests: 3,
    completed_rides_today: 45
  }

---

## Implementation Timeline & Phases
Phase 1A & 1B: Project Setup & Database (Days 1-3)

#### 1.1 Initialize Project Structure
rideshare-folder/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── tailwind.config.js
├── backend/
│   ├── src/
│   │   ├── server.ts
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── migrations/
│   ├── config/
│   │   └── database.js
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md

#### 1.2 Frontend Setup
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install react-router-dom axios tailwindcss @asgardeo/auth-react
npm run dev
```

**Key Dependencies:**

react-router-dom — routing
axios — HTTP client
tailwindcss — styling
@asgardeo/auth-react — authentication
- typescript — type safety

#### 1.3 Backend Setup
mkdir backend
cd backend
npm init -y
npm install express cors dotenv sequelize pg
npm install -D typescript ts-node @types/express @types/node
```

**Key Dependencies:**

express — web framework
cors — cross-origin requests
dotenv — environment variables
- sequelize — ORM
- pg — PostgreSQL driver

#### 1.4 Database Configuration

**Create backend/config/database.js:**

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: console.log
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
  }
};
```

**Create backend/.env:**

```
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=rideflow_dev
DB_HOST=localhost
NODE_ENV=development
PORT=5000
```

#### 1.5 PostgreSQL Database

```bash
# Create databases
createdb rideflow_dev
createdb rideflow_test

# Verify
psql -l | grep rideflow
```

---

### Phase 1B: Sequelize Models & Migrations (Days 2-3)

#### 1.6 Create Models

**backend/src/models/Rider.ts**

```typescript
import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class Rider extends Model {}
  Rider.init({
    rider_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    phone_number: { type: DataTypes.STRING, allowNull: false },
    payment_method: { type: DataTypes.STRING },
    rating: { type: DataTypes.DECIMAL(3, 2), defaultValue: 5.00 },
    status: { type: DataTypes.ENUM('active', 'deleted'), defaultValue: 'active' }
  }, { sequelize, modelName: 'Rider', tableName: 'riders', timestamps: true });
  return Rider;
};
```

**backend/src/models/Driver.ts**

```typescript
import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class Driver extends Model {}
  Driver.init({
    driver_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    phone_number: { type: DataTypes.STRING, allowNull: false },
    vehicle_make: { type: DataTypes.STRING },
    vehicle_model: { type: DataTypes.STRING },
    license_plate: { type: DataTypes.STRING },
    availability_status: { type: DataTypes.ENUM('available', 'unavailable'), defaultValue: 'unavailable' },
    rating: { type: DataTypes.DECIMAL(3, 2), defaultValue: 5.00 },
    status: { type: DataTypes.ENUM('active', 'deactivated'), defaultValue: 'active' }
  }, { sequelize, modelName: 'Driver', tableName: 'drivers', timestamps: true });
  return Driver;
};
```

**backend/src/models/Ride.ts**

```typescript
import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class Ride extends Model {}
  Ride.init({
    ride_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rider_id: { type: DataTypes.INTEGER, allowNull: false },
    driver_id: { type: DataTypes.INTEGER },
    pickup_location: { type: DataTypes.STRING, allowNull: false },
    dropoff_location: { type: DataTypes.STRING, allowNull: false },
    request_time: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    pickup_time: { type: DataTypes.DATE },
    dropoff_time: { type: DataTypes.DATE },
    fare: { type: DataTypes.DECIMAL(10, 2) },
    ride_status: { type: DataTypes.ENUM('requested', 'accepted', 'in_progress', 'completed', 'cancelled'), defaultValue: 'requested' }
  }, { sequelize, modelName: 'Ride', tableName: 'rides', timestamps: true });
  return Ride;
};
```

#### 1.7 Create Associations

**backend/src/models/index.ts**

```typescript
import { Sequelize } from 'sequelize';
import riderModel from './Rider';
import driverModel from './Driver';
import rideModel from './Ride';

const sequelize = new Sequelize(/* config */);

const db = {
  Rider: riderModel(sequelize),
  Driver: driverModel(sequelize),
  Ride: rideModel(sequelize)
};

// Associations
db.Rider.hasMany(db.Ride, { foreignKey: 'rider_id' });
db.Driver.hasMany(db.Ride, { foreignKey: 'driver_id' });
db.Ride.belongsTo(db.Rider, { foreignKey: 'rider_id' });
db.Ride.belongsTo(db.Driver, { foreignKey: 'driver_id' });

export default db;
```

#### 1.8 Migrations

Use Sequelize CLI to create migrations:

```bash
npx sequelize-cli migration:create --name create-riders
npx sequelize-cli migration:create --name create-drivers
npx sequelize-cli migration:create --name create-rides
npx sequelize-cli db:migrate
```

---

### Phase 1C: Authentication (Days 3-4)

#### 1.9 Asgardeo Integration

- Configure Asgardeo application settings
- Connect frontend authentication flow using Asgardeo SDK
- Set up login and logout through Asgardeo
- Protect frontend routes based on authenticated user
- Validate authenticated access for backend requests where needed

#### 1.10 Frontend Auth Setup

**frontend/src/hooks/useAuth.ts**

- Use Asgardeo SDK instead of custom login and register logic
- Expose current user info and logout function to components
- Keep authentication separate from application database records

---

### Phase 2A: Rider Features (Days 4-6)

#### 2.1 Rider API Controllers

- backend/src/controllers/riderController.ts — CRUD operations for riders
- backend/src/controllers/rideController.ts — Ride request and cancellation logic

#### 2.2 Rider Pages

- frontend/src/pages/RiderDashboard.tsx — Shows active ride summary and ride history summary
- frontend/src/pages/RequestRidePage.tsx — Pickup/dropoff input, fare estimate, confirm button
- frontend/src/pages/RideHistoryPage.tsx — Table of past rides with dates, fares, routes
- frontend/src/pages/RiderProfilePage.tsx — Edit profile and view account info

#### 2.3 Fare Calculator

**backend/src/utils/fareCalculator.ts**

```typescript
export const calculateFare = (pickupLocation: string, dropoffLocation: string): number => {
  const BASE_FARE = 5.00;
  const PER_KM_RATE = 2.50;
  const distance = 10;

  return BASE_FARE + distance * PER_KM_RATE;
};
```

---

### Phase 2B: Driver Features (Days 4-6)

#### 2.4 Driver API Controllers

- backend/src/controllers/driverController.ts — CRUD and availability toggle
- backend/src/controllers/rideController.ts — Assign, complete, cancel, and view rides

#### 2.5 Driver Pages

- frontend/src/pages/DriverDashboard.tsx — Availability toggle and current ride summary
- frontend/src/pages/PendingRidesPage.tsx — List of available ride requests
- frontend/src/pages/DriverHistoryPage.tsx — Completed rides history
- frontend/src/pages/DriverProfilePage.tsx — Vehicle info and profile settings

---

### Phase 2C: Admin Dashboard (Days 6-8)

#### 2.6 Admin Dashboard Page

**frontend/src/pages/AdminDashboard.tsx**

- Header: Platform stats
- Tabs: Riders, Drivers, Rides
- Riders tab: Searchable list, add new, edit, status update
- Drivers tab: Searchable list, add new, toggle availability, status update
- Rides tab: Filters by status, rider, driver, manual assign, edit ride status

#### 2.7 Admin API Endpoints

- Filter rides by status, driver, rider
- PUT /api/rides/:id/assign-driver — manually assign
- GET /api/dashboard/stats — dashboard stats endpoint

---

### Phase 3: Frontend Refinement & UX (Days 8-10)

#### 3.1 Layout & Navigation

frontend/src/components/Navbar.tsx — Logo, user role indicator, profile link, logout
frontend/src/components/Sidebar.tsx — Role-based navigation menu
frontend/src/App.tsx — Main router setup and protected route wrapper

#### 3.2 Responsive Design

- Mobile-first TailwindCSS: sm (640px), md (768px), lg (1024px)
- Test on 375px (mobile), 768px (tablet), 1024px (desktop)
- Flexbox and grid layouts for responsiveness

#### 3.3 Component Structure

```
frontend/src/components/
├── Navbar.tsx
├── Sidebar.tsx
├── RideCard.tsx
├── DriverCard.tsx
├── FilterPanel.tsx
├── StatsWidget.tsx
└── Forms/
    ├── RideRequestForm.tsx
    ├── RiderProfileForm.tsx
    └── DriverProfileForm.tsx
```

---

### Phase 4: Testing & Validation (Days 10-11)

#### 4.1 Backend Testing

- Unit tests: Fare calculator and core ride logic
- Integration tests: CRUD endpoints for riders, drivers, and rides
- Tools: Jest, Supertest

**Example:**

```typescript
describe('Ride API', () => {
  it('should create a ride request', async () => {
    const res = await request(app)
      .post('/api/rides')
      .send({ rider_id: 1, pickup_location: 'A', dropoff_location: 'B' });
    expect(res.status).toBe(201);
    expect(res.body.ride_id).toBeDefined();
  });
});
```

#### 4.2 Frontend Testing

- Smoke tests: Pages load, routes navigate, forms submit
- Tools: React Testing Library, Vitest

#### 4.3 Manual E2E Testing

- Log in through Asgardeo
- Rider requests ride and views fare estimate
- Driver updates availability and views pending rides
- Admin assigns a driver if needed
- Driver completes ride
- Admin verifies dashboard and ride updates

---

### Phase 5: Deployment & Documentation (Days 11-12)

#### 5.1 Backend Deployment

- Host backend on Render
- Use Render PostgreSQL for database
- Set environment variables in Render

#### 5.2 Frontend Deployment

- Build: npm run build (Vite generates dist/)
- Deploy frontend through Render
- Configure API base URL for production

#### 5.3 Code Hosting

- Push and manage source code in GitHub
- Use GitHub for collaboration and version control

#### 5.4 Documentation

- README.md — Setup instructions, tech stack, features
- API Documentation — Route reference and request formats
- Deployment Guide — Database migrations and environment setup

---

## Tech Stack Summary

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, TypeScript, Tailwind CSS, React Router, Axios |
| Backend | Node.js, Express.js, TypeScript, Sequelize ORM |
| Database | PostgreSQL, Sequelize migrations |
| Auth | Asgardeo |
| Version Control | GitHub |
| Deployment | Render, Render PostgreSQL |
| Testing | Jest, Supertest, React Testing Library, Vitest |

---

## Key Decisions

- ✅ Scope: All three personas (Rider, Driver, Admin) in Phase 1, not staggered
- ✅ ORM: Sequelize for built-in migrations, associations, query builder
- ✅ Auth: Asgardeo
- ✅ Structure: Separate frontend/ and backend/ folders (monorepo clarity)
- ✅ Database: PostgreSQL with Sequelize for relational queries and integrity
- ✅ Version Control: GitHub
- ✅ Deployment: Render

---

## Future Enhancements (Post-Phase 1)

### Phase 2 Candidates

**Geolocation & Nearby Driver Filtering**
- Add lat/long to Riders, Drivers, and Rides
- Use geocoding service for route calculations
- Filter drivers by distance radius

**Payment Processing**
- Integrate Stripe test mode
- Charge rider on ride completion
- Track payment status

**Notifications**
- Email ride receipts
- SMS ride status updates
- In-app notifications

**Advanced Features**
- Rider ratings and reviews
- Driver background checks
- Ride scheduling
- Shared rides
- Loyalty program

---

## Success Criteria

### Functional
- Rider can request ride, receive fare estimate, and view ride details
- Driver can update availability and complete rides
- Admin can view dashboard stats and manage riders, drivers, and rides

### Non-Functional
- Frontend responsive on mobile, tablet, and desktop
- Database integrity through foreign keys and associations
- Authentication handled through Asgardeo

### Code Quality
- TypeScript throughout
- RESTful API design with consistent JSON responses
- Component-based React architecture
- Separation of concerns across models, routes, controllers, and utils

---

## Questions & Support

For clarification on any section, refer to the API routes, database schema, or implementation phase details above. This plan is designed to be executed sequentially, with phases 2A/2B/2C parallelizable for efficiency.

---

**Document Version**: 1.0  
**Created**: April 22, 2026  
**Last Updated**: April 23, 2026
