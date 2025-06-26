"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, getUser, clearAuth } from '../lib/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = getUser();
        if (storedUser) {
          setUser(storedUser);
          // Verify token is still valid
          try {
            await api.jobs.getAll(); 
          } catch (err) {
            clearAuth();
            setUser(null);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.auth.login(credentials);
      const userData = {
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        position: data.user.position,
        token: data.token
      };
      setUser(userData);
      console.log("User logged in:", userData);
      return userData;
    } catch (error) {
      clearAuth();
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const register_user = async (userData) => {
    setLoading(true);
    try {      
      const data = await api.auth.register({
        ...userData
      });
      return { ok: true, data };
    } catch (error) {
      setError(error.message);
      return { ok: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const loginCandidate = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.auth.loginCandidate(credentials);
      const userData = {
        id: data._id,
        name: data.name,
        email: data.email,
        position: data.position
      };
      setUser(userData);
      return userData;
    } catch (error) {
      clearAuth();
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.auth.logout();
    } finally {
      clearAuth();
      setUser(null);
      setLoading(false);
    }
  };

  // Function to add a candidate
  // Automatically adds user ID to candidate data
  // This function can be used by HR to add candidates
    const add_candidate = async (candidateData) => {
    setLoading(true);
    try {
      if (!user) {
        throw new Error("User must be logged in to add jobs");
      }
      
      const data = await api.candidates.add_candidate({
        ...candidateData,
        userId: user.id 
      });
      return { ok: true, data };
    } catch (error) {
      setError(error.message);
      return { ok: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const add_job = async (jobData) => {
    setLoading(true);
    try {
      if (!user) {
        throw new Error("User must be logged in to add jobs");
      }
      
      const data = await api.jobs.add_job({
        ...jobData,
        userId: user.id 
      });
      return { ok: true, data };
    } catch (error) {
      setError(error.message);
      return { ok: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user,
      loading,
      error,
      isAuthenticated: !!user,
      login,
      loginCandidate,
      logout,
      add_candidate,
      add_job,
      register_user,
      clearErrors: () => setError(null)
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}