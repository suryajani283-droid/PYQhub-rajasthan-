import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  loginWithEmail,
  registerWithEmail,
  sendMagicLink,
  checkEmailLink,
  completeEmailSignIn,
  logoutUser,
} from '../firebase/auth';
import { checkIfAdmin } from '../firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { Helmet } from 'react-helmet-async';

export default function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [adminChecked, setAdminChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // पहले से लॉगिन यूज़र के लिए – एडमिन चेक करके रीडायरेक्ट करें या बटन दिखाएँ
  useEffect(() => {
    if (user && !adminChecked) {
      checkIfAdmin(user.uid)
        .then((admin) => {
          setIsAdmin(admin);
          setAdminChecked(true);
          if (admin) {
            // एडमिन है तो सीधे एडमिन पैनल पर भेजें
            navigate('/admin', { replace: true });
          }
        })
        .catch(() => setAdminChecked(true));
    }
  }, [user, adminChecked, navigate]);

  // Magic link से आने पर
  useEffect(() => {
    const handleEmailLink = async () => {
      if (checkEmailLink()) {
        try {
          const result = await completeEmailSignIn();
          const uid = result.user.uid;
          const admin = await checkIfAdmin(uid);
          navigate(admin ? '/admin' : '/dashboard', { replace: true });
        } catch (err) {
          setError(err.message);
        }
      }
      const emailParam = searchParams.get('email');
      if (emailParam) setEmail(emailParam);
    };
    handleEmailLink();
  }, [navigate, searchParams]);

  // Already logged in (non‑admin) view with admin button
  if (user && adminChecked && !isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <Helmet><title>Already Logged In - PYQHub Rajasthan</title></Helmet>
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-3">Welcome, {user.displayName || user.email}</h2>
          <p className="text-gray-600 mb-6">You are already logged in.</p>
          <div className="flex flex-col gap-3">
            <button onClick={() => navigate('/dashboard')} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700">
              Go to Dashboard
            </button>
            {/* Admin होने पर यह बटन भी दिखाएँ – ऊपर वाला ब्लॉक सिर्फ non‑admin के लिए है, लेकिन फिर भी सुरक्षा के लिए */}
            <button onClick={async () => { await logoutUser(); navigate('/login'); }} className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200">
              Logout & Sign In Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // अगर एडमिन रीडायरेक्ट हो रहा है तो लोडिंग दिखाएँ
  if (user && !adminChecked) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p>Checking permissions...</p>
      </div>
    );
  }

  const handleEmailPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let userCredential;
      if (isRegister) {
        userCredential = await registerWithEmail(name, email, password);
      } else {
        userCredential = await loginWithEmail(email, password);
      }
      const uid = userCredential.user.uid;
      const admin = await checkIfAdmin(uid);
      navigate(admin ? '/admin' : '/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMagicLink = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email first.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await sendMagicLink(email);
      setMagicLinkSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <Helmet><title>Login - PYQHub Rajasthan</title></Helmet>
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6">
          {magicLinkSent ? 'Check Your Email' : isRegister ? 'Create Account' : 'Login'}
        </h2>

        {magicLinkSent ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">We sent a magic link to <strong>{email}</strong>. Click the link to sign in instantly.</p>
            <button onClick={() => { setMagicLinkSent(false); setError(''); }} className="text-blue-600 hover:underline">
              ← Back to login
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleEmailPassword} className="space-y-4">
              {isRegister && (
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500" />
              )}
              <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500" />
              <input type="password" placeholder="Password (min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500" />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-70">
                {loading ? 'Please wait...' : isRegister ? 'Sign Up' : 'Login'}
              </button>
            </form>

            <div className="my-4 text-center text-gray-400">— OR —</div>

            <button onClick={handleSendMagicLink} disabled={loading || !email} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 disabled:opacity-50">
              Send Magic Link (No Password)
            </button>

            <p className="mt-6 text-center text-sm text-gray-600">
              {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button type="button" onClick={() => setIsRegister(!isRegister)} className="text-blue-600 font-semibold hover:underline">
                {isRegister ? 'Login' : 'Register'}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}