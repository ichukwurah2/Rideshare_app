import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";

export interface User {
  name?: string;
  email?: string;
  id?: string;
  sub?: string;
  givenName?: string;
  familyName?: string;
  picture?: string;
  [key: string]: any;
}

export function useAuth() {
  const {
    state,
    signIn,
    signOut,
    getDecodedIDToken,
  } = useAuthContext();

  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = state?.isAuthenticated ?? false;

  // Fetch user info when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const fetchUser = async () => {
        try {
          const idToken = await getDecodedIDToken();
          if (idToken) {
            setUser({
              name: idToken.given_name || idToken.name || 'User',
              email: idToken.email,
              givenName: idToken.given_name,
              familyName: idToken.family_name,
              picture: idToken.picture,
              ...idToken,
            });
          }
        } catch (error) {
          console.error('Failed to fetch user info:', error);
        }
      };
      fetchUser();
    } else {
      setUser(null);
    }
  }, [isAuthenticated, getDecodedIDToken]);

  const login = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
    state,
  };
}