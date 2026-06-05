import { useAuth } from '../../context/AuthContext';

export default function PurchasedPapers({ purchases }) {
  const { user } = useAuth();

  const handleDownload = async (paperId) => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      // 🔁 अपने Worker का असली URL डालें
      const workerUrl = `https://pyqhub-download.आपका-subdomain.workers.dev?token=${token}&paperId=${paperId}`;
      window.open(workerUrl, '_blank');
    } catch (err) {
      alert('Download failed: ' + err.message);
    }
  };

  if (purchases.length === 0) {
    return <p className="text-gray-500">No purchases yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {purchases.map((p) => (
        <li key={p.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
          <span>{p.paperName || p.paperId}</span>
          <button
            onClick={() => handleDownload(p.paperId)}
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200"
          >
            Download PDF
          </button>
        </li>
      ))}
    </ul>
  );
}