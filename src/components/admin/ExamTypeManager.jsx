import { useState, useEffect } from 'react';
import { getExamTypes, addExamType } from '../../firebase/firestore';

export default function ExamTypeManager() {
  const [examTypes, setExamTypes] = useState([]);
  const [newName, setNewName] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [newIcon, setNewIcon] = useState('📘');

  const fetch = () => {
    getExamTypes().then(setExamTypes).catch(console.error);
  };

  useEffect(() => { fetch(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newName || !newSlug) return alert('Name and slug required');
    await addExamType({ name: newName, slug: newSlug.toLowerCase(), icon: newIcon });
    setNewName('');
    setNewSlug('');
    fetch();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-semibold mb-3">Manage Exam Types</h3>
      <form onSubmit={handleAdd} className="flex flex-col gap-2 mb-4">
        <input
          type="text" placeholder="Exam Name (e.g. RAS)"
          value={newName} onChange={(e) => setNewName(e.target.value)}
          className="border p-2 rounded" required
        />
        <input
          type="text" placeholder="Slug (e.g. ras)"
          value={newSlug} onChange={(e) => setNewSlug(e.target.value)}
          className="border p-2 rounded" required
        />
        <input
          type="text" placeholder="Icon (emoji)"
          value={newIcon} onChange={(e) => setNewIcon(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-green-600 text-white py-2 rounded">
          Add Exam Type
        </button>
      </form>
      <ul className="space-y-1">
        {examTypes.map(ex => (
          <li key={ex.id} className="flex justify-between border-b py-1">
            <span>{ex.icon} {ex.name} ({ex.slug})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}