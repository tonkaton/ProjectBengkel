import React, { useState } from 'react';
import { useAuth } from '../../contexts';
import { Input, Button } from '../ui';

const LoginPage = () => {
  const { login } = useAuth();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

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
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-xl border border-zinc-700 space-y-6 shadow-2xl">
        <h2 className="text-3xl font-black text-center bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent uppercase italic">
          Login Bengkel
        </h2>
        
        {error && (
          <div className="p-3 bg-red-900/20 border border-red-500 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <Input
          placeholder="Email"
          value={loginForm.email}
          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
          onKeyPress={handleKeyPress}
        />
        
        <Input
          type="password"
          placeholder="Password"
          value={loginForm.password}
          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
          onKeyPress={handleKeyPress}
        />
        
        <Button
          onClick={handleLogin}
          className="w-full uppercase shadow-lg"
          size="lg"
        >
          Masuk
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
