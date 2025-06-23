import { useState, useEffect } from 'react';

export const useLocalAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Admin credentials (you can change these)
  const ADMIN_EMAIL = 'admin@krishna.com';
  const ADMIN_PASSWORD = 'admin123';

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('portfolio-admin');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const userData = {
          email: email,
          id: 'admin-user',
          loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('portfolio-admin', JSON.stringify(userData));
        setUser(userData);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('portfolio-admin');
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    loading,
    login,
    logout
  };
};