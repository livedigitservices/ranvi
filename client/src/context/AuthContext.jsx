import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ranvi_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);
  const [sessionRevokedMessage, setSessionRevokedMessage] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('ranvi_token');
      if (token) {
        try {
          const res = await authService.getMe();
          if (res.success && res.data) {
            setUser(res.data.user);
            localStorage.setItem('ranvi_user', JSON.stringify(res.data.user));
          }
        } catch (err) {
          localStorage.removeItem('ranvi_token');
          localStorage.removeItem('ranvi_user');
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();

    // Listen for single-device revocation events from API interceptor
    const handleRevocation = (e) => {
      setUser(null);
      setSessionRevokedMessage(e.detail || 'Your session was ended because this account logged in on another device.');
    };

    window.addEventListener('ranvi:session_revoked', handleRevocation);
    return () => window.removeEventListener('ranvi:session_revoked', handleRevocation);
  }, []);

  const login = async (email, password) => {
    setSessionRevokedMessage('');
    const res = await authService.login(email, password);
    if (res.success && res.data) {
      localStorage.setItem('ranvi_token', res.data.token);
      localStorage.setItem('ranvi_user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      return res.data;
    }
    throw new Error(res.message || 'Login failed');
  };

  const register = async (userData) => {
    setSessionRevokedMessage('');
    const res = await authService.register(userData);
    if (res.success && res.data) {
      localStorage.setItem('ranvi_token', res.data.token);
      localStorage.setItem('ranvi_user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      return res.data;
    }
    throw new Error(res.message || 'Registration failed');
  };

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem('ranvi_token');
    localStorage.removeItem('ranvi_user');
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    const res = await authService.updateProfile(profileData);
    if (res.success && res.data) {
      setUser(res.data.user);
      localStorage.setItem('ranvi_user', JSON.stringify(res.data.user));
      return res.data.user;
    }
    throw new Error(res.message || 'Profile update failed');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN',
        isStudent: user?.role === 'STUDENT',
        sessionRevokedMessage,
        clearRevokedMessage: () => setSessionRevokedMessage(''),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
