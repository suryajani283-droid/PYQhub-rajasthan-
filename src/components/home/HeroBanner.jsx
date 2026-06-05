import { useState } from 'react';
import ExamSearchModal from './ExamSearchModal';

export default function HeroBanner() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white rounded-3xl overflow-hidden shadow-2xl mb-12 p-8 md:p-16">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <span className="inline-block bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 animate-pulse">
            🚀 Trusted by 50,000+ Aspirants
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Rajasthan Competition <span className="text-yellow-300">PYQ Portal</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            15+ Years Previous Papers • Instant PDF Download • Pay One Time
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowModal(true)}
              className="bg-white text-blue-700 font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              Explore Exams
            </button>
            <a
              href="#bundles"
              className="bg-yellow-400 text-blue-900 font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              View Premium Bundles
            </a>
          </div>
          <div className="mt-8 flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span>⭐⭐⭐⭐⭐</span> 4.9/5 Ratings
            </div>
            <div className="flex items-center gap-2">
              🔒 Secure Payment
            </div>
            <div className="flex items-center gap-2">
              ⚡ Instant Access
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <ExamSearchModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}