/**
 * Asgardeo Configuration
 * 
 * Replace these values with your actual Asgardeo OAuth2/OIDC client credentials:
 * - Create an app in your Asgardeo organization at: https://console.asgardeo.io/
 * - OAuth 2.0 / OpenID Connect
 * - Get clientID from app credentials
 */

export const asgardeoConfig = {
  clientID: "YOUR_ASGARDEO_CLIENT_ID",
  baseURL: "https://YOUR_ORGANIZATION.asgardeo.io",
  signInRedirectURL: "http://localhost:5174",
  signOutRedirectURL: "http://localhost:5174",
  responseMode: "form_post",
  scope: ["openid", "profile", "email"],
  enablePKCE: true,
  clockTolerance: 60,
};

/**
 * SETUP INSTRUCTIONS:
 * 
 * 1. Go to https://console.asgardeo.io/
 * 2. Create a new OAuth 2.0 / OpenID Connect application
 * 3. Application name: "RideFlow Frontend"
 * 4. Application type: Single Page Application (SPA)
 * 5. Authorized redirect URIs: http://localhost:5174/
 * 6. Allow logout: http://localhost:5174/
 * 7. Copy the Client ID to clientID above
 * 8. Replace YOUR_ORGANIZATION with your Asgardeo tenant name
 * 
 * Example:
 * {
 *   clientID: "abc123def456ghi789jkl012",
 *   baseURL: "https://mycompany.asgardeo.io",
 *   signInRedirectURL: "http://localhost:5174",
 *   signOutRedirectURL: "http://localhost:5174",
 *   ...
 * }
 */
