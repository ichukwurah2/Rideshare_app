# Asgardeo Authentication Setup for RideFlow

## ✅ Setup Complete

All Asgardeo authentication components have been integrated into your RideFlow frontend.

---

## 📋 Components Created/Updated

### 1. **Asgardeo Configuration** (`src/config/asgardeoConfig.ts`)
Centralized OAuth2/OIDC configuration with all necessary settings:
- Client ID placeholder
- Base URL configuration
- Redirect URIs (sign in and sign out)
- PKCE enabled for security
- OpenID Connect scopes: `openid`, `profile`, `email`

### 2. **Enhanced useAuth Hook** (`src/hooks/useAuth.ts`)
Now uses `@asgardeo/auth-react` with:
- `useAuthContext()` from Asgardeo SDK
- Automatic user info fetching via `getDecodedIDToken()`
- `signIn()` and `signOut()` methods
- User interface with full profile data
- Error handling for auth operations

### 3. **User Display Component** (`src/components/UserDisplay.tsx`)
Shows authenticated user information:
- User name (fallback chain: name → givenName → "User")
- User email (if available)
- User avatar/picture (if available from Asgardeo)

### 4. **Updated Navbar** (`src/components/Navbar.tsx`)
Enhanced header with:
- Login button (not authenticated)
- UserDisplay component (authenticated)
- Logout button (authenticated)
- Improved styling with hover states

### 5. **Updated ProtectedRoute** (`src/components/ProtectedRoute.tsx`)
Enhanced route protection with:
- Authentication check
- Optional role-based access control
- Proper redirects when not authenticated

### 6. **App Bootstrap** (`src/main.tsx`)
Wrapped React app with:
- `AuthProvider` from `@asgardeo/auth-react`
- Passes Asgardeo configuration
- Available to all child components via context

---

## 🚀 Getting Started

### Step 1: Create Asgardeo Application

1. Go to [https://console.asgardeo.io/](https://console.asgardeo.io/)
2. Sign up or log in with your account
3. Create a new application:
   - **Name**: RideFlow Frontend
   - **Type**: Single Page Application (SPA)
   - **Framework**: React
4. Configure:
   - **Authorized redirect URIs**: 
     - Development: `http://localhost:5174/`
     - Production: `https://yourdomain.com/`
   - **Logout redirect URL**: Same as redirect URIs
5. Copy your **Client ID**

### Step 2: Update Configuration

Edit `src/config/asgardeoConfig.ts`:

```typescript
export const asgardeoConfig = {
  clientID: "YOUR_ACTUAL_CLIENT_ID",  // ← Replace with your Client ID
  baseURL: "https://YOUR_ORG.asgardeo.io",  // ← Replace with your org name
  signInRedirectURL: "http://localhost:5174",
  signOutRedirectURL: "http://localhost:5174",
  responseMode: "form_post",
  scope: ["openid", "profile", "email"],
  enablePKCE: true,
  clockTolerance: 60,
};
```

**Example with real values**:
```typescript
export const asgardeoConfig = {
  clientID: "abc123def456ghi789jkl012mno345pq",
  baseURL: "https://mycompany.asgardeo.io",
  signInRedirectURL: "http://localhost:5174",
  signOutRedirectURL: "http://localhost:5174",
  responseMode: "form_post",
  scope: ["openid", "profile", "email"],
  enablePKCE: true,
  clockTolerance: 60,
};
```

### Step 3: Test Authentication

1. Start dev server: `npm run dev`
2. Visit http://localhost:5174/
3. Click **Login** button
4. You'll be redirected to Asgardeo sign-in page
5. Sign in with your Asgardeo credentials
6. Redirected back to RideFlow with user info displayed
7. Click **Logout** to sign out

---

## 🔐 How It Works

### Authentication Flow

```
User clicks Login
    ↓
useAuth() calls signIn()
    ↓
Redirected to Asgardeo login page
    ↓
User authenticates with credentials
    ↓
Asgardeo redirects back to http://localhost:5174/
    ↓
AuthProvider receives auth code
    ↓
Exchanges code for tokens (OAuth2 + PKCE)
    ↓
User info fetched from ID token (JWT decoded)
    ↓
useAuth hook updates state
    ↓
Navbar shows UserDisplay + Logout button
```

### Protected Routes

Routes can be protected by wrapping with `<ProtectedRoute>`:

```tsx
<Route 
  path="/rider/dashboard" 
  element={
    <ProtectedRoute>
      <RiderDashboard />
    </ProtectedRoute>
  } 
/>
```

Unauthenticated users are redirected to home (`/`).

### User Information

User data available from `useAuth()` hook:

```tsx
const { isAuthenticated, user } = useAuth();

// user object contains:
{
  name: string;           // Full name from Asgardeo
  email: string;          // Email address
  givenName: string;      // First name
  familyName: string;     // Last name
  picture: string;        // Avatar URL
  sub: string;            // Subject (unique ID)
  roles?: string[];       // User roles (if configured)
  groups?: string[];      // User groups (if configured)
  // ... plus all other OIDC claims
}
```

---

## 📦 Dependencies

Already installed in `package.json`:
- `@asgardeo/auth-react` (v5.6.0) - Asgardeo React SDK
- `react-router-dom` (v7.14.2) - Routing
- `@types/react` - TypeScript types

No additional packages needed!

---

## 🎯 Current Features

### ✅ Login Button
- Located in Navbar (top right)
- Triggers Asgardeo OIDC sign-in flow
- Uses PKCE for secure SPA authentication
- Handles errors gracefully

### ✅ Logout Button
- Located next to user info in Navbar
- Clears user state
- Redirects to home page
- Clears Asgardeo session

### ✅ Protected Routes
- `ProtectedRoute` component checks authentication
- Redirects unauthenticated users to home
- Optional role-based access control (ready for expansion)

### ✅ Current User Display
- Shows user name (from ID token)
- Shows email (if available)
- Shows avatar/picture (if configured in Asgardeo)
- Located in Navbar when authenticated

### ✅ No Custom Forms
- Uses Asgardeo's hosted login page
- No password storage in frontend
- No form validation needed
- Enterprise-grade security

---

## 🔧 Advanced Features (Optional)

### Add Role-Based Access Control

1. Configure roles in Asgardeo
2. Add roles to user ID token
3. Use `requiredRole` in ProtectedRoute:

```tsx
<Route 
  path="/admin/dashboard" 
  element={
    <ProtectedRoute requiredRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  } 
/>
```

### Access All Authentication State

```tsx
const { isAuthenticated, user, state, login, logout } = useAuth();

// state contains:
{
  isAuthenticated: boolean;
  isLoading: boolean;
  isError: boolean;
  error?: Error;
}
```

### Customize Redirect Behavior

Update `src/config/asgardeoConfig.ts`:

```typescript
{
  signInRedirectURL: "http://localhost:5174/rider/dashboard",  // Redirect here after login
  signOutRedirectURL: "http://localhost:5174/",  // Redirect here after logout
}
```

---

## 🚨 Troubleshooting

### "clientID is required" error
→ Update `src/config/asgardeoConfig.ts` with your actual Asgardeo Client ID

### Blank page after login
→ Check browser console for errors
→ Verify redirect URIs match in Asgardeo config

### "Redirect URI mismatch" error
→ In Asgardeo console, add your current URL to Authorized Redirect URIs
→ Include trailing slash: `http://localhost:5174/`

### User info not showing
→ Ensure `openid` and `profile` scopes are enabled in config
→ Check ID token payload in browser DevTools (Application → Cookies)

---

## 📝 Files Modified

```
src/
├── config/
│   └── asgardeoConfig.ts          (NEW)
├── components/
│   ├── Navbar.tsx                 (UPDATED)
│   ├── ProtectedRoute.tsx          (UPDATED)
│   └── UserDisplay.tsx             (NEW)
├── hooks/
│   └── useAuth.ts                  (UPDATED)
├── main.tsx                         (UPDATED)
└── App.tsx                         (unchanged)
```

---

## 🎓 Next Steps

1. **Configure Asgardeo credentials** in `src/config/asgardeoConfig.ts`
2. **Test login/logout** flow
3. **Verify user info** displays correctly
4. **Wrap protected routes** with `ProtectedRoute`
5. **(Optional) Add role-based access control**
6. **(Optional) Customize branding** in Asgardeo tenant

---

## 📚 Resources

- **Asgardeo Console**: https://console.asgardeo.io/
- **@asgardeo/auth-react Docs**: https://www.npmjs.com/package/@asgardeo/auth-react
- **OIDC Specification**: https://openid.net/connect/
- **OAuth 2.0 PKCE**: https://tools.ietf.org/html/rfc7636

---

## ✨ Summary

Your RideFlow frontend now has **enterprise-grade authentication** powered by Asgardeo with:
- ✅ OAuth 2.0 + OpenID Connect
- ✅ PKCE for security
- ✅ No custom login forms (uses Asgardeo hosted login)
- ✅ User profile information
- ✅ Protected routes
- ✅ Role-based access control ready
- ✅ Production-ready code

**Just update the Asgardeo config and you're ready to go!**
