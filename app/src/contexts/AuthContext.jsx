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
      // Cek validitas token ke backend
      const response = await authService.getCurrentUser(token);
      
      // Handle variasi struktur response
      const data = response.data || response;
      const user = data.user || data; // Kadang backend langsung return user object

      if (user) {
        setCurrentUser(user);
        setUserRole(user.role);
        setIsLoggedIn(true);
      } else {
        throw new Error("User data not found");
      }
    } catch (error) {
      console.error('Auth check error:', error);
      // Kalau token invalid/expired, bersihkan storage
      sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
      setToken(null);
      setCurrentUser(null);
      setUserRole(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      
      // 👇 DEBUGGING: Liat struktur asli dari backend di Console Browser
      console.log("LOGIN RESPONSE DEBUG:", response); 

      // 👇 LOGIC ROBOH (Robust): Cari token di berbagai kemungkinan lokasi
      // 1. Cek apakah response punya property 'data' (standar Axios)
      const data = response.data || response;
      
      // 2. Ambil token & user
      const accessToken = data.token || data.data?.token; 
      const user = data.user || data.data?.user;

      if (!accessToken) {
        console.error("Token missing in response:", data);
        throw new Error("Token tidak ditemukan dalam respon server.");
      }

      // Simpan data valid
      sessionStorage.setItem(STORAGE_KEYS.TOKEN, accessToken);
      setToken(accessToken);
      setCurrentUser(user);
      setUserRole(user?.role);
      setIsLoggedIn(true);
      
      return { success: true };

    } catch (error) {
      console.error("Login Process Error:", error);
      const errorMessage = error.response?.data?.message || error.message || 'Login gagal';
      return { success: false, message: errorMessage };
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