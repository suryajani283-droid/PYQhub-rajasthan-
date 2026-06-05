export default function ExamTable({ papers, onBuy }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Year</th>
            <th className="p-3 text-left">Paper</th>
            <th className="p-3 text-right">Price</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {papers.map((paper) => (
            <tr key={paper.id} className="border-t">
              <td className="p-3">{paper.year}</td>
              <td className="p-3">{paper.name}</td>
              <td className="p-3 text-right font-semibold">₹{paper.price}</td>
              <td className="p-3 text-center">
                <button
                  onClick={() => onBuy(paper)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                >
                  Buy Now
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}