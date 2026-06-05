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

  useEffect(() => {
    if (!user) {
      setChecking(false);
      return;
    }
    const adminRef = doc(db, 'admins', user.uid);
    getDoc(adminRef)
      .then((docSnap) => {
        setIsAdmin(docSnap.exists());
        setChecking(false);
      })
      .catch(() => {
        setIsAdmin(false);
        setChecking(false);
      });
  }, [user]);

  if (authLoading || checking) return <LoadingSpinner />;
  if (!user || !isAdmin) return <Navigate to="/" />;
  return children;
}