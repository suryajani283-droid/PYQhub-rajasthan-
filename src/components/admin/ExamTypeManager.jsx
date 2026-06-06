import { useState, useEffect } from 'react';
import { getExamTypes, addExamType, deleteExamType } from '../../firebase/firestore';

export default function ExamTypeManager() {
  const [examTypes, setExamTypes] = useState([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [icon, setIcon] = useState('📘');
  const [msg, setMsg] = useState('');

  const fetch = () => {
    getExamTypes()
      .then(setExamTypes)
      .catch(err => setMsg('Fetch error: ' + err.message));
  };
  useEffect(() => { fetch(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name || !slug) return setMsg('Name and slug required');
    try {
      await addExamType({ name, slug: slug.toLowerCase(), icon });
      setName(''); setSlug(''); setIcon('📘'); setMsg('✅ Added successfully!');
      fetch();
    } catch (err) {
      setMsg('❌ ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this exam type?')) return;
    try {
      await deleteExamType(id);
      fetch();
      setMsg('Deleted.');
    } catch (err) {
      setMsg('❌ ' + err.message);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="font-semibold mb-2">Exam Types</h3>
      {msg && <div className="text-sm mb-2 text-red-600">{msg}</div>}
      <form onSubmit={handleAdd} className="flex flex-wrap gap-2 mb-4">
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="border p-2 rounded w-1/3" required />
        <input placeholder="Slug (ras)" value={slug} onChange={e => setSlug(e.target.value)} className="border p-2 rounded w-1/3" required />
        <input placeholder="Icon" value={icon} onChange={e => setIcon(e.target.value)} className="border p-2 rounded w-20" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
      </form>
      <ul className="space-y-1">
        {examTypes.map(ex => (
          <li key={ex.id} className="flex justify-between border-b py-1">
            <span>{ex.icon} {ex.name} ({ex.slug})</span>
            <button onClick={() => handleDelete(ex.id)} className="text-red-600 text-sm">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}