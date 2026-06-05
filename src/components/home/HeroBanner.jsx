export default function HeroBanner() {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-4">
        Rajasthan Competition PYQ Portal
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        15+ Years Previous Papers • Download PDF Instantly
      </p>
      <div className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search Exam Name..."
          className="w-full px-4 py-3 border-2 border-blue-300 rounded-full focus:outline-none focus:border-blue-500 text-lg"
        />
      </div>
    </div>
  );
} 