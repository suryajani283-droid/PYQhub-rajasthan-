export default function AdminDashboard({ totalRevenue, todayRevenue, monthlyRevenue }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-gray-500">Total Revenue</p>
        <p className="text-2xl font-bold">₹{totalRevenue}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-gray-500">Today's Revenue</p>
        <p className="text-2xl font-bold">₹{todayRevenue}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-gray-500">This Month</p>
        <p className="text-2xl font-bold">₹{monthlyRevenue}</p>
      </div>
    </div>
  );
} 