import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logoutUser } from '../../firebase/auth';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          PYQHub Rajasthan
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          {user ? (
            <>
              <Link to="/dashboard" className="hover:underline">
                📂 My Purchases
              </Link>
              <button
                onClick={logoutUser}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-white text-blue-700 px-4 py-1 rounded font-medium"
            >
              Login / Register
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}