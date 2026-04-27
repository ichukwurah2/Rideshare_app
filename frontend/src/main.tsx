import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from '@asgardeo/auth-react'
import './index.css'
import App from './App.tsx'

const asgardeoConfig = {
  clientID: "YOUR_ASGARDEO_CLIENT_ID",
  baseURL: "https://YOUR_ORGANIZATION.asgardeo.io",
  signInRedirectURL: "http://localhost:5174",
  signOutRedirectURL: "http://localhost:5174",
  scope: ["openid", "profile", "email"],
  enablePKCE: true,
  clockTolerance: 60,
  endpoints: {
    authorizationEndpoint: "/oauth2/authorize",
    tokenEndpoint: "/oauth2/token",
    revocationEndpoint: "/oauth2/revoke",
    userinfoEndpoint: "/oauth2/userinfo",
    jwksUri: "/.well-known/jwks.json",
    checkSessionIframe: "/oauth2/checksession",
    endSessionEndpoint: "/oauth2/logout",
    issuer: "https://YOUR_ORGANIZATION.asgardeo.io",
    wellKnownEndpoint: "/.well-known/openid-configuration",
  },
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider config={asgardeoConfig}>
      <App />
    </AuthProvider>
  </StrictMode>,
)
