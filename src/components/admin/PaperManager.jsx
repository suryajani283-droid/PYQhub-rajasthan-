import { useState, useEffect } from 'react';
import { getExamTypes, addPaper, updatePaper, deletePaper, getAllPapers } from '../../firebase/firestore';

export default function PaperManager({ papers, refreshPapers }) {
  const [examTypes, setExamTypes] = useState([]);
  const [exam, setExam] = useState('');
  const [year, setYear] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [driveURL, setDriveURL] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getExamTypes().then(types => {
      setExamTypes(types);
      if (types.length > 0 && !exam) setExam(types[0].slug);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!driveURL) return setMsg('Please provide Google Drive download link');
    const data = { exam: exam.toUpperCase(), year: parseInt(year), name, price: parseInt(price), downloadURL: driveURL, isFree };
    try {
      if (editingId) {
        await updatePaper(editingId, data);
        setEditingId(null);
        setMsg('Paper updated!');
      } else {
        await addPaper(data);
        setMsg('Paper added!');
      }
      setYear(''); setName(''); setPrice(''); setDriveURL(''); setIsFree(false);
      refreshPapers();
    } catch (err) {
      setMsg('❌ ' + err.message);
    }
  };

  const handleEdit = (paper) => {
    setExam(paper.exam);
    setYear(paper.year.toString());
    setName(paper.name);
    setPrice(paper.price.toString());
    setDriveURL(paper.downloadURL || '');
    setIsFree(paper.isFree || false);
    setEditingId(paper.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete paper?')) return;
    try {
      await deletePaper(id);
      refreshPapers();
      setMsg('Paper deleted.');
    } catch (err) {
      setMsg('❌ ' + err.message);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="font-semibold mb-2">{editingId ? 'Edit Paper' : 'Add New Paper'}</h3>
      {msg && <div className="text-sm mb-2 text-red-600">{msg}</div>}
      <form onSubmit={handleSubmit} className="space-y-2">
        <select value={exam} onChange={e => setExam(e.target.value)} className="w-full border p-2 rounded">
          {examTypes.map(et => <option key={et.slug} value={et.slug}>{et.icon} {et.name}</option>)}
        </select>
        <input type="number" placeholder="Year" value={year} onChange={e => setYear(e.target.value)} className="w-full border p-2 rounded" required />
        <input type="text" placeholder="Paper Name" value={name} onChange={e => setName(e.target.value)} className="w-full border p-2 rounded" required />
        <input type="number" placeholder="Price (₹)" value={price} onChange={e => setPrice(e.target.value)} className="w-full border p-2 rounded" required />
        <input type="url" placeholder="Google Drive Direct Download Link" value={driveURL} onChange={e => setDriveURL(e.target.value)} className="w-full border p-2 rounded" required />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isFree} onChange={e => setIsFree(e.target.checked)} />
          Free Paper
        </label>
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editingId ? 'Update' : 'Upload'}</button>
          {editingId && <button type="button" onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>}
        </div>
      </form>

      <div className="mt-4">
        <h4 className="font-medium mb-2">Existing Papers</h4>
        {papers.length === 0 && <p className="text-gray-500">No papers.</p>}
        <ul className="space-y-1">
          {papers.map(paper => (
            <li key={paper.id} className="flex justify-between text-sm border-b py-1">
              <span>{paper.exam} {paper.year} - {paper.name} (₹{paper.price}) {paper.isFree ? '(Free)' : ''}</span>
              <div>
                <button onClick={() => handleEdit(paper)} className="text-blue-600 mr-2">Edit</button>
                <button onClick={() => handleDelete(paper.id)} className="text-red-600">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}