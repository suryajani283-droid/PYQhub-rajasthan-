import { useState, useEffect } from 'react';
import { getFreePapers } from '../../firebase/firestore';

export default function FreePapers() {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    getFreePapers()
      .then(setPapers)
      .catch(console.error);
  }, []);

  if (papers.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-center">🆓 Free Sample Papers</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {papers.map((paper) => (
          <div
            key={paper.id}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{paper.name}</p>
              <p className="text-sm text-gray-500">
                {paper.exam} • {paper.year}
              </p>
            </div>
            <a
              href={paper.downloadURL}
              target="_blank"
              rel="noreferrer"
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200"
            >
              Download PDF
            </a>
          </div>
        ))}
      </div>
    </section>
  );
} 