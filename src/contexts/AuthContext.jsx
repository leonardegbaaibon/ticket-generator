import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    setLoading(false);
  }, [user]);

  const signIn = async (email, password) => {
    // Here you would typically make an API call to your backend
    // For demo purposes, we'll just simulate a successful login
    const mockUser = {
      id: '1',
      name: email.split('@')[0],
      email: email,
      avatar: null
    };
    setUser(mockUser);
    return mockUser;
  };

  const signInWithGoogle = async () => {
    try {
      // Here you would implement Google Sign In
      // For example, using Firebase:
      // const provider = new GoogleAuthProvider();
      // const result = await signInWithPopup(auth, provider);
      // const user = result.user;

      // For demo purposes, we'll create a mock user
      const mockUser = {
        id: '1',
        name: 'Demo User',
        email: 'demo@example.com',
        avatar: 'https://lh3.googleusercontent.com/a/default-user'
      };
      setUser(mockUser);
      return mockUser;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signUp = async (name, email, password) => {
    // Here you would typically make an API call to your backend
    // For demo purposes, we'll just simulate a successful registration
    const mockUser = {
      id: '1',
      name: name,
      email: email,
      avatar: null
    };
    setUser(mockUser);
    return mockUser;
  };

  const signOut = () => {
    setUser(null);
  };

  const updateProfile = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const value = {
    user,
    loading,
    signIn,
    signInWithGoogle,
    signUp,
    signOut,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 