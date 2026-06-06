import { useState, useEffect } from 'react';
import { getBundles, addBundle, updateBundle, deleteBundle } from '../../firebase/firestore';

export default function BundleManager() {
  const [bundles, setBundles] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [exam, setExam] = useState('all');
  const [driveURL, setDriveURL] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState('');

  const fetch = () => getBundles().then(setBundles).catch(err => setMsg('Fetch error: ' + err.message));
  useEffect(() => { fetch(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!driveURL) return setMsg('Please paste Google Drive link');
    const data = { name, price: parseInt(price), originalPrice: parseInt(originalPrice), exam, downloadURL: driveURL };
    try {
      if (editingId) {
        await updateBundle(editingId, data);
        setEditingId(null);
        setMsg('Bundle updated!');
      } else {
        await addBundle(data);
        setMsg('Bundle added!');
      }
      setName(''); setPrice(''); setOriginalPrice(''); setDriveURL('');
      fetch();
    } catch (err) {
      setMsg('❌ ' + err.message);
    }
  };

  const handleEdit = (bundle) => {
    setName(bundle.name);
    setPrice(bundle.price.toString());
    setOriginalPrice(bundle.originalPrice ? bundle.originalPrice.toString() : '');
    setExam(bundle.exam);
    setDriveURL(bundle.downloadURL);
    setEditingId(bundle.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete bundle?')) return;
    try {
      await deleteBundle(id);
      fetch();
      setMsg('Bundle deleted.');
    } catch (err) {
      setMsg('❌ ' + err.message);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="font-semibold mb-2">Premium Bundles</h3>
      {msg && <div className="text-sm mb-2 text-red-600">{msg}</div>}
      <form onSubmit={handleSubmit} className="space-y-2">
        <input placeholder="Bundle Name" value={name} onChange={e => setName(e.target.value)} className="w-full border p-2 rounded" required />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} className="w-full border p-2 rounded" required />
        <input type="number" placeholder="Original Price" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)} className="w-full border p-2 rounded" required />
        <input placeholder="Exam code or 'all'" value={exam} onChange={e => setExam(e.target.value)} className="w-full border p-2 rounded" required />
        <input type="url" placeholder="Google Drive Link (ZIP)" value={driveURL} onChange={e => setDriveURL(e.target.value)} className="w-full border p-2 rounded" required />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">{editingId ? 'Update' : 'Add Bundle'}</button>
      </form>
      <div className="mt-4">
        {bundles.map(b => (
          <div key={b.id} className="flex justify-between border-b py-1 text-sm">
            <span>{b.name} (₹{b.price})</span>
            <div>
              <button onClick={() => handleEdit(b)} className="text-blue-600 mr-2">Edit</button>
              <button onClick={() => handleDelete(b.id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}