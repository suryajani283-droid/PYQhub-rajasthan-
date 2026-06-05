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
    <section className="mb-16 bg-gray-900 text-white rounded-3xl p-8 md:p-12 shadow-xl">
      <div className="text-center mb-8">
        <span className="inline-block bg-green-500 text-white text-xs px-3 py-1 rounded-full uppercase mb-3">Limited Free Access</span>
        <h2 className="text-3xl font-extrabold">🆓 Try Before You Buy</h2>
        <p className="text-gray-300 mt-2">Download sample papers for free. No login required.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {papers.map((paper) => (
          <div
            key={paper.id}
            className="bg-white/10 backdrop-blur-lg p-5 rounded-xl flex justify-between items-center hover:bg-white/20 transition"
          >
            <div>
              <p className="font-semibold">{paper.name}</p>
              <p className="text-sm text-gray-300">{paper.exam} • {paper.year}</p>
            </div>
            <a
              href={paper.downloadURL}
              target="_blank"
              rel="noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-medium transition"
            >
              Download Free
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}