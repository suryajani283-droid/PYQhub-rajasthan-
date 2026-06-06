import { useState, useEffect } from 'react';
import { addPaper, updatePaper, deletePaper, getExamTypes } from '../../firebase/firestore';

export default function PaperManager({ papers, refreshPapers }) {
  const [examTypes, setExamTypes] = useState([]);
  const [exam, setExam] = useState('');
  const [year, setYear] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [downloadURL, setDownloadURL] = useState('');  // Google Drive Direct Download Link
  const [isFree, setIsFree] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getExamTypes().then(list => {
      setExamTypes(list);
      if (list.length > 0 && !exam) setExam(list[0].slug);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!downloadURL) return alert('Please paste Google Drive download link');
    try {
      const paperData = {
        exam: exam.toUpperCase(),
        year: parseInt(year),
        name,
        price: parseInt(price),
        downloadURL,
        isFree,
      };
      if (editingId) {
        await updatePaper(editingId, paperData);
        setEditingId(null);
      } else {
        await addPaper(paperData);
      }
      alert('Paper saved!');
      refreshPapers();
      setYear(''); setName(''); setPrice(''); setDownloadURL(''); setIsFree(false);
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleEdit = (paper) => {
    setExam(paper.exam);
    setYear(paper.year.toString());
    setName(paper.name);
    setPrice(paper.price.toString());
    setDownloadURL(paper.downloadURL || '');
    setIsFree(paper.isFree || false);
    setEditingId(paper.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this paper?')) {
      await deletePaper(id);
      refreshPapers();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        {editingId ? 'Edit Paper' : 'Add New Paper'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Exam Dropdown */}
        <select value={exam} onChange={(e) => setExam(e.target.value)} className="w-full p-2 border rounded" required>
          {examTypes.map(et => (
            <option key={et.slug} value={et.slug}>{et.icon} {et.name}</option>
          ))}
        </select>

        <input type="number" placeholder="Year" value={year} onChange={e => setYear(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Paper Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="number" placeholder="Price (₹)" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2 border rounded" required />

        {/* Google Drive Link Input */}
        <input type="url" placeholder="Google Drive Direct Download Link (https://drive.google.com/uc?export=download&id=...)" value={downloadURL} onChange={e => setDownloadURL(e.target.value)} className="w-full p-2 border rounded" required />

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isFree} onChange={e => setIsFree(e.target.checked)} />
          <span className="text-sm">Free Paper</span>
        </label>

        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {editingId ? 'Update' : 'Upload'}
          </button>
          {editingId && (
            <button type="button" onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-4 py-2 rounded">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-8">
        <h3 className="font-semibold mb-2">Existing Papers</h3>
        {papers.length === 0 ? (
          <p className="text-gray-500">No papers added.</p>
        ) : (
          <ul className="space-y-2">
            {papers.map(paper => (
              <li key={paper.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                <span>{paper.exam} {paper.year} - {paper.name} (₹{paper.price}) {paper.isFree ? '(Free)' : ''}</span>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(paper)} className="text-blue-600 hover:underline text-sm">Edit</button>
                  <button onClick={() => handleDelete(paper.id)} className="text-red-600 hover:underline text-sm">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}