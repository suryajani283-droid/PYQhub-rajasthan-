import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPapersByExam } from '../firebase/firestore';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import ExamTable from '../components/exam/ExamTable';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function ExamPage() {
  const { examId } = useParams();
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    getPapersByExam(examId.toUpperCase())
      .then(setPapers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [examId]);

  const handleBuy = (paper) => {
    if (!user) {
      alert('Please login first');
      return;
    }
    // Temporary placeholder for Razorpay
    alert(`Payment: ${paper.name} (₹${paper.price})`);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <Helmet>
        <title>{examId.toUpperCase()} Previous Year Papers PDF Download</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">{examId.toUpperCase()} Previous Year Papers</h1>
      {papers.length === 0 ? (
        <p className="text-gray-500">No papers available yet.</p>
      ) : (
        <ExamTable papers={papers} onBuy={handleBuy} />
      )}
    </div>
  );
} 