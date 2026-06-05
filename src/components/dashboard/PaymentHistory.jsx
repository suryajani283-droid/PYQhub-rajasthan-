export default function PaymentHistory({ payments }) {
  // Assuming each payment has date, orderId, amount, status
  if (!payments || payments.length === 0)
    return <p className="text-gray-500">No payment history.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Order ID</th>
            <th className="p-3 text-right">Amount</th>
            <th className="p-3 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-3">{new Date(p.purchasedAt?.toDate()).toLocaleDateString()}</td>
              <td className="p-3 text-sm">{p.razorpay_order_id}</td>
              <td className="p-3 text-right">₹{p.amount}</td>
              <td className="p-3 text-center">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                  Paid
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 