import { Link } from 'react-router-dom';

const categories = [
  { name: 'RAS', slug: 'ras', icon: '📘' },
  { name: 'REET', slug: 'reet', icon: '📗' },
  { name: 'Rajasthan Police', slug: 'police', icon: '👮' },
  { name: 'LDC', slug: 'ldc', icon: '📙' },
  { name: 'Patwari', slug: 'patwari', icon: '📕' },
  { name: 'CET Graduation', slug: 'cet-grad', icon: '🎓' },
  { name: 'CET Sr. Secondary', slug: 'cet-senior', icon: '📓' },
  { name: 'Forest Guard', slug: 'forest-guard', icon: '🌲' },
  { name: 'Jail Prahari', slug: 'jail-prahari', icon: '🔒' },
  { name: 'Lab Assistant', slug: 'lab-assistant', icon: '🔬' },
  { name: 'Informatics Assistant', slug: 'informatics', icon: '💻' },
];

export default function ExamCategories() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-center">📚 Exam Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((exam) => (
          <Link
            key={exam.slug}
            to={`/exam/${exam.slug}`}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center gap-2 border border-gray-100"
          >
            <span className="text-3xl">{exam.icon}</span>
            <span className="font-medium text-gray-800">{exam.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
} 