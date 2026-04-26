/**
 * Example: Using Asgardeo Authentication in Your Components
 * 
 * This file demonstrates how to use the authentication setup
 * in your RideFlow application.
 */

// ============================================================================
// Example 1: Basic Login/Logout in Navbar
// ============================================================================

import { useAuth } from "../hooks/useAuth";

export function NavbarExample() {
  const { isAuthenticated, user, login, logout } = useAuth();

  return (
    <nav>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user?.name}</p>
          <button onClick={logout}>Sign Out</button>
        </>
      ) : (
        <button onClick={login}>Sign In</button>
      )}
    </nav>
  );
}

// ============================================================================
// Example 2: Display User Information
// ============================================================================

export function UserProfileCard() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <p>Please log in to see your profile</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2>My Profile</h2>
      
      {user.picture && (
        <img src={user.picture} alt="Avatar" className="w-16 h-16 rounded-full" />
      )}
      
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>First Name:</strong> {user.givenName}</p>
      <p><strong>Last Name:</strong> {user.familyName}</p>
      <p><strong>User ID:</strong> {user.sub}</p>
    </div>
  );
}

// ============================================================================
// Example 3: Conditional Rendering Based on Auth State
// ============================================================================

export function FeatureAvailability() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <>
          <h2>Authenticated Features</h2>
          <p>You're logged in as: {user?.name}</p>
          <button>Request a Ride</button>
          <button>View History</button>
          <button>Edit Profile</button>
        </>
      ) : (
        <>
          <h2>Public Features</h2>
          <p>Sign in to access more features</p>
          <button>Learn About RideFlow</button>
        </>
      )}
    </div>
  );
}

// ============================================================================
// Example 4: Checking Role for Feature Access
// ============================================================================

export function AdminPanel() {
  const { user } = useAuth();

  const isAdmin = user?.roles?.includes('admin') || false;
  const isDriver = user?.roles?.includes('driver') || false;
  const isRider = user?.roles?.includes('rider') || false;

  return (
    <div>
      {isAdmin && (
        <section>
          <h2>Admin Dashboard</h2>
          <button>Manage Riders</button>
          <button>Manage Drivers</button>
          <button>View Analytics</button>
        </section>
      )}

      {isDriver && (
        <section>
          <h2>Driver Dashboard</h2>
          <button>View Pending Rides</button>
          <button>Earnings Report</button>
        </section>
      )}

      {isRider && (
        <section>
          <h2>Rider Dashboard</h2>
          <button>Request Ride</button>
          <button>View History</button>
        </section>
      )}
    </div>
  );
}

// ============================================================================
// Example 5: Custom useAuth Usage
// ============================================================================

export function AdvancedAuthExample() {
  const { isAuthenticated, user, login, logout, state } = useAuth();

  return (
    <div>
      <p>Authentication State:</p>
      <ul>
        <li>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</li>
        <li>Loading: {state?.isLoading ? 'Yes' : 'No'}</li>
      </ul>

      {isAuthenticated && user && (
        <div>
          <h3>User Details</h3>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}

      <div className="mt-4">
        {!isAuthenticated ? (
          <button onClick={login} className="btn-primary">
            Sign In with Asgardeo
          </button>
        ) : (
          <button onClick={logout} className="btn-danger">
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// SETUP CHECKLIST
// ============================================================================

/*
✅ BEFORE YOU START:

1. Update src/main.tsx:
   - Replace YOUR_ASGARDEO_CLIENT_ID with actual Client ID
   - Replace YOUR_ORGANIZATION with your Asgardeo tenant name

2. Test Login Flow:
   - Click Login button
   - You should be redirected to Asgardeo login page
   - Sign in with your credentials
   - Should redirect back to RideFlow with user info displayed

3. Verify User Info:
   - Check that user name, email, and avatar (if set) display
   - Open browser DevTools → Application → Cookies
   - Look for asgardeo session cookies

4. Test Protected Routes:
   - Try accessing a protected route without logging in
   - Should redirect to home page
   - After login, you can access protected routes

5. Production Setup:
   - Update redirect URIs in Asgardeo for production domain
   - Update baseURL if moving to production Asgardeo instance
   - Use environment variables for sensitive config
*/

