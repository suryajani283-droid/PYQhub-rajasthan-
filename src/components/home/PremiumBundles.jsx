import { useState, useEffect } from 'react';
import { getBundles } from '../../firebase/firestore';

export default function PremiumBundles() {
  const [bundles, setBundles] = useState([]);

  useEffect(() => {
    getBundles().then(setBundles).catch(console.error);
  }, []);

  if (bundles.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-800">🔥 Premium Bundles</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {bundles.map(bundle => (
          <div key={bundle.id} className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-yellow-400 text-center">
            <h3 className="text-xl font-bold">{bundle.name}</h3>
            <div className="mt-2">
              <span className="text-3xl font-extrabold">₹{bundle.price}</span>
              {bundle.originalPrice && <span className="text-gray-400 line-through ml-2">₹{bundle.originalPrice}</span>}
            </div>
            <a
              href={bundle.downloadURL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700"
            >
              Buy Now
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}