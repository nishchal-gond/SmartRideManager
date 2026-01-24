import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Bike } from 'lucide-react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to create account: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
      navigate('/');
    } catch (err) {
      setError('Failed to sign in with Google: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#121A22] rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <Bike className="w-16 h-16 text-[#00F0FF] mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-[#EAF6FF]">Create Account</h2>
          <p className="mt-2 text-sm text-gray-400">Join RideSync today</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-[#FF2E2E]/20 border border-[#FF2E2E] rounded-md text-[#FF2E2E] text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#EAF6FF] mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-[#0B0F14] border border-[#1a2332] rounded-md text-[#EAF6FF] focus:outline-none focus:ring-2 focus:ring-[#00F0FF]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#EAF6FF] mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-[#0B0F14] border border-[#1a2332] rounded-md text-[#EAF6FF] focus:outline-none focus:ring-2 focus:ring-[#00F0FF]"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#EAF6FF] mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-[#0B0F14] border border-[#1a2332] rounded-md text-[#EAF6FF] focus:outline-none focus:ring-2 focus:ring-[#00F0FF]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-[#00F0FF] text-[#0B0F14] font-semibold rounded-md hover:bg-[#00d9e6] focus:outline-none focus:ring-2 focus:ring-[#00F0FF] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#1a2332]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#121A22] text-gray-400">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="mt-4 w-full py-2 px-4 border border-[#1a2332] text-[#EAF6FF] font-semibold rounded-md hover:bg-[#0B0F14] focus:outline-none focus:ring-2 focus:ring-[#00F0FF] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Google
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-[#00F0FF] hover:text-[#00d9e6]">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
