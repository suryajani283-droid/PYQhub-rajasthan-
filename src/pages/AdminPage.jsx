import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { getAllPapers, getAllPurchases } from '../firebase/firestore';
import AdminDashboard from '../components/admin/AdminDashboard';
import PaperManager from '../components/admin/PaperManager';
import ExamTypeManager from '../components/admin/ExamTypeManager';  // नया
import BundleManager from '../components/admin/BundleManager';      // नया
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL;

  const [papers, setPapers] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const fetchData = () => {
    Promise.all([getAllPapers(), getAllPurchases()])
      .then(([papersData, purchasesData]) => {
        setPapers(papersData);
        setPurchases(purchasesData);
        setDataLoading(false);
      })
      .catch(() => setDataLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (authLoading || dataLoading) return <LoadingSpinner />;
  if (!user || user.email !== ADMIN_EMAIL) return <Navigate to="/" />;

  const totalRevenue = purchases.reduce((sum, p) => sum + (p.amount || 0), 0);
  const todayRevenue = purchases.filter(p => {
    const d = p.purchasedAt?.toDate();
    return d && d.toDateString() === new Date().toDateString();
  }).reduce((s, p) => s + (p.amount || 0), 0);
  const monthRevenue = purchases.filter(p => {
    const d = p.purchasedAt?.toDate();
    return d && d.getMonth() === new Date().getMonth() && d.getFullYear() === new Date().getFullYear();
  }).reduce((s, p) => s + (p.amount || 0), 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <AdminDashboard
        totalRevenue={totalRevenue}
        todayRevenue={todayRevenue}
        monthlyRevenue={monthRevenue}
      />
      {/* नया एग्जाम टाइप मैनेजर */}
      <ExamTypeManager />

      <div className="grid md:grid-cols-2 gap-8 mt-6">
        <PaperManager papers={papers} refreshPapers={fetchData} />
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Purchases</h2>
          {purchases.length === 0 ? (
            <p className="text-gray-500">No purchases yet.</p>
          ) : (
            <ul className="space-y-2">
              {purchases.map((p) => (
                <li key={p.id} className="bg-white p-3 rounded shadow flex justify-between">
                  <span>{p.paperName}</span>
                  <span className="font-semibold">₹{p.amount}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* बंडल मैनेजर */}
      <BundleManager />
    </div>
  );
}