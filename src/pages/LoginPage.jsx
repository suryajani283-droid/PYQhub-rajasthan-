import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  setupRecaptcha,
  loginWithPhone,
  verifyPhoneOTP,
} from '../firebase/auth';
import { Helmet } from 'react-helmet-async';

export default function LoginPage() {
  const navigate = useNavigate();

  // States for email/password
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // States for phone OTP
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handler for email/password
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isRegister) {
        await registerWithEmail(name, email, password);
      } else {
        await loginWithEmail(email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handler for Google
  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handler for Phone: send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phone.match(/^[6-9]\d{9}$/)) {
      setError('Enter valid 10-digit mobile number');
      return;
    }
    setError('');
    setLoading(true);
    try {
      setupRecaptcha(); // sets up invisible recaptcha
      const confirmation = await loginWithPhone('+91' + phone);
      setConfirmationResult(confirmation);
      setShowOtp(true);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handler for Phone: verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      setError('Enter 6-digit OTP');
      return;
    }
    setLoading(true);
    try {
      await verifyPhoneOTP(confirmationResult, otp);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <Helmet>
        <title>Login - PYQHub Rajasthan</title>
      </Helmet>
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </h2>

        {/* Toggle: Email or Phone */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => { setIsRegister(false); setShowOtp(false); }}
            className={`px-4 py-2 rounded-full font-medium ${!showOtp ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Email
          </button>
          <button
            onClick={() => { setShowOtp(false); }}
            className="hidden" // we will show both tabs properly
          ></button>
        </div>

        {!showOtp ? (
          <>
            {/* Email/Password Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              {isRegister && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              )}
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-70"
              >
                {loading ? 'Processing...' : isRegister ? 'Sign Up' : 'Login'}
              </button>
            </form>

            <div className="my-4 text-center text-gray-400">— OR —</div>

            {/* Google Button */}
            <button
              onClick={handleGoogle}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 transition disabled:opacity-70"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>

            <p className="mt-4 text-center text-sm">
              {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-blue-600 font-semibold hover:underline"
              >
                {isRegister ? 'Login' : 'Register'}
              </button>
            </p>
          </>
        ) : (
          <>
            {/* Phone OTP Section */}
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <p className="text-sm text-gray-500 text-center">
                Enter the OTP sent to +91 {phone}
              </p>
              <input
                type="text"
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0,6))}
                required
                className="w-full px-4 py-3 border rounded-xl text-center text-2xl tracking-widest focus:ring-2 focus:ring-blue-500"
                inputMode="numeric"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 disabled:opacity-70"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
            <button
              onClick={() => { setShowOtp(false); setOtp(''); }}
              className="mt-3 w-full text-sm text-gray-500 hover:underline"
            >
              ← Back to Email Login
            </button>
          </>
        )}

        {/* Phone Login Entry Button (separate) */}
        {!showOtp && (
          <div className="mt-4 text-center">
            <button
              onClick={() => { setShowOtp(true); setIsRegister(false); }}
              className="text-blue-600 font-medium hover:underline text-sm"
            >
              Login with Phone OTP
            </button>
          </div>
        )}
      </div>

      {/* Hidden div for reCAPTCHA */}
      <div id="recaptcha-container"></div>
    </div>
  );
}