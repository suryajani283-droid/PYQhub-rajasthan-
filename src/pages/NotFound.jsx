import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-gray-300">404</h1>
      <p className="text-xl mt-4 mb-6">Page not found</p>
      <Link to="/" className="text-blue-600 hover:underline">
        Go back home
      </Link>
    </div>
  );
}