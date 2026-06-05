import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

export default function AdminRoute({ children }) {
  const { user, loading: authLoading } = useAuth();
  
  // Temporary: allow only this email
  const ADMIN_EMAIL = 'raju@gmail.com';

  if (authLoading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/" />;
  
  if (user.email !== ADMIN_EMAIL) {
    return (
      <div style={{ padding: 20 }}>
        <h2>🚫 Access Denied</h2>
        <p>You are not admin.</p>
      </div>
    );
  }

  return children;
}