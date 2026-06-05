import ProtectedRoute from '../components/common/ProtectedRoute';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { getUserPurchases } from '../firebase/firestore';
import PurchasedPapers from '../components/dashboard/PurchasedPapers';

function DashboardContent() {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    if (user) {
      getUserPurchases(user.uid).then(setPurchases).catch(console.error);
    }
  }, [user]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">My Dashboard</h1>
      <p className="mb-6 text-gray-600">Welcome, {user?.displayName || user?.email}</p>
      <h2 className="text-xl font-semibold mb-3">📥 My Purchases</h2>
      <PurchasedPapers purchases={purchases} />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
} 