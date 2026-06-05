import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import LoadingSpinner from './LoadingSpinner';

export default function AdminRoute({ children }) {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    if (!user) {
      setChecking(false);
      setDebugInfo('No user logged in.');
      return;
    }
    const adminRef = doc(db, 'admins', user.uid);
    setDebugInfo(`Checking UID: ${user.uid}`);

    getDoc(adminRef)
      .then((docSnap) => {
        const exists = docSnap.exists();
        setIsAdmin(exists);
        setDebugInfo(`UID: ${user.uid} | Admin doc exists: ${exists}`);
        setChecking(false);
      })
      .catch((error) => {
        setIsAdmin(false);
        setDebugInfo(`Error: ${error.message}`);
        setChecking(false);
      });
  }, [user]);

  if (authLoading || checking) return <LoadingSpinner />;

  if (!user || !isAdmin) {
    return (
      <div style={{ padding: 20, background: 'white', color: 'black' }}>
        <h2>🚫 Admin Access Denied</h2>
        <p>{debugInfo}</p>
        {user && <p>Logged in as: {user.email}</p>}
        <button onClick={() => window.location.href = '/'}>Go Home</button>
      </div>
    );
  }

  return children;
}