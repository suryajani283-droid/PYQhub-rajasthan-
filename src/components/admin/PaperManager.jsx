import { useState, useEffect } from 'react';
import { addPaper, updatePaper, deletePaper, getExamTypes } from '../../firebase/firestore';
import { uploadPDF } from '../../firebase/storage';

export default function PaperManager({ papers, refreshPapers }) {
  const [examTypes, setExamTypes] = useState([]);
  const [exam, setExam] = useState('');
  const [year, setYear] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getExamTypes().then(list => {
      setExamTypes(list);
      if (list.length > 0 && !exam) setExam(list[0].slug);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file && !editingId) return alert('Select PDF file');
    try {
      let url = editingId ? papers.find(p => p.id === editingId)?.downloadURL : '';
      if (file) {
        url = await uploadPDF(file, `papers/${exam}_${year}.pdf`);
      }
      const paperData = {
        exam: exam.toUpperCase(),
        year: parseInt(year),
        name,
        price: parseInt(price),
        downloadURL: url,
        isFree: false,
      };
      if (editingId) {
        await updatePaper(editingId, paperData);
        setEditingId(null);
      } else {
        await addPaper(paperData);
      }
      alert('Paper saved!');
      refreshPapers();
      setYear(''); setName(''); setPrice(''); setFile(null);
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleEdit = (paper) => {
    setExam(paper.exam);
    setYear(paper.year.toString());
    setName(paper.name);
    setPrice(paper.price.toString());
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
        <select
          value={exam}
          onChange={(e) => setExam(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          {examTypes.map(et => (
            <option key={et.slug} value={et.slug}>{et.icon} {et.name}</option>
          ))}
        </select>

        <input type="number" placeholder="Year" value={year} onChange={e => setYear(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Paper Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="number" placeholder="Price (₹)" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} className="w-full" />
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
                <span>{paper.exam} {paper.year} - {paper.name} (₹{paper.price})</span>
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