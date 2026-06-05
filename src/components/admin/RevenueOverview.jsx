export default function RevenueOverview({ purchases }) {
  const total = purchases.reduce((sum, p) => sum + p.amount, 0);
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold">Revenue Overview</h2>
      <p className="text-2xl">₹{total}</p>
    </div>
  );
} 