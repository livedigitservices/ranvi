import { io } from 'socket.io-client';

let socket = null;
let broadcastChannel = null;

// Cross-tab broadcast channel for multi-tab synchronization
try {
  if (typeof window !== 'undefined' && window.BroadcastChannel) {
    broadcastChannel = new BroadcastChannel('ranvi_realtime_tabs');
  }
} catch (e) {
  // Graceful fallback if BroadcastChannel not supported in current environment
}

const getSocketUrl = () => {
  const apiBase = import.meta.env.VITE_API_BASE_URL;
  if (apiBase && apiBase.startsWith('http')) {
    // Strip trailing /api/v1 if present to get server origin
    return apiBase.replace(/\/api\/v1\/?$/, '');
  }
  // In dev / Vite proxy environment, connect to port 5000 or same origin
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:5000';
    }
    return window.location.origin;
  }
  return 'http://localhost:5000';
};

export const initSocketClient = () => {
  if (socket) return socket;

  const url = getSocketUrl();
  const token = typeof window !== 'undefined' ? localStorage.getItem('ranvi_token') : null;

  socket = io(url, {
    auth: { token },
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    withCredentials: true,
  });

  // Re-emit incoming server events to other browser tabs
  socket.onAny((event, data) => {
    if (broadcastChannel) {
      broadcastChannel.postMessage({ type: 'SOCKET_EVENT', event, data });
    }
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initSocketClient();
  }
  return socket;
};

export const updateSocketAuth = (token) => {
  if (socket) {
    socket.auth = { token };
    if (!socket.connected) {
      socket.connect();
    }
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const subscribeToTabs = (callback) => {
  if (!broadcastChannel) return () => {};
  const handler = (e) => {
    if (e.data && e.data.type === 'SOCKET_EVENT') {
      callback(e.data.event, e.data.data);
    }
  };
  broadcastChannel.addEventListener('message', handler);
  return () => broadcastChannel.removeEventListener('message', handler);
};

export default {
  initSocketClient,
  getSocket,
  updateSocketAuth,
  disconnectSocket,
  subscribeToTabs,
};
