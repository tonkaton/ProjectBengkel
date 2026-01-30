import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services';
import { STORAGE_KEYS, USER_ROLES } from '../constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => sessionStorage.getItem(STORAGE_KEYS.TOKEN));
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAdmin = userRole === USER_ROLES.ADMIN;

  const initializeAuth = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const data = await authService.getCurrentUser(token);
      setCurrentUser(data.user);
      setUserRole(data.user.role);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Auth check error:', error);
      sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      sessionStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
      setToken(data.token);
      setCurrentUser(data.user);
      setUserRole(data.user.role);
      setIsLoggedIn(true);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message || 'Login gagal' };
    }
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
    setToken(null);
    setIsLoggedIn(false);
    setUserRole(null);
    setCurrentUser(null);
  };

  const value = {
    token,
    currentUser,
    userRole,
    isLoggedIn,
    isAdmin,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;