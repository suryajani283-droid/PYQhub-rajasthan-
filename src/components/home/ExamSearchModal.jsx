import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const allExams = [
  { name: 'RAS', slug: 'ras', icon: '📘', keywords: 'ras rajsthan administrative service' },
  { name: 'REET', slug: 'reet', icon: '📗', keywords: 'reet rajasthan eligibility exam teacher' },
  { name: 'Rajasthan Police', slug: 'police', icon: '👮', keywords: 'police constable si' },
  { name: 'LDC', slug: 'ldc', icon: '📙', keywords: 'ldc lower division clerk' },
  { name: 'Patwari', slug: 'patwari', icon: '📕', keywords: 'patwari land record' },
  { name: 'CET Graduation', slug: 'cet-grad', icon: '🎓', keywords: 'cet graduation common eligibility test' },
  { name: 'CET Sr. Secondary', slug: 'cet-senior', icon: '📓', keywords: 'cet senior secondary 12th' },
  { name: 'Forest Guard', slug: 'forest-guard', icon: '🌲', keywords: 'forest guard van rakshak' },
  { name: 'Jail Prahari', slug: 'jail-prahari', icon: '🔒', keywords: 'jail prahari prison guard' },
  { name: 'Lab Assistant', slug: 'lab-assistant', icon: '🔬', keywords: 'lab assistant science' },
  { name: 'Informatics Assistant', slug: 'informatics', icon: '💻', keywords: 'informatics assistant computer' },
];

export default function ExamSearchModal({ isOpen, onClose }) {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState(allExams);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Filter exams based on search
  useEffect(() => {
    if (!search.trim()) {
      setResults(allExams);
      return;
    }
    const query = search.toLowerCase();
    const filtered = allExams.filter(
      (exam) =>
        exam.name.toLowerCase().includes(query) ||
        exam.keywords.includes(query)
    );
    setResults(filtered);
  }, [search]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleExamClick = (slug) => {
    navigate(`/exam/${slug}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl mx-4 rounded-3xl shadow-2xl overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="p-6 border-b flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search exam name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
          </div>
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 rounded-full p-3 transition"
          >
            ✕
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-4">
          {results.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <span className="text-4xl block mb-3">😕</span>
              No exam found for "{search}"
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {results.map((exam) => (
                <button
                  key={exam.slug}
                  onClick={() => handleExamClick(exam.slug)}
                  className="flex items-center gap-4 bg-gray-50 hover:bg-blue-50 p-4 rounded-2xl transition text-left"
                >
                  <span className="text-3xl">{exam.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-800">{exam.name}</p>
                    <p className="text-xs text-gray-500">{exam.slug.toUpperCase()} PYQs</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="p-3 bg-gray-50 border-t text-center text-xs text-gray-400">
          Press <kbd className="bg-gray-200 px-2 py-0.5 rounded">ESC</kbd> to close
        </div>
      </div>
    </div>
  );
}