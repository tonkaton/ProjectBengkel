import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, X } from 'lucide-react';
import { Input, Button } from '../ui';
import { useForm } from '../../hooks';
import { API_URL, COMPANY } from '../../constants';
import { getCurrentYear } from '../../utils';

/**
 * Login modal for the landing page. On success it hands the token + user back
 * to the caller (navbar) via onSuccess so the session indicator updates in
 * place — no redirect. The user then chooses to open the dashboard.
 */
export default function Login({ open, onClose, onSuccess }) {
  const { values, loading, handleChange, setLoading } = useForm({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess?.(data.token, data.user);
        onClose?.();
      } else {
        setError(data.message || 'Login gagal');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Koneksi ke server gagal!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-yellow-500/30 bg-black/90 p-8 shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition hover:bg-gray-700 hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="mb-6 text-center">
              <div className="mb-3 flex justify-center">
                <div className="rounded-full bg-gradient-to-r from-yellow-400 to-red-500 p-3 text-black">
                  <LogIn size={28} />
                </div>
              </div>
              <h1 className="text-2xl font-extrabold text-white">Login</h1>
              <p className="mt-1 text-sm text-gray-400">Akses portal {COMPANY.name}</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <Input
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder="user@email.com"
                required
              />

              <Input
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />

              {error && (
                <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-center text-sm text-red-400">
                  {error}
                </p>
              )}

              <Button type="submit" variant="primary" loading={loading} disabled={loading} className="w-full">
                {loading ? 'Authenticating...' : 'Login'}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-gray-500">
              © {getCurrentYear()} {COMPANY.name}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
