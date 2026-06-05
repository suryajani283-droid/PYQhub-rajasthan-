import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

export default function AdminRoute({ children }) {
  const { user, loading: authLoading } = useAuth();
  const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL;

  if (authLoading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/" />;

  if (user.email !== ADMIN_EMAIL) {
    return (
      <div style={{ padding: 20, background: 'white', color: 'black' }}>
        <h2>🚫 Access Denied</h2>
        <p>You are not authorized to view this page.</p>
        <button onClick={() => window.location.href = '/'}>Go Home</button>
      </div>
    );
  }

  return children;
}