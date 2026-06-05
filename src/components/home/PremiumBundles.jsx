const bundles = [
  { name: 'RAS 15 Years PYQ', price: 299, exam: 'ras' },
  { name: 'LDC 15 Years PYQ', price: 199, exam: 'ldc' },
  { name: 'Complete Rajasthan Pack', price: 999, exam: 'all' },
];

export default function PremiumBundles() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-center">🔥 Premium Bundles</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {bundles.map((bundle) => (
          <div
            key={bundle.exam}
            className="bg-white p-6 rounded-xl shadow-md border-t-4 border-yellow-400 flex flex-col items-center"
          >
            <h3 className="text-xl font-semibold mb-2">{bundle.name}</h3>
            <p className="text-3xl font-bold text-blue-700 mb-4">₹{bundle.price}</p>
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-full transition">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
} 