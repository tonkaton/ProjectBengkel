import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { Input, Button } from '../ui';
import { useForm } from '../../hooks';
import { API_URL, APP_URL, COMPANY, ANIMATION } from '../../constants';
import { getCurrentYear } from '../../utils';

/**
 * Unified login form component for both users and admins
 * The backend automatically handles role-based authentication
 */
export default function Login() {
  const { values, loading, handleChange, setLoading } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect based on role
        if (data.user.role === 'admin') {
          alert('Login Admin Berhasil! Mengalihkan ke Dashboard Admin...');
        } else {
          alert('Login Berhasil! Mengalihkan ke Dashboard...');
        }
        
        // Redirect to app
        window.location.href = APP_URL;
      } else {
        alert(data.message || 'Login Gagal');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Koneksi ke server gagal!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 flex items-center justify-center px-4">
      <motion.div
        initial={ANIMATION.fadeInUp.initial}
        animate={ANIMATION.fadeInUp.animate}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-black/80 backdrop-blur-xl border border-yellow-500/30 rounded-2xl shadow-2xl p-8"
      >
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="p-3 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 text-black">
              <LogIn size={28} />
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Login</h1>
          <p className="text-gray-400 text-sm mt-1">
            Akses portal {COMPANY.name}
          </p>
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

          <Button
            type="submit"
            variant="primary"
            loading={loading}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Authenticating...' : 'Login'}
          </Button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          © {getCurrentYear()} {COMPANY.name}
        </p>
      </motion.div>
    </div>
  );
}
