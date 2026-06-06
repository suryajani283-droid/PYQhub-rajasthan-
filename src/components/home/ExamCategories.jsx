import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getExamTypes } from '../../firebase/firestore';

export default function ExamCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getExamTypes()
      .then(setCategories)
      .catch(console.error);
  }, []);

  if (categories.length === 0) return null; // या कोई लोडिंग दिखाएँ

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
            className="group relative bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-white text-center overflow-hidden"
          >
            <span className="text-4xl block mb-3">{exam.icon || '📘'}</span>
            <span className="font-bold text-lg">{exam.name}</span>
            <span className="block text-xs mt-2 opacity-80 group-hover:opacity-100">View Papers →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}