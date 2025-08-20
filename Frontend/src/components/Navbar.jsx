import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onSearch }) {
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-yellow-400">
            NoteApp
          </Link>

          <div className="flex-1 mx-4">
            <input
              type="text"
              placeholder="Search notes..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full max-w-md px-3 py-2 rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-yellow-400 font-medium">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-md hover:bg-yellow-400 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-md hover:bg-yellow-400 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 border border-yellow-500 text-yellow-500 rounded-md hover:bg-yellow-500 hover:text-gray-900 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
