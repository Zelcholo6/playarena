import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../api/client';

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { (async () => {
    const t = await AsyncStorage.getItem('token');
    if (t) {
      setToken(t);
      client.defaults.headers.common.Authorization = `Bearer ${t}`;
      try {
        const me = await client.get('/auth/me');
        setUser(me.data.user);
      } catch {
        await AsyncStorage.removeItem('token');
        delete client.defaults.headers.common.Authorization;
        setToken(null); setUser(null);
      }
    }
    setLoading(false);
  })(); }, []);

  const value = useMemo(() => ({
    token, user,
    login: async (email, password) => {
      const r = await client.post('/auth/login', { email, password });
      const t = r.data.token;
      await AsyncStorage.setItem('token', t);
      client.defaults.headers.common.Authorization = `Bearer ${t}`;
      setToken(t); setUser(r.data.user);
    },
    register: async (name, email, password) => {
      const r = await client.post('/auth/register', { name, email, password });
      const t = r.data.token;
      await AsyncStorage.setItem('token', t);
      client.defaults.headers.common.Authorization = `Bearer ${t}`;
      setToken(t); setUser(r.data.user);
    },
    logout: async () => {
      await AsyncStorage.removeItem('token');
      delete client.defaults.headers.common.Authorization;
      setToken(null); setUser(null);
    }
  }), [token, user]);

  if (loading) return null;
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

