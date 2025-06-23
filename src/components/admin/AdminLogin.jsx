import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocalAuth } from '../../hooks/useLocalAuth';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useLocalAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
    } catch (error) {
      setError('Invalid credentials. Use: admin@krishna.com / admin123');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <motion.div
        className="w-full max-w-md p-8 border bg-gray-900/50 backdrop-blur-sm border-orange-500/20 rounded-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="mb-8 text-3xl font-bold text-center text-orange-400">
          Admin Login
        </h2>

        {/* Demo Credentials Info */}
        <div className="p-4 mb-6 border rounded-lg bg-blue-500/20 border-blue-500/30">
          <p className="text-sm text-center text-blue-300">
            <strong>Demo Credentials:</strong><br />
            Email: admin@krishna.com<br />
            Password: admin123
          </p>
        </div>

        {error && (
          <div className="p-3 mb-6 border rounded-lg bg-red-500/20 border-red-500/30">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border rounded-lg bg-gray-800/50 border-orange-500/20 focus:border-orange-500/60 focus:outline-none"
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border rounded-lg bg-gray-800/50 border-orange-500/20 focus:border-orange-500/60 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 font-semibold text-black transition-colors duration-300 bg-orange-500 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;