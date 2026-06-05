import { Link } from 'react-router-dom';

const categories = [
  { name: 'RAS', slug: 'ras', icon: '📘', color: 'from-blue-400 to-blue-600' },
  { name: 'REET', slug: 'reet', icon: '📗', color: 'from-green-400 to-green-600' },
  { name: 'Police', slug: 'police', icon: '👮', color: 'from-red-400 to-red-600' },
  { name: 'LDC', slug: 'ldc', icon: '📙', color: 'from-yellow-400 to-yellow-600' },
  { name: 'Patwari', slug: 'patwari', icon: '📕', color: 'from-purple-400 to-purple-600' },
  { name: 'CET Grad', slug: 'cet-grad', icon: '🎓', color: 'from-pink-400 to-pink-600' },
  { name: 'CET Sr.', slug: 'cet-senior', icon: '📓', color: 'from-indigo-400 to-indigo-600' },
  { name: 'Forest Guard', slug: 'forest-guard', icon: '🌲', color: 'from-teal-400 to-teal-600' },
];

export default function ExamCategories() {
  return (
    <section id="categories" className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-800">📚 Popular Exam Papers</h2>
        <p className="text-gray-500 mt-2">Select your exam and get instant access to previous year papers</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((exam) => (
          <Link
            key={exam.slug}
            to={`/exam/${exam.slug}`}
            className={`group relative bg-gradient-to-br ${exam.color} rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-white text-center overflow-hidden`}
          >
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <span className="text-4xl block mb-3">{exam.icon}</span>
            <span className="font-bold text-lg">{exam.name}</span>
            <span className="block text-xs mt-2 opacity-80 group-hover:opacity-100">View Papers →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}