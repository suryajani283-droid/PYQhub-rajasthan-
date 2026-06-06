import { useState, useEffect } from 'react';
import { getExamTypes, addExamType, deleteExamType } from '../../firebase/firestore';

export default function ExamTypeManager() {
  const [examTypes, setExamTypes] = useState([]);
  const [newName, setNewName] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [newIcon, setNewIcon] = useState('📘');
  const [loading, setLoading] = useState(false);

  const fetch = () => {
    getExamTypes()
      .then(setExamTypes)
      .catch(err => alert('Fetch error: ' + err.message));
  };

  useEffect(() => { fetch(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newName || !newSlug) {
      alert('Name and slug are required.');
      return;
    }
    setLoading(true);
    try {
      await addExamType({ name: newName, slug: newSlug.toLowerCase(), icon: newIcon });
      alert('✅ Exam Type added successfully!');
      setNewName('');
      setNewSlug('');
      setNewIcon('📘');
      fetch(); // Refresh the list
    } catch (err) {
      alert('❌ Add failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this exam type?')) return;
    try {
      await deleteExamType(id);
      alert('Deleted successfully');
      fetch();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-semibold mb-3">Manage Exam Types</h3>

      <form onSubmit={handleAdd} className="flex flex-col gap-2 mb-4">
        <input type="text" placeholder="Exam Name (e.g. RAS)" value={newName} onChange={e => setNewName(e.target.value)} className="border p-2 rounded" required />
        <input type="text" placeholder="Slug (e.g. ras)" value={newSlug} onChange={e => setNewSlug(e.target.value)} className="border p-2 rounded" required />
        <input type="text" placeholder="Icon (emoji)" value={newIcon} onChange={e => setNewIcon(e.target.value)} className="border p-2 rounded" />
        <button type="submit" disabled={loading} className="bg-green-600 text-white py-2 rounded disabled:opacity-50">
          {loading ? 'Adding...' : 'Add Exam Type'}
        </button>
      </form>

      <ul className="space-y-1">
        {examTypes.length === 0 && <p className="text-gray-500">No exam types yet.</p>}
        {examTypes.map(ex => (
          <li key={ex.id} className="flex justify-between items-center border-b py-1">
            <span>{ex.icon} {ex.name} ({ex.slug})</span>
            <button onClick={() => handleDelete(ex.id)} className="text-red-600 hover:underline text-sm">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}