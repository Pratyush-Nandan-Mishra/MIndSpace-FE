/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4433/api';

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.user) {
            setUser(data.user);
            setIsAuthenticated(true);
          }
          else {
            setUser(null);
            setIsAuthenticated(false);
          }
        }
        else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error fetching user from /auth/me:', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile(); 
  }, []);

  const loginWithGoogle = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  const logout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setUser(null);
        setIsAuthenticated(false);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const getUserProfile = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
          setIsAuthenticated(true);
          return data.user;
        }
      }
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateUserProfile = async (profileData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsAuthenticated(true);
        return data.user;
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  const value = {
    user,
    setUser,
    loading,
    isAuthenticated,
    loginWithGoogle,
    logout,
    getUserProfile,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Prevent render before auth check */}
    </AuthContext.Provider>
  );
};

  // useEffect(() => {
  //   checkAuthStatus();   
  // }, []);

  // const checkAuthStatus = async () => {
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/auth/status`, {
  //       credentials: 'include',
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       if (data.authenticated && data.user) {
  //         setUser(data.user);
  //         setIsAuthenticated(true);
  //       } else {
  //         setUser(null);
  //         setIsAuthenticated(false);
  //       }
  //     } else {
  //       setUser(null);
  //       setIsAuthenticated(false);
  //     }
  //   } catch (error) {
  //     console.error('Error checking auth status:', error);
  //     setUser(null);
  //     setIsAuthenticated(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // };