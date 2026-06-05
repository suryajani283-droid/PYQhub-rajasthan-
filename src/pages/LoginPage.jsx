import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithEmail, loginWithGoogle, registerWithEmail } from '../firebase/auth';
import { Helmet } from 'react-helmet-async';

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        await registerWithEmail(name, email, password);
      } else {
        await loginWithEmail(email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Helmet><title>Login - PYQHub Rajasthan</title></Helmet>
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isRegister ? 'Create Account' : 'Login to PYQHub'}
        </h2>
        {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <input type="text" placeholder="Full Name" value={name}
              onChange={e => setName(e.target.value)} required
              className="w-full px-4 py-2 border rounded-lg" />
          )}
          <input type="email" placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)} required
            className="w-full px-4 py-2 border rounded-lg" />
          <input type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)} required
            className="w-full px-4 py-2 border rounded-lg" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700">
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
        <div className="my-4 text-center text-gray-400">— OR —</div>
        <button onClick={handleGoogle} className="w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600">
          Continue with Google
        </button>
        <p className="mt-4 text-center text-sm">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => setIsRegister(!isRegister)} className="text-blue-600 hover:underline">
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
} 