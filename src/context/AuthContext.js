import React, { createContext, useState, useEffect } from 'react';
import { apiRequest, setAuthToken } from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (userId, password) => {
    setLoading(true);
    const res = await apiRequest('/auth/login', 'POST', { userId, mobile: userId, password });
    setLoading(false);

    if (res.success) {
      setUser(res.user);
      setToken(res.token);
      setAuthToken(res.token);
      return { success: true };
    }
    return { success: false, message: res.message || 'Login failed' };
  };

  const register = async (userData) => {
    setLoading(true);
    const res = await apiRequest('/auth/register', 'POST', userData);
    setLoading(false);

    if (res.success) {
      setUser(res.user);
      setToken(res.token);
      setAuthToken(res.token);
      return { success: true };
    }
    return { success: false, message: res.message || 'Registration failed' };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setAuthToken(null);
  };

  const updateProfile = async (profileData) => {
    const res = await apiRequest('/auth/profile', 'PUT', profileData);
    if (res.success) {
      setUser(res.user);
      return { success: true, message: 'Profile updated' };
    }
    return { success: false, message: res.message || 'Update failed' };
  };

  const changePassword = async (oldPassword, newPassword) => {
    const res = await apiRequest('/auth/change-password', 'POST', { oldPassword, newPassword });
    return res;
  };

  const deleteAccount = async () => {
    const res = await apiRequest('/auth/delete-account', 'DELETE');
    if (res.success) {
      logout();
    }
    return res;
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      register,
      logout,
      updateProfile,
      changePassword,
      deleteAccount
    }}>
      {children}
    </AuthContext.Provider>
  );
};
