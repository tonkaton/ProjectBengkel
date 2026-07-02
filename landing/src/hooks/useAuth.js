import { useState, useEffect, useCallback } from 'react';
import { API_URL } from '../constants';

/**
 * Landing-side auth state. Reads the session (token + user) from this origin's
 * sessionStorage and validates it against the backend, so a stale/expired/revoked
 * token isn't shown as "logged in".
 *
 * Cross-origin sync: the token is validated on mount and whenever the tab regains
 * focus. If it was revoked elsewhere (e.g. the user logged out in the dashboard
 * app), the next validation fails and this page logs itself out too.
 */
export function useAuth() {
  const [user, setUser] = useState(() => {
    try {
      const raw = sessionStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => sessionStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const clearSession = useCallback(() => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setToken(null);
    setUser(null);
  }, []);

  const login = useCallback((newToken, freshUser) => {
    sessionStorage.setItem('token', newToken);
    sessionStorage.setItem('user', JSON.stringify(freshUser));
    setToken(newToken);
    setUser(freshUser);
    setLoading(false);
  }, []);

  const logout = useCallback(async () => {
    const current = sessionStorage.getItem('token');
    // Revoke server-side first so the dashboard app session ends too.
    // Best-effort: clear locally regardless of the network result.
    try {
      if (current) {
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${current}` },
        });
      }
    } catch {
      /* ignore network errors — still clear locally */
    }
    clearSession();
  }, [clearSession]);

  // Validate the stored token against the backend; clears the session if invalid.
  const validate = useCallback(async () => {
    const current = sessionStorage.getItem('token');
    if (!current) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${current}` },
      });
      if (!res.ok) throw new Error('invalid session');

      const data = await res.json();
      const freshUser = data.user || data;
      setUser(freshUser);
      sessionStorage.setItem('user', JSON.stringify(freshUser));
    } catch {
      clearSession();
    } finally {
      setLoading(false);
    }
  }, [clearSession]);

  useEffect(() => {
    validate();
  }, [validate]);

  // Re-validate when the tab regains focus so a logout elsewhere propagates here.
  useEffect(() => {
    const onFocus = () => {
      if (document.visibilityState === 'visible') validate();
    };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onFocus);
    return () => {
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onFocus);
    };
  }, [validate]);

  return { user, token, isLoggedIn: !!user, loading, login, logout };
}
