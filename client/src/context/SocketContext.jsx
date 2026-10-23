import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { getSocket, updateSocketAuth, subscribeToTabs } from '../services/socket';
import { clearClientCache } from '../services';
import { useAuth } from './AuthContext';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { user, isAuthenticated, isAdmin, isStudent } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [lastEvent, setLastEvent] = useState(null);
  const socketRef = useRef(null);
  const listenersMapRef = useRef(new Map());

  // Initialize socket
  useEffect(() => {
    const s = getSocket();
    socketRef.current = s;

    const handleConnect = () => {
      setIsConnected(true);
      const token = localStorage.getItem('ranvi_token');
      if (token) {
        updateSocketAuth(token);
      }
      if (user) {
        if (isStudent) {
          s.emit('register_student', user.id || user._id);
        }
        if (isAdmin) {
          s.emit('register_admin');
        }
      }
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    s.on('connect', handleConnect);
    s.on('disconnect', handleDisconnect);

    // Auto-clear cache on real-time server events
    s.on('courses:updated', () => clearClientCache('/courses'));
    s.on('announcement:updated', () => clearClientCache('/site-settings'));

    if (s.connected) {
      setIsConnected(true);
    }

    // Tab-to-tab sync listener
    const unsubscribeTabs = subscribeToTabs((event, data) => {
      setLastEvent({ event, data, timestamp: Date.now(), fromTab: true });
      // Trigger registered callbacks
      const callbacks = listenersMapRef.current.get(event) || [];
      callbacks.forEach((cb) => {
        try {
          cb(data);
        } catch (err) {
          console.error(`[Realtime Tab Handler Error: ${event}]`, err);
        }
      });
    });

    return () => {
      s.off('connect', handleConnect);
      s.off('disconnect', handleDisconnect);
      unsubscribeTabs();
    };
  }, []);

  // When user identity or auth state changes
  useEffect(() => {
    const s = socketRef.current || getSocket();
    if (!s) return;

    const token = localStorage.getItem('ranvi_token');
    updateSocketAuth(token);

    if (isAuthenticated && user) {
      if (isStudent) {
        s.emit('register_student', user.id || user._id);
      }
      if (isAdmin) {
        s.emit('register_admin');
      }
    }
  }, [user, isAuthenticated, isAdmin, isStudent]);

  // Subscribe to specific realtime events
  const subscribe = useCallback((event, callback) => {
    const s = socketRef.current || getSocket();
    if (!listenersMapRef.current.has(event)) {
      listenersMapRef.current.set(event, new Set());
    }
    listenersMapRef.current.get(event).add(callback);

    const socketHandler = (data) => {
      setLastEvent({ event, data, timestamp: Date.now() });
      callback(data);
    };

    s.on(event, socketHandler);

    return () => {
      s.off(event, socketHandler);
      const set = listenersMapRef.current.get(event);
      if (set) {
        set.delete(callback);
        if (set.size === 0) {
          listenersMapRef.current.delete(event);
        }
      }
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        isConnected,
        lastEvent,
        subscribe,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

// Convenient hook to listen to a realtime event
export const useRealtimeEvent = (eventName, callback) => {
  const { subscribe } = useSocket();
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!eventName) return;
    const handler = (data) => {
      if (savedCallback.current) {
        savedCallback.current(data);
      }
    };
    const unsubscribe = subscribe(eventName, handler);
    return unsubscribe;
  }, [eventName, subscribe]);
};
