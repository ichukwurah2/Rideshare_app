import { useAuth } from "../hooks/useAuth";

export default function UserDisplay() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-end">
        <p className="text-sm font-semibold text-gray-800">
          {user.name || user.givenName || "User"}
        </p>
        {user.email && (
          <p className="text-xs text-gray-500">{user.email}</p>
        )}
      </div>
      {user.picture && (
        <img
          src={user.picture}
          alt={user.name || "User"}
          className="w-8 h-8 rounded-full border border-gray-300"
        />
      )}
    </div>
  );
}
