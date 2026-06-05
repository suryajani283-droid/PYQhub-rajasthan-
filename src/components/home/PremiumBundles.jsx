const bundles = [
  {
    name: 'RAS 15 Years PYQ',
    price: 299,
    originalPrice: 599,
    exam: 'ras',
    popular: false,
    color: 'border-blue-500',
    bg: 'bg-gradient-to-b from-blue-50 to-white',
  },
  {
    name: 'LDC 15 Years PYQ',
    price: 199,
    originalPrice: 399,
    exam: 'ldc',
    popular: false,
    color: 'border-green-500',
    bg: 'bg-gradient-to-b from-green-50 to-white',
  },
  {
    name: 'Complete Rajasthan Pack',
    price: 999,
    originalPrice: 1999,
    exam: 'all',
    popular: true,
    color: 'border-yellow-500',
    bg: 'bg-gradient-to-b from-yellow-50 to-white',
  },
];

export default function PremiumBundles() {
  return (
    <section id="bundles" className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-800">🔥 Premium Bundles</h2>
        <p className="text-gray-500 mt-2">Save big with our most popular combinations</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {bundles.map((bundle) => (
          <div
            key={bundle.exam}
            className={`relative ${bundle.bg} rounded-3xl p-6 border-t-4 ${bundle.color} shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col`}
          >
            {bundle.popular && (
              <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full uppercase">
                Most Popular
              </span>
            )}
            <h3 className="text-xl font-bold mt-2">{bundle.name}</h3>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-800">₹{bundle.price}</span>
              <span className="text-sm text-gray-400 line-through">₹{bundle.originalPrice}</span>
              <span className="text-green-600 text-sm font-semibold">50% off</span>
            </div>
            <ul className="mt-5 space-y-2 text-gray-600 text-sm flex-1">
              <li>✅ All papers of {bundle.exam === 'all' ? 'all exams' : bundle.name.split(' ')[0]}</li>
              <li>✅ 15+ years coverage</li>
              <li>✅ Instant PDF download</li>
              <li>✅ Lifetime access</li>
            </ul>
            <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-md">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}