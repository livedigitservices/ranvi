import api from './api';

export const authService = {
  login: async (email, password) => {
    const data = await api.post('/auth/login', { email, password });
    return data;
  },
  register: async (userData) => {
    const data = await api.post('/auth/register', userData);
    return data;
  },
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      // Continue client logout
    }
  },
  getMe: async () => {
    const data = await api.get('/auth/me');
    return data;
  },
  updateProfile: async (profileData) => {
    const data = await api.put('/auth/profile', profileData);
    return data;
  },
  changePassword: async (currentPassword, newPassword) => {
    const data = await api.put('/auth/change-password', { currentPassword, newPassword });
    return data;
  },
};
