import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Attach JWT token & device ID from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ranvi_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Generate or retrieve persistent device id
  let deviceId = localStorage.getItem('ranvi_device_id');
  if (!deviceId) {
    deviceId = 'dev_' + Math.random().toString(36).substring(2, 15) + Date.now();
    localStorage.setItem('ranvi_device_id', deviceId);
  }
  config.headers['x-device-id'] = deviceId;
  config.headers['x-device-info'] = `${navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'} Browser`;

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor: Handle 401 and device revocation
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorData = error.response ? error.response.data : { message: error.message };

    // If session was revoked due to another device login or expired
    if (error.response && error.response.status === 401) {
      if (errorData.code === 'DEVICE_SESSION_REVOKED') {
        localStorage.removeItem('ranvi_token');
        localStorage.removeItem('ranvi_user');
        window.dispatchEvent(new CustomEvent('ranvi:session_revoked', { detail: errorData.message }));
      }
    }

    return Promise.reject(errorData);
  }
);

export default api;
