import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const ADMIN_EMAIL = 'your-admin-email@gmail.com'; // बदलें

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!user || user.email !== ADMIN_EMAIL) return <Navigate to="/" />;
  return children;
}