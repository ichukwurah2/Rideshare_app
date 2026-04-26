import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import UserDisplay from "./UserDisplay";

export default function Navbar() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <header className="h-16 border-b bg-white px-6 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-blue-700">
        RideFlow
      </Link>

      <div className="flex items-center gap-6">
        {isAuthenticated ? (
          <>
            <UserDisplay />
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
              title="Sign out of your Asgardeo account"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={login}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            title="Sign in with Asgardeo"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}