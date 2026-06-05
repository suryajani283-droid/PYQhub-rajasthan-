export default function PurchasedPapers({ purchases }) {
  if (purchases.length === 0)
    return <p className="text-gray-500">No purchases yet.</p>;

  return (
    <ul className="space-y-3">
      {purchases.map((p) => (
        <li
          key={p.id}
          className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
        >
          <span>{p.paperName}</span>
          <a
            href={p.downloadURL}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline bg-blue-50 px-3 py-1 rounded"
          >
            Download PDF
          </a>
        </li>
      ))}
    </ul>
  );
} 