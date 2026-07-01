import React, { useState } from 'react';
import { Wrench, Zap, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../contexts';
import { Input, Button } from '../ui';

const LoginPage = () => {
  const { login } = useAuth();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [dark, setDark] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  );

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch (e) {
      /* ignore */
    }
  };

  const handleLogin = async () => {
    setError('');
    const result = await login(loginForm.email, loginForm.password);
    if (!result.success) {
      setError(result.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      <button
        onClick={toggleTheme}
        aria-label={dark ? 'Mode terang' : 'Mode gelap'}
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-base text-ink shadow-soft-in transition active:scale-95"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      <div className="w-full max-w-md rounded-4xl border border-line bg-card p-8 shadow-soft-lg">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-base text-accent shadow-soft-in">
            <Wrench size={24} strokeWidth={2.3} />
          </span>
          <h2 className="mt-4 font-display text-4xl tracking-wide text-ink">
            BOTAK<span className="text-accent">.</span> ENGINE SPEED
          </h2>
          <p className="eyebrow mt-1">Masuk ke dashboard</p>
        </div>

        {error && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-3 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Email"
            placeholder="nama@email.com"
            value={loginForm.email}
            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            onKeyPress={handleKeyPress}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            onKeyPress={handleKeyPress}
          />
        </div>

        <Button onClick={handleLogin} icon={Zap} className="mt-7 w-full" size="lg">
          Masuk
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
