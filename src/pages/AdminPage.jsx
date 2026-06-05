import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { getAllPapers, getAllPurchases } from '../firebase/firestore';
import AdminDashboard from '../components/admin/AdminDashboard';
import PaperManager from '../components/admin/PaperManager';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ADMIN_EMAIL = 'your-admin-email@gmail.com'; // अपनी ईमेल डालें

export default function AdminPage() {
  const { user, loading } = useAuth();
  const [papers, setPapers] = useState([]);
  const [purchases, setPurchases] = useState([]);

  const fetchData = () => {
    getAllPapers().then(setPapers);
    getAllPurchases().then(setPurchases);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!user || user.email !== ADMIN_EMAIL) return <Navigate to="/" />;

  const totalRevenue = purchases.reduce((sum, p) => sum + p.amount, 0);
  // Simple today/month calculation (you can enhance)
  const todayRevenue = purchases
    .filter(p => {
      const d = p.purchasedAt?.toDate();
      return d && d.toDateString() === new Date().toDateString();
    })
    .reduce((s, p) => s + p.amount, 0);
  const monthRevenue = purchases
    .filter(p => {
      const d = p.purchasedAt?.toDate();
      return d && d.getMonth() === new Date().getMonth() && d.getFullYear() === new Date().getFullYear();
    })
    .reduce((s, p) => s + p.amount, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <AdminDashboard totalRevenue={totalRevenue} todayRevenue={todayRevenue} monthlyRevenue={monthRevenue} />
      <div className="grid md:grid-cols-2 gap-8">
        <PaperManager papers={papers} refreshPapers={fetchData} />
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Purchases</h2>
          {purchases.length === 0 ? <p className="text-gray-500">No purchases yet.</p> :
            <ul className="space-y-2">
              {purchases.map(p => (
                <li key={p.id} className="bg-white p-3 rounded shadow flex justify-between">
                  <span>{p.paperName}</span>
                  <span className="font-semibold">₹{p.amount}</span>
                </li>
              ))}
            </ul>
          }
        </div>
      </div>
    </div>
  );
} 