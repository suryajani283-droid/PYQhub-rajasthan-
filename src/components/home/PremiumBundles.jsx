import { useState, useEffect } from 'react';
import { getBundles } from '../../firebase/firestore';

export default function PremiumBundles() {
  const [bundles, setBundles] = useState([]);

  useEffect(() => {
    getBundles().then(setBundles).catch(console.error);
  }, []);

  if (bundles.length === 0) return null;

  return (
    <section id="bundles" className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-800">🔥 Premium Bundles</h2>
        <p className="text-gray-500 mt-2">Save big with our most popular combinations</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {bundles.map((bundle) => (
          <div
            key={bundle.id}
            className={`relative bg-gradient-to-b from-yellow-50 to-white rounded-3xl p-6 border-t-4 border-yellow-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col`}
          >
            <h3 className="text-xl font-bold mt-2">{bundle.name}</h3>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-800">₹{bundle.price}</span>
              {bundle.originalPrice && (
                <span className="text-sm text-gray-400 line-through">₹{bundle.originalPrice}</span>
              )}
              <span className="text-green-600 text-sm font-semibold">50% off</span>
            </div>
            <a
              href={bundle.downloadURL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-md text-center"
            >
              Buy Now
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}