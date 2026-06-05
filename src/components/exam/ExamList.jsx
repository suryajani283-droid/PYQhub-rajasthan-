export default function ExamList({ papers, onBuy }) {
  return (
    <div className="space-y-4">
      {papers.map((paper) => (
        <div key={paper.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
          <div>
            <span className="font-medium">{paper.year} - {paper.name}</span>
            <span className="text-gray-500 ml-4">₹{paper.price}</span>
          </div>
          <button
            onClick={() => onBuy(paper)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
          >
            Buy Now
          </button>
        </div>
      ))}
    </div>
  );
} 