import { useState, useEffect } from 'react';
import { getBundles, addBundle, updateBundle, deleteBundle } from '../../firebase/firestore';
import { uploadPDF } from '../../firebase/storage'; // Use same upload function for ZIP as well

export default function BundleManager() {
  const [bundles, setBundles] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [exam, setExam] = useState('all');
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fetch = () => getBundles().then(setBundles);
  useEffect(() => { fetch(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file && !editingId) return alert('Select ZIP/PDF file');
    try {
      let url = editingId ? bundles.find(b => b.id === editingId)?.downloadURL : '';
      if (file) {
        url = await uploadPDF(file, `bundles/${name.replace(/\s/g, '_')}.zip`);
      }
      const data = { name, price: parseInt(price), originalPrice: parseInt(originalPrice), exam, downloadURL: url };
      if (editingId) {
        await updateBundle(editingId, data);
        setEditingId(null);
      } else {
        await addBundle(data);
      }
      alert('Bundle saved!');
      fetch();
      setName(''); setPrice(''); setOriginalPrice(''); setFile(null);
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleEdit = (bundle) => {
    setName(bundle.name);
    setPrice(bundle.price.toString());
    setOriginalPrice(bundle.originalPrice.toString());
    setExam(bundle.exam);
    setEditingId(bundle.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete bundle?')) {
      await deleteBundle(id);
      fetch();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">Manage Premium Bundles</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" placeholder="Bundle Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="number" placeholder="Price (₹)" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="number" placeholder="Original Price (₹)" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Exam code (or 'all')" value={exam} onChange={e => setExam(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="file" accept="application/zip,application/pdf" onChange={e => setFile(e.target.files[0])} className="w-full" />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          {editingId ? 'Update Bundle' : 'Upload Bundle'}
        </button>
      </form>
      <div className="mt-4">
        {bundles.map(b => (
          <div key={b.id} className="flex justify-between items-center border-b py-2">
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